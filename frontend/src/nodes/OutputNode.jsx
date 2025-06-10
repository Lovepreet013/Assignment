// Updated OutputNode.jsx
import OutputIcon from '@mui/icons-material/Output';
import { Position } from 'reactflow';
import { GenericNode } from './GenericNode';

export const OutputNode = (props) => (
  <GenericNode
    {...props}
    config={{
      title: 'Output',
      desc: 'Output data of different types from your workflow',
      icon: <OutputIcon />,
      inputHandles: (id) => [{ id: `${id}-value`, position: Position.Left }],
      fields: [
        { key: 'outputName', type: 'nameInput' },
        { key: 'outputType', type: 'select', label: 'Type', options: ['Text', 'File'] },
        { key: 'outputText', type: 'text', label: 'Output' },
        { key: 'formatOutput', type: 'toggle', label: 'Format Output' },
      ],
    }}
  />
);

