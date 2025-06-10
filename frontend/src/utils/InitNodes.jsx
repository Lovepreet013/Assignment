export const getInitNodeData = (nodeID, type) => {
    switch (type) {
      case 'text':
        return { text: '', inputName: nodeID.replace('text-', 'text_') };
      case 'customInput':
        return {
          inputName: nodeID.replace('customInput-', 'input_'),
          inputType: 'Text',
        };
      case 'customOutput':
        return {
          outputName: nodeID.replace('customOutput-', 'output_'),
          outputType: 'Text',
        };
      case 'llm':
        return {
          inputName: nodeID.replace('llm-', 'llm_'),
          systemText: 'Answer the question based on context in a professional manner.',
          promptText: '',
          modelType: 'Open AI',
          useAPIKey: false,
        };
      case 'retriever':
        return {
          topK: '5',
          retrieverType: 'BM25',
        };
      case 'tool':
        return {
          toolName: 'Tool_1',
          endpoint: 'https://api.example.com',
          authRequired: false,
        };
      case 'prompt':
        return {
          template: 'Hello {{name}}, how can I help?',
          preview: true,
        };
      case 'knowledge':
        return {
          sourceType: 'Docs',
          query: '',
        };
      default:
        return {};
    }
  };
  