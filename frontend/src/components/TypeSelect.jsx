import { HelpTooltip } from "./HelpTooltip";


export const TypeSelect = ({ value, onChange, options = ['Text', 'File'], label, type }) => (
  <div className="mb-2">
    <label className="block mb-1 text-md relative font-semibold w-[95%] mx-auto text-[#565C65]">
      <div className="flex items-center">
        {label}
        <HelpTooltip content="Select the input data type" />
        <span className="absolute right-0 text-[10px] bg-indigo-500 text-white px-2 py-[2px] rounded ml-2">
          {type}
        </span>
      </div>
    </label>

    <select
      value={value}
      onChange={onChange}
      className="block w-[95%] mx-auto px-2 py-2 mb-1 rounded border border-gray-300 hover:border-indigo-300 hover:bg-[#f6f7fa] outline-none text-md"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);
