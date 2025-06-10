// src/submit.js
import toast from 'react-hot-toast';

export async function submitPipeline(nodes, edges) {
  const loadingToast = toast.loading('Submitting pipeline...');

  try {
    const response = await fetch('http://localhost:8000/pipelines/parse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nodes, edges }),
    });

    const data = await response.json();

    toast.success(`Parsed: ${data.num_nodes} nodes, ${data.num_edges} edges, DAG: ${data.is_dag ? 'Yes' : 'No'}`, {
      id: loadingToast,
    });
  } catch (err) {
    console.error('Submission failed:', err);
    toast.error('Failed to submit pipeline.', {
      id: loadingToast,
    });
  }
}
