import { useStore } from '../store';
import { InputNode } from '../nodes/InputNode';
import { OutputNode } from '../nodes/OutputNode';
import { TextNode } from '../nodes/TextNode';
import { LLMNode } from '../nodes/LLMNode';
import { RetrieverNode } from '../nodes/new nodes/RetreiverNode';
import { ToolNode } from '../nodes/new nodes/ToolNode';
import { PromptNode } from '../nodes/new nodes/PromptNode';
import { KnowledgeNode } from '../nodes/new nodes/KnowledgeNode';

const createNodeComponent = (Component) => ({ id, data }) => {
  const removeNode = useStore((state) => state.removeNode);
  return <Component id={id} data={data} onClose={() => removeNode(id)} />;
};

export const nodeTypes = {
  customInput: createNodeComponent(InputNode),
  customOutput: createNodeComponent(OutputNode),
  text: createNodeComponent(TextNode),
  llm: createNodeComponent(LLMNode),
  retriever: createNodeComponent(RetrieverNode),
  tool: createNodeComponent(ToolNode),
  prompt: createNodeComponent(PromptNode),
  knowledge: createNodeComponent(KnowledgeNode),
};
