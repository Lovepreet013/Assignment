// Updated TextNode.jsx (partially reusable)
import { useState, useEffect } from 'react';
import { Position, useUpdateNodeInternals } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';
import { VariableChecking } from '../components/VariableChecking';
import { NameInput } from '../components/NameInput';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';

export const TextNode = ({ id, data, onClose }) => {
  const [currText, setCurrText] = useState(data?.text || '');
  const [variableHandles, setVariableHandles] = useState([]);

  const updateNodeInternals = useUpdateNodeInternals();
  const updateNodeField = useStore((state) => state.updateNodeField);
  const setEdgesState = useStore.setState;

  useEffect(() => {
    const matches = [...currText.matchAll(/\{\{\s*([\w\d_\.]+)\s*\}\}/g)];
    const textVars = [...new Set(matches.map((m) => m[1]))];
    const varMap = {};

    useStore.getState().nodes.forEach((node) => {
      const { id: nodeId, data = {} } = node;
      const keys = ['inputName', 'outputName', 'response'];

      keys.forEach((key) => {
        const varName = data[key];
        if (typeof varName === 'string') {
          let handleId;
          if (key === 'inputName') handleId = `${nodeId}-value`;
          else if (key === 'outputName') handleId = `${nodeId}-output`;
          else if (key === 'response') handleId = `${nodeId}-response`;

          varMap[varName] = { nodeId, handleId };
        }
      });
    });

    const validVars = textVars.filter((v) => varMap[v]);
    const handles = validVars.map((v, i) => ({
      id: `textnode-${id}-var-${v}`,
      type: 'target',
      position: Position.Left,
      style: { top: `${40 + i * 30}px` },
    }));

    setVariableHandles(handles);
    updateNodeInternals(id);

    requestAnimationFrame(() => {
      const currentEdges = useStore.getState().edges;
      const newEdges = currentEdges.filter(
        (e) => !(e.target === id && e.targetHandle && !validVars.includes(e.targetHandle))
      );

      validVars.forEach((v) => {
        const ref = varMap[v];
        if (!ref) return;

        const targetHandleId = `textnode-${id}-var-${v}`;
        const alreadyConnected = newEdges.some(
          (e) => e.source === ref.nodeId &&
                  e.sourceHandle === ref.handleId &&
                  e.target === id &&
                  e.targetHandle === targetHandleId
        );

        if (!alreadyConnected) {
          newEdges.push({
            id: `e${ref.nodeId}-${id}-${v}`,
            source: ref.nodeId,
            sourceHandle: ref.handleId,
            target: id,
            targetHandle: targetHandleId,
            type: 'smoothstep',
            animated: false,
            style: { stroke: '#7A7DF3', strokeWidth: 2 },
          });
        }
      });

      setEdgesState({ edges: newEdges });
    });

    updateNodeField(id, 'text', currText);
  }, [currText]);

  const outputHandles = [{ id: `${id}-output`, position: Position.Right, type: 'source' }];

  return (
    <BaseNode
      id={id}
      title="Text"
      titleDesc="Accepts Text from upstream nodes and allows you to write additional text / concatenate different texts to pass to downstream nodes."
      onClose={onClose}
      inputHandles={variableHandles}
      outputHandles={outputHandles}
      icon={<TextSnippetOutlinedIcon />}
    >
      <div className="mt-2">
        <NameInput id={id} field="inputName" />
        <VariableChecking
          label="Text"
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
        />
      </div>
    </BaseNode>
  );
};