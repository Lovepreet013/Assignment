import SearchIcon from '@mui/icons-material/Search'; // Placeholder search icon
import { Position } from 'reactflow';
import { GenericNode } from '../GenericNode';

export const RetrieverNode = (props) => (
  <GenericNode
    {...props}
    config={{
      title: 'Retriever',
      desc: 'Retrieve documents relevant to the query',
      icon: <SearchIcon />,
      inputHandles: (id) => [{ id: `${id}-query`, position: Position.Left }],
      outputHandles: (id) => [{ id: `${id}-results`, position: Position.Right }],
      fields: [
        { key: 'topK', type: 'text', label: 'Top K' },
        { key: 'retrieverType', type: 'select', label: 'Retriever Type', options: ['BM25', 'Vector'] },
      ],
    }}
  />
);
