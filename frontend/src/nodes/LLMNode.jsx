// Updated LLMNode.jsx
import { Position } from 'reactflow';
import { GenericNode } from './GenericNode';
import img from '../assets/google.png';

export const LLMNode = (props) => (
  <GenericNode
    {...props}
    config={{
      title: 'LLM',
      img,
      inputHandles: (id) => [
        { id: `${id}-system`, position: Position.Left, style: { top: '33%' } },
        { id: `${id}-prompt`, position: Position.Left, style: { top: '66%' } },
      ],
      outputHandles: (id) => [{ id: `${id}-response`, position: Position.Right }],
      fields: [
        { key: 'inputName', type: 'nameInput' },
        {
          key: 'systemText', type: 'text', label: 'System (Instructions)',
          tooltip: true, tooltipContent: 'System instructions to the LLM.',
          placeholder: 'Answer the question based on context in a professional manner.'
        },
        {
          key: 'promptText', type: 'text', label: 'Prompt',
          tooltip: true, tooltipContent: 'Main prompt passed to the model'
        },
        { key: 'modelType', type: 'select', label: 'Model', options: ['Gemini', 'Open AI', 'Claude AI', 'Co-pilot', 'Deepseek'] },
        { key: 'useAPIKey', type: 'toggle', label: 'User Personal API Key' },
      ],
    }}
  />
);

