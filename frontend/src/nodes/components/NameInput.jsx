import { useStore } from "../../store";

export const NameInput = ({ id, field }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const value = useStore((state) => {
    const node = state.nodes.find((n) => n.id === id);
    return node?.data?.[field] || '';
  });

  const handleChange = (e) => {
    updateNodeField(id, field, e.target.value);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      className="block bg-[#DEDFF5] w-[95%] mx-auto text-center px-2 py-1 mb-2 mt-2 rounded border-none outline-none"
    />
  );
};
