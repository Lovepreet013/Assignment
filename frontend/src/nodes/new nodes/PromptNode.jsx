import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { Position } from 'reactflow';
import { GenericNode } from '../GenericNode';

export const PromptNode = (props) => (
  <GenericNode
    {...props}
    config={{
      title: 'Prompt',
      desc: 'Create a prompt template with variables',
      icon: <TextSnippetIcon />,
      inputHandles: (id) => [{ id: `${id}-vars`, position: Position.Left }],
      outputHandles: (id) => [{ id: `${id}-prompt`, position: Position.Right }],
      fields: [
        { key: 'template', type: 'text', label: 'Template' },
        { key: 'preview', type: 'toggle', label: 'Show Preview' },
      ],
    }}
  />
);
