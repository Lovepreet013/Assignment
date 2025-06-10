// components/GenericNode.jsx
import { useStore } from '../store';
import { BaseNode } from './BaseNode';
import { NameInput } from './common/NameInput';
import { VariableChecking } from '../components/VariableChecking';
import ToggleSwitch from '../components/ToggleSwitch';
import { TypeSelect } from './common/TypeSelect';

export const GenericNode = ({ id, data = {}, config, onClose }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const renderField = (field) => {
    const value = data[field.key] ?? field.defaultValue ?? '';
    const setValue = (val) => updateNodeField(id, field.key, val);

    switch (field.type) {
      case 'text':
        return (
          <VariableChecking
            key={field.key}
            label={field.label}
            value={value}
            tooltip={field.tooltip}
            tooltipContent={field.tooltipContent}
            placeholder={field.placeholder}
            onChange={(e) => setValue(e.target.value)}
          />
        );
      case 'select':
        return (
          <TypeSelect
            key={field.key}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            label={field.label}
            options={field.options}
            type="Dropdown"
          />
        );
      case 'toggle':
        return (
          <div key={field.key} className="flex items-center justify-between my-5 px-2">
            <p className="text-[#565C65] font-semibold text-[16px]">{field.label}</p>
            <ToggleSwitch isOn={!!value} handleToggle={() => setValue(!value)} />
          </div>
        );
      case 'nameInput':
        return <NameInput key={field.key} id={id} field={field.key} />;
      default:
        return null;
    }
  };

  return (
    <BaseNode
      id={id}
      title={config.title}
      titleDesc={config.desc}
      icon={config.icon}
      img={config.img}
      inputHandles={config.inputHandles?.(id) || []}
      outputHandles={config.outputHandles?.(id) || []}
      onClose={onClose}
    >
      {config.fields.map(renderField)}
    </BaseNode>
  );
};
