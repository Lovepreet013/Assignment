import SmartToyIcon from '@mui/icons-material/SmartToy';
import { Position } from 'reactflow';
import { GenericNode } from '../GenericNode';

export const LLMNode = (props) => (
  <GenericNode
    {...props}
    config={{
      title: 'LLM',
      desc: 'Generate responses using a large language model',
      icon: <SmartToyIcon />,
      inputHandles: (id) => [{ id: `${id}-prompt`, position: Position.Left }],
      outputHandles: (id) => [{ id: `${id}-result`, position: Position.Right }],
      fields: [
        { key: 'modelName', type: 'select', label: 'Model', options: ['GPT-4', 'Claude', 'LLaMA'] },
        { key: 'temperature', type: 'text', label: 'Temperature' },
        { key: 'maxTokens', type: 'text', label: 'Max Tokens' },
      ],
    }}
  />
);
