// src/SubmitButton.jsx
import { useStore } from './store';
import { submitPipeline } from './submit';

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  return (
    <div className="flex justify-center mt-4">
      <button
        type="button"
        onClick={() => submitPipeline(nodes, edges)}
        className="border shadow-md border-indigo-600 text-indigo-600 px-2 py-1 rounded hover:bg-indigo-200 hover:text-indigo-800 cursor-pointer hover:px-4 transition-all"
      >
        Submit Pipeline
      </button>
    </div>
  );
};
