import { Toaster } from 'react-hot-toast';
import { PipelineUI } from './ui';

function App() {
  return (
    <div className="overflow-x-hidden min-h-screen bg-white">
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
      <PipelineUI />
    </div>
  );
}

export default App;
