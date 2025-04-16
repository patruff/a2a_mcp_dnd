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
import {useState} from 'react';
import {Copy} from 'lucide-react';
import {AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger} from '@/components/ui/alert-dialog';

const AgentMakerPage: React.FC = () => {
  const [agentName, setAgentName] = React.useState('DefaultAgentName');
  const [agentType, setAgentType] = React.useState('character');
  const [agentDescription, setAgentDescription] = React.useState('');
  const [agentUrl, setAgentUrl] = React.useState('http://localhost:41250');
  const [agentIcon, setAgentIcon] = React.useState('🧙‍♂️');
  const [agentThemeColor, setAgentThemeColor] = React.useState('#4285F4');
  const [selectedMcps, setSelectedMcps] = React.useState<string[]>([]);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [selectedProvider, setSelectedProvider] = React.useState<string>('Google');
  const [selectedModel, setSelectedModel] = React.useState<string>('gemini-2-flash');
  const [selectedClass, setSelectedClass] = React.useState<string>('wizard');
  const [selectedRace, setSelectedRace] = React.useState<string>('human');
  const [selectedAlignment, setSelectedAlignment] = React.useState<string>('neutral good');
  const [selectedGender, setSelectedGender] = React.useState<string>('male');
  const [strength, setStrength] = useState<number>(10);
  const [dexterity, setDexterity] = useState<number>(10);
  const [constitution, setConstitution] = useState<number>(10);
  const [intelligence, setIntelligence] = useState<number>(10);
  const [wisdom, setWisdom] = useState<number>(10);
  const [charisma, setCharisma] = useState<number>(10);
  const [initialAction, setInitialAction] = useState<string>('');
  const [selectedPersonality, setSelectedPersonality] = useState<string>('stoic');
  const [selectedSpeechStyle, setSelectedSpeechStyle] = useState<string>('formal');

  const {toast} = useToast();
  const router = useRouter();

  const [agentCardJson, setAgentCardJson] = useState<string>('');

  const [agentList, setAgentList] = useState<any[]>([]);

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

  const generateAgentCard = (skillDetails: any) => {
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
        skillDetails,
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
      character: {
        name: agentName,
        race: selectedRace,
        class: selectedClass,
        level: 1,
        personality: selectedPersonality,
        speech_style: selectedSpeechStyle,
        description: agentDescription,
        port: 41249,
        initial_action: initialAction,
        skills: [],
        stats: {
          strength: strength,
          dexterity: dexterity,
          constitution: constitution,
          intelligence: intelligence,
          wisdom: wisdom,
          charisma: charisma
        },
        skills_list: [],
      },
    };
    return agentCard;
  };

  const handleMcpSelection = (mcp: string) => {
    setSelectedMcps((prev) => (prev.includes(mcp) ? prev.filter((item) => item !== mcp) : [...prev, mcp]));
  };

  const handleSubmit = async () => {
    let skillDetails;
    if (agentType === 'NPC') {
      skillDetails = npcSkillsDetails[selectedClass];
    } else {
      skillDetails = getSkillDetails();
    }
    const agentCard = generateAgentCard(skillDetails);
    const agentCardJsonString = JSON.stringify(agentCard, null, 2);
    setAgentCardJson(agentCardJsonString);

    // Add the agent to the agent list
    setAgentList((prevList) => [
      ...prevList,
      {
        name: agentName,
        type: agentType,
        class: selectedClass,
      },
    ]);

    toast({
      title: 'Agent Generated',
      description: `Added agent ${agentName} to the list of agents. See the agent list page for more.`,
    });
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
    let language;
    let racialTraits = [];

    if (agentType === 'service') {
      return {
        id: 'service',
        name: 'Service',
        description: 'Calculation, Memory, Scheduling',
        tags: ['service'],
        language: 'N/A', // Services don't typically have a language
        racialTraits: [], // Services don't have racial traits
      };
    } else {
      skillId = selectedClass;
      switch (selectedRace) {
        case 'Elf':
          language = 'Elvish';
          racialTraits = ['Darkvision', 'Keen Senses', 'Fey Ancestry', 'Trance'];
          break;
        case 'Dwarf':
          language = 'Dwarvish';
          racialTraits = ['Darkvision', 'Dwarven Resilience', 'Dwarven Combat Training', 'Stonecunning'];
          break;
        case 'Gnome':
          language = 'Gnomish';
          racialTraits = ['Darkvision', 'Gnome Cunning'];
          break;
        case 'Halfling':
          language = 'Halfling';
          racialTraits = ['Lucky', 'Brave', 'Halfling Nimbleness'];
          break;
        case 'Dragonborn':
          language = 'Draconic';
          racialTraits = ['Draconic Ancestry', 'Breath Weapon', 'Damage Resistance'];
          break;
        case 'Tiefling':
          language = 'Infernal';
          racialTraits = ['Darkvision', 'Hellish Resistance', 'Infernal Legacy'];
          break;
        case 'Orc':
          language = 'Orcish';
          racialTraits = ['Darkvision', 'Aggressive', 'Menacing'];
          break;
        default:
          language = 'Common';
          racialTraits = [];
          break;
      }
    }
    const skillOptions = {
      wizard: {
        id: 'magic',
        name: 'Magic',
        description: 'Utilizes magical powers for various tasks.',
        tags: ['magic', 'powers'],
        language: language,
        racialTraits: racialTraits,
      },
      rogue: {
        id: 'stealth',
        name: 'Stealth',
        description: 'Executes covert operations and remains unseen.',
        tags: ['covert', 'operations'],
        language: language,
        racialTraits: racialTraits,
      },
      cleric: {
        id: 'healing',
        name: 'Healing',
        description: 'Provides medical assistance and support.',
        tags: ['medical', 'support'],
        language: language,
        racialTraits: racialTraits,
      },
      fighter: {
        id: 'combat',
        name: 'Combat',
        description: 'Engages in combat and strategic battles.',
        tags: ['combat', 'strategy'],
        language: language,
        racialTraits: racialTraits,
      },
      bard: {
        id: 'performance',
        name: 'Performance',
        description: 'Entertains and inspires through music and stories.',
        tags: ['performance', 'inspiration'],
        language: language,
        racialTraits: racialTraits,
      },
      sorcerer: {
        id: 'elemental_magic',
        name: 'Elemental Magic',
        description: 'Wields powerful elemental magic.',
        tags: ['magic', 'elements'],
        language: language,
        racialTraits: racialTraits,
      },
      service: {
        id: 'service',
        name: 'Service',
        description: 'Calculation, Memory, Scheduling',
        tags: ['service'],
        language: 'N/A',
        racialTraits: [],
      },
    };
    return skillOptions[skillId] || skillOptions.default;
  };

  const dndAlignments = [
    'lawful good', 'neutral good', 'chaotic good',
    'lawful neutral', 'neutral', 'chaotic neutral',
    'lawful evil', 'neutral evil', 'chaotic evil',
  ];

  const dndNpcs = [
    'Bartender',
    'Blacksmith',
    'Old Man',
    'Woman in Distress',
    'Merchant',
    'Guard',
    'Innkeeper',
    'Beggar',
    'Noble',
    'Mystic'
  ];

  const npcSkills = {
    'Bartender': 'innkeeping',
    'Blacksmith': 'blacksmithing',
    'Old Man': 'aid',
    'Woman in Distress': 'aid',
    'Merchant': 'trading',
    'Guard': 'guarding',
    'Innkeeper': 'innkeeping',
    'Beggar': 'begging',
    'Noble': 'nobility',
    'Mystic': 'divination',
  };
  const npcSkillsDetails = {
    innkeeping: {
      id: 'innkeeping',
      name: 'Innkeeping',
      description: 'Manages and serves customers at an inn.',
      tags: ['service', 'hospitality'],
      language: 'Common',
      racialTraits: [],
    },
    blacksmithing: {
      id: 'blacksmithing',
      name: 'Blacksmithing',
      description: 'Crafts and repairs metal items.',
      tags: ['crafting', 'metalworking'],
      language: 'Common',
      racialTraits: [],
    },
    aid: {
      id: 'aid',
      name: 'Aid',
      description: 'Solicits help from others and provides help.',
      tags: ['survival', 'reliance'],
      language: 'Common',
      racialTraits: [],
    },
    trading: {
      id: 'trading',
      name: 'Trading',
      description: 'Buys and sells goods for profit.',
      tags: ['commerce', 'negotiation'],
      language: 'Common',
      racialTraits: [],
    },
    guarding: {
      id: 'guarding',
      name: 'Guarding',
      description: 'Protects and patrols areas.',
      tags: ['protection', 'security'],
      language: 'Common',
      racialTraits: [],
    },
    nobility: {
      id: 'nobility',
      name: 'Nobility',
      description: 'Commands respect and manages estates.',
      tags: ['leadership', 'management'],
      language: 'Common',
      racialTraits: [],
    },
    divination: {
      id: 'divination',
      name: 'Divination',
      description: 'Foretells the future and provides guidance.',
      tags: ['magic', 'guidance'],
      language: 'Common',
      racialTraits: [],
    },
    default: {
      id: 'default',
      name: 'Default Skill',
      description: 'A default skill with no specific capabilities.',
      tags: ['default'],
      language: 'Common',
      racialTraits: [],
    },
  };

  const dndGenders = [
    'male',
    'female',
    'other',
  ];

  const personalities = [
    'stoic',
    'cheerful',
    'brooding',
    'witty',
    'pessimistic',
    'optimistic',
    'reserved',
  ];

  const speechStyles = [
    'formal',
    'informal',
    'poetic',
    'blunt',
    'verbose',
    'laconic',
    'musical',
  ];

  const npcIcons = {
    'Bartender': '🍺',
    'Blacksmith': '🔨',
    'Old Man': '👴',
    'Woman in Distress': '🥺',
    'Merchant': '💰',
    'Guard': '🛡️',
    'Innkeeper': '🏨',
    'Beggar': '🕳️',
    'Noble': '👑',
    'Mystic': '🔮'
  };

  React.useEffect(() => {
    if (agentType === 'service') {
      setAgentIcon('🤖');
      setAgentDescription('Calculation, Memory, Scheduling');
      setSelectedClass('service');

    } else if (agentType === 'NPC') {
      const npcIcon = npcIcons[agentName] || '👤';
      setAgentIcon(npcIcon);
      setAgentDescription(`Generic ${agentName} NPC Description`);
      const npcSkill = npcSkills[agentName] || 'default';
      setSelectedClass(npcSkill);

    }
    else {
      const selectedClassDetails = dndClasses.find((c) => c.name.toLowerCase() === selectedClass);
      if (selectedClassDetails) {
        setAgentIcon(selectedClassDetails.icon);
      }
    }
  }, [selectedClass, agentType, agentName]);

  const themeColors = [
    '#4285F4', // Blue
    '#34A853', // Green
    '#FBBC05', // Yellow
    '#EA4335', // Red
    '#9C27B0', // Purple
    '#E67C26', // Orange
    '#00BCD4', // Cyan
    '#03A9F4', // Light Blue
    '#795548', // Brown
    '#607D8B', // Blue Grey
  ];

  const dndIcons = [
    '🧙‍♂️',   // Wizard
    '🗡️',   // Rogue
    '🛡️',   // Cleric
    '🏹',   // Fighter
    '🧝',   // Bard
    '🐉',   // Sorcerer
    '👤',   // Generic
    '🍺',    // Bartender
    '🔨',    // Blacksmith
    '👵',    // Old Woman
  ];

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
                  setSelectedClass('service');

                } else if (value === 'NPC') {
                  const npcIcon = npcIcons[agentName] || '👤';
                  setAgentIcon(npcIcon);
                  setAgentDescription(`Generic ${agentName} NPC Description`);
                  const npcSkill = npcSkills[agentName] || 'default';
                  setSelectedClass(npcSkill);

                } else {
                  const selectedClassDetails = dndClasses.find((c) => c.name.toLowerCase() === selectedClass);
                  if (selectedClassDetails) {
                    setAgentIcon(selectedClassDetails.icon);
                  }
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
            {(agentType === 'character' || agentType === 'NPC') && (
              <div>
                <Label htmlFor="agent-gender">Agent Gender</Label>
                <Select onValueChange={(value) => setSelectedGender(value)} value={selectedGender}>
                  <SelectTrigger id="agent-gender">
                    <SelectValue placeholder="Select agent gender"/>
                  </SelectTrigger>
                  <SelectContent>
                    {dndGenders.map((gender) => (
                      <SelectItem key={gender} value={gender}>
                        {gender}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

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
                  const npcIcon = npcIcons[value] || '👤';
                  setAgentIcon(npcIcon);
                  const npcSkill = npcSkills[value] || 'default';
                  setSelectedClass(npcSkill);
                }} value={agentName}>
                  <SelectTrigger id="agent-npc">
                    <SelectValue placeholder="Select agent NPC"/>
                  </SelectTrigger>
                  <SelectContent>
                    {dndNpcs.map((npc) => (
                      <SelectItem key={npc} value={npc}>
                        {npcIcons[npc] || '👤'} {npc}
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
            {(agentType === 'character') && (
              <div>
                <Label htmlFor="agent-alignment">Agent Alignment</Label>
                <Select onValueChange={(value) => setSelectedAlignment(value)} value={selectedAlignment}>
                  <SelectTrigger id="agent-alignment">
                    <SelectValue placeholder="Select agent alignment"/>
                  </SelectTrigger>
                  <SelectContent>
                    {dndAlignments.map((alignment) => (
                      <SelectItem key={alignment} value={alignment}>
                        {alignment}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div>
              <Label htmlFor="agent-theme-color">Agent Theme Color</Label>
              <Input
                type="color"
                id="agent-theme-color"
                value={agentThemeColor}
                onChange={(e) => setAgentThemeColor(e.target.value)}
              />
            </div>
          </div>
          {(agentType === 'character' || agentType === 'NPC') && (
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="strength">Strength</Label>
                <Input
                  type="number"
                  id="strength"
                  value={String(strength)}
                  onChange={(e) => setStrength(Number(e.target.value))}
                  placeholder="Strength"
                />
              </div>
              <div>
                <Label htmlFor="dexterity">Dexterity</Label>
                <Input
                  type="number"
                  id="dexterity"
                  value={String(dexterity)}
                  onChange={(e) => setDexterity(Number(e.target.value))}
                  placeholder="Dexterity"
                />
              </div>
              <div>
                <Label htmlFor="constitution">Constitution</Label>
                <Input
                  type="number"
                  id="constitution"
                  value={String(constitution)}
                  onChange={(e) => setConstitution(Number(e.target.value))}
                  placeholder="Constitution"
                />
              </div>
              <div>
                <Label htmlFor="intelligence">Intelligence</Label>
                <Input
                  type="number"
                  id="intelligence"
                  value={String(intelligence)}
                  onChange={(e) => setIntelligence(Number(e.target.value))}
                  placeholder="Intelligence"
                />
              </div>
              <div>
                <Label htmlFor="wisdom">Wisdom</Label>
                <Input
                  type="number"
                  id="wisdom"
                  value={String(wisdom)}
                  onChange={(e) => setWisdom(Number(e.target.value))}
                  placeholder="Wisdom"
                />
              </div>
              <div>
                <Label htmlFor="charisma">Charisma</Label>
                <Input
                  type="number"
                  id="charisma"
                  value={String(charisma)}
                  onChange={(e) => setCharisma(Number(e.target.value))}
                  placeholder="Charisma"
                />
              </div>
            </div>
          )}
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
            <Label htmlFor="initial-action">Initial Action</Label>
            <Textarea
              id="initial-action"
              value={initialAction}
              onChange={(e) => setInitialAction(e.target.value)}
              placeholder="Describe the initial action"
            />
          </div>
          <div>
            <Label htmlFor="agent-personality">Agent Personality</Label>
            <Select onValueChange={(value) => setSelectedPersonality(value)} value={selectedPersonality}>
              <SelectTrigger id="agent-personality">
                <SelectValue placeholder="Select agent personality"/>
              </SelectTrigger>
              <SelectContent>
                {personalities.map((personality) => (
                  <SelectItem key={personality} value={personality}>
                    {personality}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="agent-speech-style">Agent Speech Style</Label>
            <Select onValueChange={(value) => setSelectedSpeechStyle(value)} value={selectedSpeechStyle}>
              <SelectTrigger id="agent-speech-style">
                <SelectValue placeholder="Select agent speech style"/>
              </SelectTrigger>
              <SelectContent>
                {speechStyles.map((style) => (
                  <SelectItem key={style} value={style}>
                    {style}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Select MCPs</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {availableMcps.map((mcp) => (
                <div key={mcp} className="flex items-center space-x-2">
                  <Input type="checkbox" id={mcp} checked={selectedMcps.includes(mcp)}
                         onChange={() => handleMcpSelection(mcp)}/>
                  <Label htmlFor={mcp}>{mcp}</Label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button onClick={handleSubmit}>
                  Generate Agent
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Agent Card Preview</AlertDialogTitle>
                  <AlertDialogDescription>
                    {agentCardJson ? (
                      <pre className="mt-4 p-4 bg-gray-100 rounded-md overflow-auto">
                        {agentCardJson}
                      </pre>
                    ) : (
                      "No Agent Card JSON generated yet."
                    )}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogAction onClick={handleSubmit}>Okay</AlertDialogAction>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </AlertDialogContent>
            </AlertDialog>
            <Button variant="outline" onClick={() => {
              let skillDetails;
              if (agentType === 'NPC') {
                skillDetails = npcSkillsDetails[selectedClass];
              } else {
                skillDetails = getSkillDetails();
              }
              const agentCard = generateAgentCard(skillDetails);
              const agentCardJsonString = JSON.stringify(agentCard, null, 2);
              setAgentCardJson(agentCardJsonString);
              router.push(`/agent-viewer?agentCardJson=${encodeURIComponent(agentCardJsonString)}`);

            }}>
              View AgentCard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentMakerPage;
