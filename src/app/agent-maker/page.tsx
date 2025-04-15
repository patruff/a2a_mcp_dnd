'use client';

import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Button} from '@/components/ui/button';
import {useToast} from '@/hooks/use-toast';
import {useRouter} from 'next/navigation';
import {Checkbox} from "@/components/ui/checkbox"

const AgentMakerPage: React.FC = () => {
  const [agentName, setAgentName] = React.useState('DefaultAgentName');
  const [agentType, setAgentType] = React.useState('service');
  const [agentDescription, setAgentDescription] = React.useState('Calculation, Memory, Scheduling');
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
          preferred_model: selectedModel,
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
                break;
              case '@patruff/server-terminator':
                tools = [
                  {name: 'terminator/terminateLocalFile', description: 'Permanently delete a file from local filesystem'},
                  {name: 'terminator/terminateRemoteFile', description: 'Permanently delete a file from a GitHub repository'},
                ];
                capabilities = ['terminator'];
                break;
              case '@patruff/server-flux':
                tools = [
                  {name: 'flux/generateImage', description: 'Generate an image using Flux model'},
                  {name: 'flux/editImage', description: 'Edit an existing image with text prompts'},
                ];
                capabilities = ['image_generation'];
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
        preferred_model: selectedModel,
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
              break;
            case '@patruff/server-terminator':
              tools = [
                {name: 'terminator/terminateLocalFile', description: 'Permanently delete a file from local filesystem'},
                {name: 'terminator/terminateRemoteFile', description: 'Permanently delete a file from a GitHub repository'},
              ];
              capabilities = ['terminator'];
              break;
            case '@patruff/server-flux':
              tools = [
                {name: 'flux/generateImage', description: 'Generate an image using Flux model'},
                {name: 'flux/editImage', description: 'Edit an existing image with text prompts'},
              ];
              capabilities = ['image_generation'];
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

  const dndNpcs = [
    'Bartender',
    'Old Man',
    'Woman in Distress',
    'Blacksmith',
    'Traveling Merchant',
    'Town Guard',
    'Wise Hermit',
    'Noble',
    'Jester',
    'Acolyte',
  ];

  const themeColors = [
      '#1A237E', // Dark Blue
      '#EEEEEE', // Light Gray
      '#00BCD4', // Teal
      '#4CAF50', // Green
      '#FFC107', // Amber
      '#FF5722', // Deep Orange
      '#673AB7', // Deep Purple
      '#795548', // Brown
      '#607D8B', // Blue Grey
      '#9E9E9E'  // Grey
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
    } else if (agentType === 'NPC') {
      // Define skill sets for various NPCs
      const npcSkills = {
        Bartender: {
          id: 'bartending',
          name: 'Bartending',
          description: 'Mixing drinks and managing the bar',
          tags: ['service', 'bar', 'drinks'],
        },
        'Old Man': {
          id: 'wisdom',
          name: 'Wisdom',
          description: 'Providing advice and guidance',
          tags: ['knowledge', 'advice'],
        },
        'Woman in Distress': {
          id: 'deception',
          name: 'Deception',
          description: 'Appearing vulnerable to gain assistance',
          tags: ['acting', 'vulnerability'],
        },
        Blacksmith: {
          id: 'blacksmithing',
          name: 'Blacksmithing',
          description: 'Crafting metal items',
          tags: ['crafting', 'metalwork'],
        },
        'Traveling Merchant': {
          id: 'trading',
          name: 'Trading',
          description: 'Buying and selling goods',
          tags: ['commerce', 'negotiation'],
        },
        'Town Guard': {
          id: 'guarding',
          name: 'Guarding',
          description: 'Protecting the town and enforcing laws',
          tags: ['security', 'law'],
        },
        'Wise Hermit': {
          id: 'herbalism',
          name: 'Herbalism',
          description: 'Knowledge of plants and their uses',
          tags: ['nature', 'medicine'],
        },
        Noble: {
          id: 'diplomacy',
          name: 'Diplomacy',
          description: 'Negotiating and managing social situations',
          tags: ['politics', 'social'],
        },
        Jester: {
          id: 'performance',
          name: 'Performance',
          description: 'Entertaining and distracting with humor',
          tags: ['entertainment', 'humor'],
        },
        Acolyte: {
          id: 'healing',
          name: 'Healing',
          description: 'Providing religious and medical aid',
          tags: ['religion', 'medicine'],
        },
      };
      return npcSkills[agentName] || {
        id: 'default',
        name: 'Default Skill',
        description: 'A default skill with no specific capabilities.',
        tags: ['default'],
      };
    }
    else {
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
      setAgentDescription('Calculation, Memory, Scheduling');
    } else if (agentType === 'NPC') {
      setAgentIcon('👤');
      setAgentDescription(`Generic ${agentName} NPC Description`);
    }
    else {
      const selectedClassDetails = dndClasses.find((c) => c.name.toLowerCase() === selectedClass);
      if (selectedClassDetails) {
        setAgentIcon(selectedClassDetails.icon);
      }
    }
  }, [selectedClass, agentType, agentName]);

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
                  setAgentDescription('Calculation, Memory, Scheduling');
                } else if (value === 'NPC') {
                  setAgentIcon('👤');
                  setAgentDescription(`Generic ${agentName} NPC Description`);
                }
              }} value={agentType}>
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
            {(agentType === 'character') && (
              <div>
                <Label htmlFor="agent-class">Agent Class</Label>
                <Select onValueChange={(value) => {
                  setSelectedClass(value);
                  const selectedClassDetails = dndClasses.find((c) => c.name.toLowerCase() === value);
                  if (selectedClassDetails) {
                    setAgentIcon(selectedClassDetails.icon);
                  }
                }} value={selectedClass}>
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
            {(agentType === 'NPC') && (
              <div>
                <Label htmlFor="agent-icon">Agent NPC</Label>
                <Select onValueChange={(value) => {
                  setAgentName(value);
                  setAgentDescription(`Generic ${value} NPC Description`);
                  setAgentIcon('👤');
                }} value={agentName}>
                  <SelectTrigger id="agent-npc">
                    <SelectValue placeholder="Select agent NPC"/>
                  </SelectTrigger>
                  <SelectContent>
                    {dndNpcs.map((npc) => (
                      <SelectItem key={npc} value={npc}>
                        👤 {npc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(agentType === 'character') && (
              <div>
                <Label htmlFor="agent-race">Agent Race</Label>
                <Select onValueChange={(value) => setSelectedRace(value)} value={selectedRace}>
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
              <Select onValueChange={(value) => setAgentThemeColor(value)} value={agentThemeColor}>
                <SelectTrigger id="agent-theme-color">
                  <SelectValue placeholder="Select theme color"/>
                </SelectTrigger>
                <SelectContent>
                  {themeColors.map((color) => (
                    <SelectItem key={color} value={color}>
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
              <Select onValueChange={(value) => setSelectedProvider(value)} value={selectedProvider}>
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
              <Select onValueChange={(value) => setSelectedModel(value)} disabled={!selectedProvider} value={selectedModel}>
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
              {isGenerating ? 'Generate...' : 'Generate Agent'}
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
