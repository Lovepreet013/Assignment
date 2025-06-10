import { Handle, Position } from 'reactflow';
import CloseIcon from '@mui/icons-material/Close';

export const BaseNode = ({
  id,
  title,
  titleDesc,
  children,
  icon,
  inputHandles = [],
  outputHandles = [],
  style = {},
  img = null,
  onClose,
}) => {
  const commonHandleStyle = {
    width: 15,
    height: 15,
    borderRadius: '9999px',
    background: 'white',
    border: '2px solid #6366f1',
  };

  return (
    <div
      className={`relative max-w-[350px] min-h-[80px] border-2 border-indigo-200 rounded-md shadow-md bg-white p-2 hover:border-indigo-400 hover:shadow-xl transition-all duration-300 ${
        title === 'LLM' ? 'min-w-[450px] max-w-[500px]' : 'min-w-[250px]'
      }`}
      style={style}
    >
      {/* Input Handles */}
      {inputHandles.length === 0 ? (
        <Handle
          type="target"
          position={Position.Left}
          id={`${id}-input`}
          isConnectable={true}
          style={{
            ...commonHandleStyle,
            left: -10,
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        />
      ) : (
        inputHandles.map((handle, index) => (
          <Handle
            key={`input-${id}-${handle.id}-${index}`}
            type={handle.type || 'target'}
            position={handle.position || Position.Left}
            id={handle.id}
            isConnectable={true}
            style={{
              ...commonHandleStyle,
              ...handle.style,
              ...(handle.position === Position.Left && { left: -10 }),
              ...(handle.position === Position.Right && { right: -10 }),
              ...(handle.position === Position.Top && { top: -10 }),
              ...(handle.position === Position.Bottom && { bottom: -10 }),
            }}
          />
        ))
      )}

      {/* Title Section */}
      <div className="text-left border border-indigo-300 rounded bg-[#EEF2FF] px-2 py-2 mb-2 relative">
        <div className="flex gap-2 m-0">
          {img ? <img src={img} className="w-6.5 h-6.5" /> : <p>{icon}</p>}
          <p className="m-0 font-semibold text-lg pb-1 text-[#111927]">{title}</p>
          {onClose && (
            <p
              className="absolute right-2 top-2.5 w-5 h-5 flex items-center justify-center border-2 rounded-full cursor-pointer hover:bg-gray-100"
              onClick={() => onClose(id)}
            >
              <CloseIcon sx={{ fontSize: 15 }} />
            </p>
          )}
        </div>
        <p className="mt-0 text-sm">{titleDesc}</p>
      </div>

      {/* Children */}
      <div className="flex-grow">{children}</div>

      {/* Output Handles */}
      {outputHandles.length === 0 ? (
        <Handle
          type="source"
          position={Position.Right}
          id={`${id}-output`}
          isConnectable={true}
          style={{
            ...commonHandleStyle,
            right: -10,
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        />
      ) : (
        outputHandles.map((handle, index) => (
          <Handle
            key={`output-${id}-${handle.id}-${index}`}
            type={handle.type || 'source'}
            position={handle.position || Position.Right}
            id={handle.id}
            isConnectable={true}
            style={{
              ...commonHandleStyle,
              ...handle.style,
              ...(handle.position === Position.Left && { left: -10 }),
              ...(handle.position === Position.Right && { right: -10 }),
              ...(handle.position === Position.Top && { top: -10 }),
              ...(handle.position === Position.Bottom && { bottom: -10 }),
            }}
          />
        ))
      )}
    </div>
  );
};
