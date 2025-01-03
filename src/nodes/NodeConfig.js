export const nodeConfigs = {
  TextNode: {
    title: "Text Node",
    fields: [
      { type: "input", label: "Text", defaultValue: "{{input}}" },
    ],
    handles: [{ type: "source", position: "right", id: "output" , top: "50%"}],
  },
  InputNode: {
    title: "Input Node",
    fields: [
      { type: "input", label: "Name", defaultValue: "input_" },
      { type: "dropdown", label: "Type", options: ["Text", "File"], defaultValue: "Text" },
    ],
    handles: [{type: "source", position: "right", id: "Name" , top: "50%"}],
  },
  OutputNode: {
    title: "Output Node",
    fields: [
      { type: "input", label: "Name", defaultValue: "output_" },
      { type: "dropdown", label: "Type", options: ["Text", "File"], defaultValue: "Text" },
    ],
    handles: [{ type: "target", position: "left", id: "input" , top: "50%"}],
  },
  LLMNode: {
    title: "LLM Node",
    fields: [
        {
            type: "span",
            text: "This is a LLM.", 
        }
    ],
    handles: [
      { type: "target", position: "left", id: "system", top: "30%" },
      { type: "target", position: "left", id: "prompt", top: "70%" },
      { type: "source", position: "right", id: "response", top: "50%" },
    ],
  },
  DummyNode: {
    title: "Dummy Node",
  fields: [
    { type: "input", label: "Input 1", defaultValue: "new_input" },
    { type: "dropdown", label: "Option", options: ["A", "B"], defaultValue: "A" },
  ],
  handles: [
    { type: "source", position: "right", id: "dummy_output", top: "50%" }
  ],
  },

  PromptNode: {
    title: "Prompt Node",
  fields: [
    {type: "span",text: "Type your prompt here." },
    { type: "input", label: "Enter your prompt ...", defaultValue: "new_input" },
    { 
      type: "checkbox", 
      label: "Enable advanced options", 
      defaultValue: false // Optional: Set the default checked state
    }
    ],
  handles: [
    {type: "source", position: "right", id: "output", top: "50%" },
  ],
  },

  OpenAiNode: {
    title: "Open AI Node",
  fields: [
    {type: "span",text: "Type your message here." },
    { type: "input", label: "Enter your prompt ...", defaultValue: "new_input" },
    {
      type: "radiobutton",
      label: "Choose GPT Version",
      options: ["GPT-3", "GPT plus", "GPT-4o"],
      defaultValue: "GPT-4"
    }
    ],
  handles: [
    {type: "source", position: "right", id: "output", top: "50%" },
  ],
  },

  IntegrationNode: {
    title: "Choose Integration",
  fields: [
    { type: "dropdown", label: "Choose integration type", options: ["Notion", "Airtable", "Hubspot"], defaultValue: "Notion" },
    ],
  handles: [
    {type: "source", position: "right", id: "Integration", top: "50%" },
  ],
  },

  NoteNode: {
    title: "Note",
  fields: [
    { type: "input", label: "Title", defaultValue: "title" },
    { type: "input", label: "Description", defaultValue: "desc" },
    ],
  handles: [
    {type: "source", position: "right", id: "title", top: "30%" },
    {type: "source", position: "right", id: "desc", top: "70%" },
  ],
  },
  
};


