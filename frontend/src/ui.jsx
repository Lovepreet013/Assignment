import { useState, useRef, useCallback } from 'react';
import { ReactFlow, Controls, Background, MiniMap, ConnectionMode } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/InputNode';
import { LLMNode } from './nodes/LLMNode';
import { OutputNode } from './nodes/OutputNode';
import { TextNode } from './nodes/TextNode';
import { SubmitButton } from './SubmitButton';

import InputIcon from '@mui/icons-material/Input';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import OutputIcon from '@mui/icons-material/Output';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

const createNodeComponent = (Component) => ({ id, data }) => {
  const removeNode = useStore((state) => state.removeNode);
  return <Component id={id} data={data} onClose={() => removeNode(id)} />;
};

const nodeTypes = {
  customInput: createNodeComponent(InputNode),
  llm: createNodeComponent(LLMNode),
  customOutput: createNodeComponent(OutputNode),
  text: createNodeComponent(TextNode),
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const getInitNodeData = useCallback((nodeID, type) => {
    switch (type) {
      case 'text':
        return { text: '', inputName: nodeID.replace('text-', 'text_'),
        };
      case 'customInput':
        return { inputName: nodeID.replace('customInput-', 'input_'), inputType: 'Text' };
      case 'customOutput':
        return { outputName: nodeID.replace('customOutput-', 'output_'), outputType: 'Text' };
      case 'llm':
        return {
          inputName: nodeID.replace('customLlm-', 'LLM_'),
          response: nodeID.replace('customLlm-', 'response_'),
        };
      default:
        return {};
    }
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      if (!reactFlowInstance) return;

      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const data = event.dataTransfer.getData('application/reactflow');
      if (!data) return;

      const { nodeType } = JSON.parse(data);
      if (!nodeType) return;

      const position = reactFlowInstance.project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      const nodeID = getNodeID(nodeType);
      addNode({
        id: nodeID,
        type: nodeType,
        position,
        data: getInitNodeData(nodeID, nodeType),
      });
    },
    [reactFlowInstance, getNodeID, addNode, getInitNodeData]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const buttons = [
    { label: 'Input', nodeType: 'customInput', icon: <InputIcon fontSize="medium" /> },
    { label: 'LLM', nodeType: 'llm', icon: <AutoAwesomeOutlinedIcon fontSize="medium" /> },
    { label: 'Output', nodeType: 'customOutput', icon: <OutputIcon fontSize="medium" /> },
    { label: 'Text', nodeType: 'text', icon: <TextSnippetOutlinedIcon fontSize="medium" /> },
  ];

  const handleDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ nodeType }));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <>
      {/* Toolbar */}
      <div className="bg-white w-full px-6 py-3 shadow-sm border-b border-gray-300 flex space-x-4">
        {buttons.map((btn) => (
          <div
            key={btn.label}
            className="group flex flex-col items-center justify-center w-[80px] h-[70px] border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:-translate-y-1 hover:shadow-lg hover:bg-[#E8E8FD] hover:border-[#7A7DF3] transition cursor-pointer hover:text-[#3438ED]"
            draggable
            onDragStart={(e) => handleDragStart(e, btn.nodeType)}
          >
            <div className="text-gray-600 group-hover:text-[#3438ED] transition-colors">
              {btn.icon}
            </div>
            <span>{btn.label}</span>
          </div>
        ))}
      </div>

      {/* ReactFlow Canvas */}
      <div
        ref={reactFlowWrapper}
        className="w-full h-[70vh] overflow-hidden"
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionMode={ConnectionMode.Loose}
          connectionLineType="smoothstep"
        >
          <Background color="#aaa" gap={gridSize} />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>

      <div className="py-4">
        <SubmitButton />
      </div>
    </>
  );
};
