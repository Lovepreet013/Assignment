import BuildIcon from '@mui/icons-material/Build'; // Placeholder tool icon
import { Position } from 'reactflow';
import { GenericNode } from '../GenericNode';

export const ToolNode = (props) => (
  <GenericNode
    {...props}
    config={{
      title: 'Tool',
      desc: 'Call external APIs or tools',
      icon: <BuildIcon />,
      inputHandles: (id) => [{ id: `${id}-input`, position: Position.Left }],
      outputHandles: (id) => [{ id: `${id}-output`, position: Position.Right }],
      fields: [
        { key: 'toolName', type: 'nameInput' },
        { key: 'endpoint', type: 'text', label: 'API Endpoint' },
        { key: 'authRequired', type: 'toggle', label: 'Requires Auth' },
      ],
    }}
  />
);
