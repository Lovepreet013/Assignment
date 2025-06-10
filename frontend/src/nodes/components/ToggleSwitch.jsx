const ToggleSwitch = ({ isOn, handleToggle }) => {
  return (
    <div className="flex items-center gap-3">
      {<span className="text-sm font-medium text-gray-700">{isOn ? 'Yes' : 'No'}</span>}
      <div
        className={`w-11 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-colors duration-300 ${
          isOn ? 'bg-indigo-500' : 'bg-gray-300'
        }`}
        onClick={handleToggle}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
            isOn ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </div>
    </div>
  );
};

export default ToggleSwitch;
