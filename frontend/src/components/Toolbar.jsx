import {
  InputIcon,
  AutoAwesomeOutlinedIcon,
  OutputIcon,
  TextSnippetOutlinedIcon,
  SearchIcon,
  BuildIcon,
  MenuBookIcon,
  TextSnippetIcon,
  SmartToyIcon,
} from '../config/icons';

const buttons = [
  { label: 'Input', nodeType: 'customInput', icon: <InputIcon fontSize="medium" /> },
  { label: 'LLM', nodeType: 'llm', icon: <AutoAwesomeOutlinedIcon fontSize="medium" /> },
  { label: 'Output', nodeType: 'customOutput', icon: <OutputIcon fontSize="medium" /> },
  { label: 'Text', nodeType: 'text', icon: <TextSnippetOutlinedIcon fontSize="medium" /> },
  { label: 'Retriever', nodeType: 'retriever', icon: <SearchIcon fontSize="medium" /> },
  { label: 'Tool', nodeType: 'tool', icon: <BuildIcon fontSize="medium" /> },
  { label: 'Prompt', nodeType: 'prompt', icon: <TextSnippetIcon fontSize="medium" /> },
  { label: 'Knowledge', nodeType: 'knowledge', icon: <MenuBookIcon fontSize="medium" /> },
  { label: 'AI', nodeType: 'chatMemory', icon: <SmartToyIcon fontSize="medium" /> },
];

export const Toolbar = ({ onAddNode }) => {
  const handleDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ nodeType }));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="bg-white w-full px-6 py-3 shadow-sm border-b border-gray-300 flex space-x-4 overflow-x-auto">
      {buttons.map((btn) => (
        <div
          key={btn.label}
          className="group flex flex-col items-center justify-center w-[80px] h-[70px] border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:-translate-y-1 hover:shadow-lg hover:bg-[#E8E8FD] hover:border-[#7A7DF3] transition cursor-pointer hover:text-[#3438ED]"
          draggable
          onDragStart={(e) => handleDragStart(e, btn.nodeType)}
          onClick={() => onAddNode?.(btn.nodeType)}
        >
          <div className="text-gray-600 group-hover:text-[#3438ED] transition-colors">
            {btn.icon}
          </div>
          <span className="text-wrap text-center break-words">{btn.label}</span>
        </div>
      ))}
    </div>
  );
};
