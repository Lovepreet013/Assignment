import {InputIcon} from '../config/icons';
import { Position } from 'reactflow';
import { GenericNode } from './GenericNode';

export const InputNode = (props) => (
  <GenericNode
    {...props}
    config={{
      title: 'Input',
      desc: 'Pass data of different types into your workflow',
      icon: <InputIcon />,
      outputHandles: (id) => [{ id: `${id}-value`, position: Position.Right, type: 'source' }],
      fields: [
        { key: 'inputName', type: 'nameInput' },
        { key: 'inputType', type: 'select', label: 'Type', options: ['Text', 'File'] },
      ],
    }}
  />
);
