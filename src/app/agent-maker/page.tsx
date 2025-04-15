'use client';

import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Checkbox} from '@/components/ui/checkbox';
import {Button} from '@/components/ui/button';
import {useToast} from '@/hooks/use-toast';
import {useRouter} from 'next/navigation';

const AgentMakerPage: React.FC = () => {
  const [agentName, setAgentName] = React.useState('DefaultAgentName');
  const [agentType, setAgentType] = React.useState('service');
  const [agentDescription, setAgentDescription] = React.useState('Default agent description.');
  const [agentUrl, setAgentUrl] = React.useState('http://localhost:41250');
  const [agentIcon, setAgentIcon] = React.useState('🤖');
  const [agentThemeColor, setAgentThemeColor] = React.useState('#4285F4');
  const [selectedMcps, setSelectedMcps] = React.useState<string[]>([]);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [selectedProvider, setSelectedProvider] = React.useState<string>('Google');
  const [selectedModel, setSelectedModel] = React.useState<string>('gemini-2-flash');
  const [selectedClass, setSelectedClass] = React.useState<string>('wizard');
  const [selectedRace, setSelectedRace] = React.useState<string>('human');

  const {toast} = useToast();
  const router = useRouter();

  const availableMcps = [
    '@modelcontextprotocol/server-filesystem',
    '@modelcontextprotocol/server-memory',
    '@modelcontextprotocol/server-brave-search',
    '@modelcontextprotocol/server-github',
    '@patruff/server-terminator',
    '@patruff/server-flux',
    '@patruff/server-gmail-drive',
    '@abhiz123/todoist-mcp-server',
    '@patruff/server-lightrag',
    '@patruff/server-codesnip',
  ];

  const handleMcpSelection = (mcp: string) => {
    setSelectedMcps((prev) => (prev.includes(mcp) ? prev.filter((item) => item !== mcp) : [...prev, mcp]));
  };

  const handleSubmit = async () => {
    setIsGenerating(true);
    try {
      const agentCard = {
        name: agentName,
        description: agentDescription,
        url: agentUrl,
        icon: agentIcon,
        theme_color: agentThemeColor,
        defaultInputModes: ['text'],
        defaultOutputModes: ['text'],
        provider: {
          name: selectedProvider,
          preferred_model: selectedModel, // Model goes inside the provider object
        },
        version: '0.3.0',
        capabilities: {
          streaming: false,
          pushNotifications: false,
          stateTransitionHistory: true,
        },
        authentication: null,
        skills: [
          getSkillDetails(),
        ],
        metadata: {
          icon: agentIcon,
          theme_color: agentThemeColor,
          display_name: agentName,
          mcps: selectedMcps.map((mcp) => {
            let tools;
            let env = {};
            let capabilities = [];

            switch (mcp) {
              case '@modelcontextprotocol/server-filesystem':
                tools = [
                  {name: 'filesystem/readFile', description: 'Read content from a file'},
                  {name: 'filesystem/writeFile', description: 'Write content to a file'},
                  {name: 'filesystem/listDirectory', description: 'List contents of a directory'},
                  {name: 'filesystem/deleteFile', description: 'Delete a file'},
                  {name: 'filesystem/createDirectory', description: 'Create a directory'},
                ];
                capabilities = ['filesystem'];
                break;
              case '@modelcontextprotocol/server-memory':
                tools = [
                  {name: 'memory/set', description: 'Store a value in memory'},
                  {name: 'memory/get', description: 'Retrieve a value from memory'},
                  {name: 'memory/delete', description: 'Delete a value from memory'},
                  {name: 'memory/list', description: 'List all keys in memory'},
                ];
                capabilities = ['memory'];
                break;
              case '@modelcontextprotocol/server-brave-search':
                tools = [
                  {name: 'brave/websearch', description: 'Perform a web search using Brave Search'},
                  {name: 'brave/localsearch', description: 'Search for local businesses and places'},
                ];
                capabilities = ['search'];
                env = {BRAVE_API_KEY: '${BRAVE_API_KEY}'};
                break;
              case '@modelcontextprotocol/server-github':
                tools = [
                  {name: 'github/searchRepositories', description: 'Search for GitHub repositories'},
                  {name: 'github/getFileContents', description: 'Get contents of a file from a repository'},
                  {name: 'github/createRepository', description: 'Create a new repository'},
                  {name: 'github/createOrUpdateFile', description: 'Create or update a file in a repository'},
                  {name: 'github/createIssue', description: 'Create a new issue in a repository'},
                  {name: 'github/createPullRequest', description: 'Create a new pull request'},
                ];
                capabilities = ['github'];
                env = {GITHUB_TOKEN: '${GITHUB_TOKEN}'};
                break;
              case '@patruff/server-terminator':
                tools = [
                  {name: 'terminator/terminateLocalFile', description: 'Permanently delete a file from local filesystem'},
                  {name: 'terminator/terminateRemoteFile', description: 'Permanently delete a file from a GitHub repository'},
                ];
                capabilities = ['terminator'];
                env = {GITHUB_TOKEN: '${GITHUB_TOKEN}'};
                break;
              case '@patruff/server-flux':
                tools = [
                  {name: 'flux/generateImage', description: 'Generate an image using Flux model'},
                  {name: 'flux/editImage', description: 'Edit an existing image with text prompts'},
                ];
                capabilities = ['image_generation'];
                env = {FLUX_API_KEY: '${FLUX_API_KEY}'};
                break;
              case '@patruff/server-gmail-drive':
                tools = [
                  {name: 'gmail/searchEmail', description: 'Search Gmail messages'},
                  {name: 'gmail/sendEmail', description: 'Send a new email'},
                  {name: 'drive/searchDrive', description: 'Search for files in Google Drive'},
                  {name: 'drive/createFolder', description: 'Create a new folder in Google Drive'},
                  {name: 'drive/uploadFile', description: 'Upload a file to Google Drive'},
                ];
                capabilities = ['gmail', 'drive'];
                env = {GOOGLE_API_CREDENTIALS: '${GOOGLE_API_CREDENTIALS}'};
                break;
              case '@abhiz123/todoist-mcp-server':
                tools = [
                  {name: 'todoist/createTask', description: 'Create a new task in Todoist'},
                  {name: 'todoist/getTasks', description: 'Get a list of tasks from Todoist'},
                  {name: 'todoist/updateTask', description: 'Update an existing task in Todoist'},
                  {name: 'todoist/deleteTask', description: 'Delete a task from Todoist'},
                  {name: 'todoist/completeTask', description: 'Mark a task as complete'},
                ];
                capabilities = ['todoist'];
                env = {TODOIST_API_KEY: '${TODOIST_API_KEY}'};
                break;
              case '@patruff/server-lightrag':
                tools = [
                  {name: 'rag/query', description: 'Query documents using RAG'},
                  {name: 'rag/insertText', description: 'Insert text into the RAG system'},
                  {name: 'rag/insertFile', description: 'Insert a file into the RAG system'},
                ];
                capabilities = ['rag'];
                break;
              case '@patruff/server-codesnip':
                tools = [
                  {name: 'codesnip/editSnippet', description: 'Edit a specific code snippet in a file'},
                  {name: 'codesnip/findSnippets', description: 'Find code snippets matching a pattern'},
                ];
                capabilities = ['code_editing'];
                break;
              default:
                tools = [];
                capabilities = [];
                break;
            }

            return {
              name: mcp.split('/')[1].replace('server-', ''),
              enabled: true,
              transport: 'stdio',
              command: 'npx',
              args: [mcp],
              env: env,
              capabilities: capabilities,
              tools: tools,
            };
          }),
        },
      };

      const agentCardJsonString = JSON.stringify(agentCard, null, 2);

      router.push(`/agent-viewer?agentCardJson=${encodeURIComponent(agentCardJsonString)}`);

    } catch (error: any) {
      console.error('Error generating agent:', error);
      toast({
        title: 'Error',
        description: `Failed to generate agent: ${error.message}`,
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleViewAgentCard = () => {
    const agentCard = {
      name: agentName,
      description: agentDescription,
      url: agentUrl,
      icon: agentIcon,
      theme_color: agentThemeColor,
      defaultInputModes: ['text'],
      defaultOutputModes: ['text'],
      provider: {
        name: selectedProvider,
        preferred_model: selectedModel, // Model goes inside the provider object
      },
      version: '0.3.0',
      capabilities: {
        streaming: false,
        pushNotifications: false,
        stateTransitionHistory: true,
      },
      authentication: null,
      skills: [
        getSkillDetails(),
      ],
      metadata: {
        icon: agentIcon,
        theme_color: agentThemeColor,
        display_name: agentName,
        mcps: selectedMcps.map((mcp) => {
          let tools;
          let env = {};
          let capabilities = [];

          switch (mcp) {
            case '@modelcontextprotocol/server-filesystem':
              tools = [
                {name: 'filesystem/readFile', description: 'Read content from a file'},
                {name: 'filesystem/writeFile', description: 'Write content to a file'},
                {name: 'filesystem/listDirectory', description: 'List contents of a directory'},
                {name: 'filesystem/deleteFile', description: 'Delete a file'},
                {name: 'filesystem/createDirectory', description: 'Create a directory'},
              ];
              capabilities = ['filesystem'];
              break;
            case '@modelcontextprotocol/server-memory':
              tools = [
                {name: 'memory/set', description: 'Store a value in memory'},
                {name: 'memory/get', description: 'Retrieve a value from memory'},
                {name: 'memory/delete', description: 'Delete a value from memory'},
                {name: 'memory/list', description: 'List all keys in memory'},
              ];
              capabilities = ['memory'];
              break;
            case '@modelcontextprotocol/server-brave-search':
              tools = [
                {name: 'brave/websearch', description: 'Perform a web search using Brave Search'},
                {name: 'brave/localsearch', description: 'Search for local businesses and places'},
              ];
              capabilities = ['search'];
              env = {BRAVE_API_KEY: '${BRAVE_API_KEY}'};
              break;
            case '@modelcontextprotocol/server-github':
              tools = [
                {name: 'github/searchRepositories', description: 'Search for GitHub repositories'},
                {name: 'github/getFileContents', description: 'Get contents of a file from a repository'},
                {name: 'github/createRepository', description: 'Create a new repository'},
                {name: 'github/createOrUpdateFile', description: 'Create or update a file in a repository'},
                {name: 'github/createIssue', description: 'Create a new issue in a repository'},
                {name: 'github/createPullRequest', description: 'Create a new pull request'},
              ];
              capabilities = ['github'];
              env = {GITHUB_TOKEN: '${GITHUB_TOKEN}'};
              break;
            case '@patruff/server-terminator':
              tools = [
                {name: 'terminator/terminateLocalFile', description: 'Permanently delete a file from local filesystem'},
                {name: 'terminator/terminateRemoteFile', description: 'Permanently delete a file from a GitHub repository'},
              ];
              capabilities = ['terminator'];
              env = {GITHUB_TOKEN: '${GITHUB_TOKEN}'};
              break;
            case '@patruff/server-flux':
              tools = [
                {name: 'flux/generateImage', description: 'Generate an image using Flux model'},
                {name: 'flux/editImage', description: 'Edit an existing image with text prompts'},
              ];
              capabilities = ['image_generation'];
              env = {FLUX_API_KEY: '${FLUX_API_KEY}'};
              break;
            case '@patruff/server-gmail-drive':
              tools = [
                {name: 'gmail/searchEmail', description: 'Search Gmail messages'},
                {name: 'gmail/sendEmail', description: 'Send a new email'},
                {name: 'drive/searchDrive', description: 'Search for files in Google Drive'},
                {name: 'drive/createFolder', description: 'Create a new folder in Google Drive'},
                {name: 'drive/uploadFile', description: 'Upload a file to Google Drive'},
              ];
              capabilities = ['gmail', 'drive'];
              env = {GOOGLE_API_CREDENTIALS: '${GOOGLE_API_CREDENTIALS}'};
              break;
            case '@abhiz123/todoist-mcp-server':
              tools = [
                {name: 'todoist/createTask', description: 'Create a new task in Todoist'},
                {name: 'todoist/getTasks', description: 'Get a list of tasks from Todoist'},
                {name: 'todoist/updateTask', description: 'Update an existing task in Todoist'},
                {name: 'todoist/deleteTask', description: 'Delete a task from Todoist'},
                {name: 'todoist/completeTask', description: 'Mark a task as complete'},
              ];
              capabilities = ['todoist'];
              env = {TODOIST_API_KEY: '${TODOIST_API_KEY}'};
              break;
            case '@patruff/server-lightrag':
              tools = [
                {name: 'rag/query', description: 'Query documents using RAG'},
                {name: 'rag/insertText', description: 'Insert text into the RAG system'},
                {name: 'rag/insertFile', description: 'Insert a file into the RAG system'},
              ];
              capabilities = ['rag'];
              break;
            case '@patruff/server-codesnip':
              tools = [
                {name: 'codesnip/editSnippet', description: 'Edit a specific code snippet in a file'},
                {name: 'codesnip/findSnippets', description: 'Find code snippets matching a pattern'},
              ];
              capabilities = ['code_editing'];
              break;
            default:
              tools = [];
              capabilities = [];
              break;
          }

          return {
            name: mcp.split('/')[1].replace('server-', ''),
            enabled: true,
            transport: 'stdio',
            command: 'npx',
            args: [mcp],
            env: env,
            capabilities: capabilities,
            tools: tools,
          };
        }),
      },
    };

    const agentCardJsonString = JSON.stringify(agentCard, null, 2);
    //setAgentCardJson(agentCardJsonString)
    router.push(`/agent-viewer?agentCardJson=${encodeURIComponent(agentCardJsonString)}`);

  };

  const providerModels: {[key: string]: string[]} = {
    Google: ['gemini-2-flash'],
    Cerebras: ['llama-4-scout-17b-16e-instruct'],
    Groq: ['qwen-qwq-32b'],
  };

  const dndClasses = [
    {name: 'Wizard', icon: '🧙‍♂️'},
    {name: 'Rogue', icon: '🗡️'},
    {name: 'Cleric', icon: '🛡️'},
    {name: 'Fighter', icon: '🏹'},
    {name: 'Bard', icon: '🧝'},
    {name: 'Sorcerer', icon: '🐉'},
  ];

  const dndRaces = [
    'Human',
    'Elf',
    'Dwarf',
    'Gnome',
    'Halfling',
    'Dragonborn',
    'Tiefling',
    'Orc',
  ];

  const getSkillDetails = () => {
    let skillId;
    if (agentType === 'service') {
      return {
        id: 'service',
        name: 'Service',
        description: 'Calculation, Memory, Scheduling',
        tags: ['service'],
      };
    } else {
      skillId = selectedClass;
    }
    const skillOptions = {
      wizard: {
        id: 'magic',
        name: 'Magic',
        description: 'Utilizes magical powers for various tasks.',
        tags: ['magic', 'powers'],
      },
      rogue: {
        id: 'stealth',
        name: 'Stealth',
        description: 'Executes covert operations and remains unseen.',
        tags: ['covert', 'operations'],
      },
      cleric: {
        id: 'healing',
        name: 'Healing',
        description: 'Provides medical assistance and support.',
        tags: ['medical', 'support'],
      },
      fighter: {
        id: 'combat',
        name: 'Combat',
        description: 'Engages in combat and strategic battles.',
        tags: ['combat', 'strategy'],
      },
      bard: {
        id: 'performance',
        name: 'Performance',
        description: 'Entertains and inspires through music and stories.',
        tags: ['performance', 'inspiration'],
      },
      sorcerer: {
        id: 'elemental_magic',
        name: 'Elemental Magic',
        description: 'Wields powerful elemental magic.',
        tags: ['magic', 'elements'],
      },
      service: {
        id: 'service',
        name: 'Service',
        description: 'Calculation, Memory, Scheduling',
        tags: ['service'],
      },
      default: {
        id: 'default',
        name: 'Default Skill',
        description: 'A default skill with no specific capabilities.',
        tags: ['default'],
      },
    };
    return skillOptions[skillId] || skillOptions.default;
  };

  React.useEffect(() => {
    if (agentType === 'service') {
      setAgentIcon('🤖');
    } else {
      const selectedClassDetails = dndClasses.find((c) => c.name.toLowerCase() === selectedClass);
      if (selectedClassDetails) {
        setAgentIcon(selectedClassDetails.icon);
      }
    }
  }, [selectedClass, agentType]);

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Agent Maker</CardTitle>
          <CardDescription>Create and configure AI agents using natural language descriptions.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="agent-name">Agent Name</Label>
              <Input
                type="text"
                id="agent-name"
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                placeholder="Enter agent name"
              />
            </div>
            <div>
              <Label htmlFor="agent-type">Agent Type</Label>
              <Select onValueChange={(value) => {
                setAgentType(value);
                if (value === 'service') {
                  setAgentIcon('🤖');
                }
              }}>
                <SelectTrigger id="agent-type">
                  <SelectValue placeholder="Select agent type"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="character">Character</SelectItem>
                  <SelectItem value="NPC">NPC</SelectItem>
                  <SelectItem value="service">Service</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="agent-url">Agent URL</Label>
              <Input
                type="text"
                id="agent-url"
                value={agentUrl}
                onChange={(e) => setAgentUrl(e.target.value)}
                placeholder="Enter agent URL"
              />
            </div>
            {agentType !== 'service' && (
              <div>
                <Label htmlFor="agent-icon">Agent Class</Label>
                <Select onValueChange={(value) => {
                  setSelectedClass(value);
                  const selectedClassDetails = dndClasses.find((c) => c.name.toLowerCase() === value);
                  if (selectedClassDetails) {
                    setAgentIcon(selectedClassDetails.icon);
                  }
                }} value={agentIcon}>
                  <SelectTrigger id="agent-class">
                    <SelectValue placeholder="Select agent class"/>
                  </SelectTrigger>
                  <SelectContent>
                    {dndClasses.map((dndClass) => (
                      <SelectItem key={dndClass.name} value={dndClass.name.toLowerCase()}>
                        {dndClass.icon} {dndClass.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {agentType !== 'service' && (
              <div>
                <Label htmlFor="agent-race">Agent Race</Label>
                <Select onValueChange={(value) => setSelectedRace(value)}>
                  <SelectTrigger id="agent-race">
                    <SelectValue placeholder="Select agent race"/>
                  </SelectTrigger>
                  <SelectContent>
                    {dndRaces.map((race) => (
                      <SelectItem key={race} value={race}>
                        {race}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div>
              <Label htmlFor="agent-theme-color">Agent Theme Color</Label>
              <Input
                type="text"
                id="agent-theme-color"
                value={agentThemeColor}
                onChange={(e) => setAgentThemeColor(e.target.value)}
                placeholder="Enter agent theme color (e.g., #4285F4)"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="agent-description">Agent Description</Label>
            <Textarea
              id="agent-description"
              value={agentDescription}
              onChange={(e) => setAgentDescription(e.target.value)}
              placeholder="Describe the agent"
            />
          </div>

          <div>
            <Label>Select MCPs</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {availableMcps.map((mcp) => (
                <div key={mcp} className="flex items-center space-x-2">
                  <Checkbox id={mcp} checked={selectedMcps.includes(mcp)}
                            onCheckedChange={() => handleMcpSelection(mcp)}/>
                  <Label htmlFor={mcp}>{mcp}</Label>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="provider">Provider</Label>
              <Select onValueChange={(value) => setSelectedProvider(value)}>
                <SelectTrigger id="provider">
                  <SelectValue placeholder="Select provider"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Google">Google</SelectItem>
                  <SelectItem value="Cerebras">Cerebras</SelectItem>
                  <SelectItem value="Groq">Groq</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="model">Model</Label>
              <Select onValueChange={(value) => setSelectedModel(value)} disabled={!selectedProvider}>
                <SelectTrigger id="model">
                  <SelectValue placeholder="Select model"/>
                </SelectTrigger>
                <SelectContent>
                  {selectedProvider &&
                    providerModels[selectedProvider]?.map((model) => (
                      <SelectItem key={model} value={model}>
                        {model}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button onClick={handleSubmit} disabled={isGenerating}>
              {isGenerating ? 'Generating...' : 'Generate Agent'}
            </Button>
            <Button variant="outline" onClick={handleViewAgentCard} disabled={isGenerating}>
              View AgentCard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentMakerPage;
