import { useState, useRef, useCallback } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  MiniMap,
  ConnectionMode,
} from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

import { SubmitButton } from './components/SubmitButton';
import { Toolbar } from './components/Toolbar';
import { nodeTypes } from './config/nodes';
import { getInitNodeData } from './utils/InitNodes';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

// ✅ Moved selector above
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
    [reactFlowInstance, getNodeID, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // ✅ Add node on toolbar click
  const onAddNodeClick = (nodeType) => {
    if (!reactFlowInstance) return;

    const position = reactFlowInstance.project({ x: 300, y: 200 });

    const nodeID = getNodeID(nodeType);
    addNode({
      id: nodeID,
      type: nodeType,
      position,
      data: getInitNodeData(nodeID, nodeType),
    });
  };

  return (
    <>
      <Toolbar onAddNode={onAddNodeClick} />
      <div ref={reactFlowWrapper} className="w-full h-[70vh] overflow-hidden">
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
