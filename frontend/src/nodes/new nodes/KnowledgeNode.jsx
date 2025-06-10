import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Position } from 'reactflow';
import { GenericNode } from '../GenericNode';

export const KnowledgeNode = (props) => (
  <GenericNode
    {...props}
    config={{
      title: 'Knowledge',
      desc: 'Connect external or internal knowledge sources',
      icon: <MenuBookIcon />,
      outputHandles: (id) => [{ id: `${id}-data`, position: Position.Right }],
      fields: [
        { key: 'sourceType', type: 'select', label: 'Source', options: ['Docs', 'Database', 'Web'] },
        { key: 'query', type: 'text', label: 'Query' },
      ],
    }}
  />
);
