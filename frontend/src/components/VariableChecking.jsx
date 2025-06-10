// frontend/src/nodes/components/VariableChecking.js

import { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { HelpTooltip } from './HelpTooltip';

export const VariableChecking = ({
  label,
  value,
  onChange,
  tooltip,
  tooltipContent,
  placeholder = 'Type "{{" to use variables',
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const maxInlineHeight = 200;

  const handleInlineInput = useCallback((e) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, maxInlineHeight)}px`;
  }, []);

  const handleModalInput = useCallback((e) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  }, []);

  // --- REFINED handleKeyDown logic: Remove preventDefault() ---
  const handleKeyDown = useCallback((e) => {
    // Only stop propagation for Ctrl + Backspace
    // This allows the browser's default behavior (deleting a word) to still work,
    // but prevents the event from reaching React Flow or global listeners that might delete the node.
    if (e.key === 'Backspace' && e.ctrlKey) {
      // e.preventDefault(); // REMOVED: This line is removed to allow the default "delete word" behavior.
      e.stopPropagation(); // KEPT: This line is crucial to stop the event from bubbling up.
    }
  }, []);
  // --- End of refined handleKeyDown logic ---

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && handleModalClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const portalRoot = document.getElementById('modal-root') || document.body;

  return (
    <div className="mb-2 w-[95%] mx-auto">
      <div className="flex items-center justify-between mb-1">
        <label className="flex items-center text-gray-700 font-semibold">
          {label}
          {tooltip ? (
            <span className="ml-1"><HelpTooltip content={tooltipContent} /></span>
          ) : (
            <span className="ml-1 text-red-500">*</span>
          )}
        </label>
        <div className="flex items-center space-x-2">
          <button type="button">
            <AddOutlinedIcon sx={{ fontSize: 16, border: '1px solid #d9e2fe', backgroundColor: '#EEF2FF', cursor: 'pointer' }} />
          </button>
          <button type="button" onClick={() => setIsModalOpen(true)} title="Expand">
            <OpenInFullIcon sx={{ fontSize: 16, border: '1px solid #d9e2fe', backgroundColor: '#EEF2FF', cursor: 'pointer' }} />
          </button>
          <span className="text-[10px] bg-indigo-500 text-white px-2 py-[2px] rounded">text</span>
        </div>
      </div>

      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onInput={handleInlineInput}
        onKeyDown={handleKeyDown} 
        rows={1}
        style={{ maxHeight: `${maxInlineHeight}px` }}
        className="block w-full outline-none border border-gray-300 rounded-md px-3 py-2 text-sm resize-none overflow-hidden focus:ring-2 focus:ring-indigo-200"
      />

      {isModalOpen &&
        ReactDOM.createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }} onClick={handleModalClose}>
            <div
              className="bg-white w-full h-full md:w-3/4 md:h-3/4 rounded-lg shadow-lg p-4 flex flex-col relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button type="button" onClick={handleModalClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl" aria-label="Close">&times;</button>

              <div className="mb-2 flex items-center">
                <h2 className="text-lg font-medium text-gray-800">{label}</h2>
                {tooltip && <div className="mt-1"><HelpTooltip content={tooltipContent} /></div>}
              </div>

              <textarea
                autoFocus
                value={value}
                onChange={onChange}
                onInput={handleModalInput}
                onKeyDown={handleKeyDown} 
                className="flex-1 w-full h-full outline-none border border-gray-300 rounded-md px-3 py-2 text-sm resize-none overflow-auto focus:ring-2 focus:ring-indigo-200"
              />
            </div>
          </div>,
          portalRoot
        )}
    </div>
  );
};