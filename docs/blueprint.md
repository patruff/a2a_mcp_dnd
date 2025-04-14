# **App Name**: AgentVerse

## Core Features:

- AI-Powered Agent Maker: Use LLMs to generate agent code and AgentCard JSON from natural language descriptions. The user will be able to select from available MCPs to incorporate into the agent. Provides code editing and preview before saving.
- JSON Interaction Visualization: Capture and store JSON messages between agents. Display a timeline view with expandable entries. Allow filtering by agent, time, and action type. Show complete and prettified JSON on expansion.
- AI-Enhanced Interaction Summarization: Employ an LLM tool to summarize interactions between agents into concise, expandable summaries. Highlight key actions and results.  Group related interactions for context.
- Model Provider Management: Implement an interface to configure and switch between different LLM providers (Google, Cerebras, Groq).  Allow global or agent-specific provider settings. Track performance and usage metrics for each provider.
- MCP Management: Manage Model Context Protocol (MCP) components that agents can access. List available MCPs with descriptions and capabilities. Provide interfaces to configure MCP parameters. Give agents access to databases and external APIs.

## Style Guidelines:

- Primary color: Dark blue (#1A237E) for a professional and sophisticated look.
- Secondary color: Light gray (#EEEEEE) for backgrounds and subtle contrasts.
- Accent: Teal (#00BCD4) for interactive elements and highlights.
- Clean and modern typography for readability and clarity.
- Simple and consistent icons to represent different agent types and actions.
- Well-structured layout with clear sections and intuitive navigation.
- Subtle animations for loading states and transitions.

## Original User Request:
# GenKit A2A DnD Firebase Web App Specification

## Overview

This document outlines the specifications for a Firebase web application to enhance the existing GenKit A2A DnD framework. The app will provide a user-friendly interface for managing AI agents, visualizing their interactions, and configuring the underlying model providers.

## Project Goals

1. Create an "Agent Maker" that generates agent code and AgentCard JSON based on natural language descriptions
2. Implement a JSON summarizer to create concise, expandable summaries of agent interactions
3. Develop a model switching capability to alternate between Google (Gemini), Cerebras (Llama), and Groq (Qwen) APIs

## Architecture

### Backend

- **Firebase Functions**: Serverless functions to handle API calls to various LLM providers
- **Firebase Firestore**: Database to store agent configurations, interaction logs, and user preferences
- **Firebase Storage**: For storing generated agent code files and logs
- **Firebase Authentication**: Secure access to the application

### Frontend

- **React**: For building the user interface
- **Firebase Hosting**: To serve the web application
- **React Router**: For navigation between different app sections
- **Material UI**: Component library for consistent UI design
- **Monaco Editor**: Code editor for viewing and editing generated agent code

## Feature Specifications

### 1. MCP Management

#### Description
A dedicated system for managing Model Context Protocol (MCP) components that agents can access.

#### Requirements

1. **MCP Registry**:
   - List all available MCPs with descriptions and capabilities
   - Categorize MCPs by type (filesystem, translation, API access, etc.)
   - Show connection details (stdio-based connections, not HTTP)
   - Display usage statistics and dependencies

2. **MCP Configuration**:
   - Interface to configure MCP parameters
   - Test MCP functionality directly from UI
   - View logs of MCP usage across agents
   - Manage MCP permissions and access controls

3. **MCP Documentation**:
   - Detailed documentation for each MCP
   - Example code snippets for using MCPs
   - Integration tutorials for developers
   - Standardized format descriptions

4. **MCP Creation Helper**:
   - Wizard for creating new MCPs
   - Templates for common MCP types
   - Validation tools for MCP interfaces
   - Deployment tools for new MCPs

#### MCP List (Example)
| Name | Type | Description | Interface | Status |
|------|------|-------------|-----------|--------|
| filesystem_mcp | File Access | Read/write access to specified directories | stdio | Active |
| spanish_translation_mcp | Translation | Translates text between English and Spanish | stdio | Active |
| weather_api_mcp | External API | Fetches current weather data for locations | stdio | Active |
| database_mcp | Data Storage | Access to shared database for agent memory | stdio | Active |
| image_generation_mcp | Content Creation | Creates images from text descriptions | stdio | Active |
| calendar_mcp | Time | Access to scheduling and time-based events | stdio | Active |

### 2. Agent Maker

#### Description
A tool that generates complete agent components based on natural language descriptions.

#### Requirements

1. **Input Interface**:
   - Text field for agent name
   - Text area for detailed description
   - Dropdown for agent type (character, NPC, service, etc.)
   - MCP Selection panel with available MCPs from registry (stdio-based)
   - Optional specific attributes (stats, skills, goals)
   - MCP configuration options specific to selected MCPs

2. **Generation Process**:
   - Send description to LLM model (current model set in user preferences)
   - LLM generates agent code in TypeScript
   - LLM generates AgentCard JSON
   - Preview of agent files before confirmation

3. **Output Artifacts**:
   - Agent TypeScript file (index.ts)
   - AgentCard JSON file
   - Prompt template file if applicable
   - Configuration file with port, dependencies, etc.
   - Documentation for the agent capabilities

4. **Integration Steps**:
   - Option to deploy agent directly to local environment
   - Generate startup script for the agent
   - Test agent functionality through UI

#### Example Flow

1. User enters: "Human fighter that can call MCP spanish_language"
2. System processes description and identifies components:
   - Base: Human fighter character
   - MCPs: Spanish language translation
   - Suggested skills: Combat, strength, etc.
3. LLM generates code and AgentCard
4. User reviews and can edit before saving
5. System saves agent to Firestore and optionally downloads files

### 2. JSON Interaction Summarizer

#### Description
A visualization tool that summarizes JSON messages between agents and allows expanding specific interactions.

#### Requirements

1. **Data Collection**:
   - Capture all JSON messages between agents
   - Store structured data about interactions, actions, and results
   - Timestamp and categorize all exchanges

2. **Summary Generation**:
   - Use LLM to generate concise one-line summaries
   - Group related interactions (e.g., continuous conversation between same agents)
   - Add visual indicators for actions, their success/failure

3. **Visualization Interface**:
   - Timeline view of all interactions
   - Collapsible/expandable entries
   - Filtering options (by agent, by time, by action type)
   - Search functionality
   - Color coding by interaction type

4. **Detail View**:
   - Show complete JSON when expanded
   - Prettify and highlight important fields
   - Option to view raw JSON
   - Visualize skill checks and dice rolls

#### Example Display

```
[12:30:45] Wizard saw future, read file ▶
   └─ [expanded] Shows full JSON with actions, skill checks, and results

[12:31:22] Bartender suspects gnome thief ▶
   └─ [expanded] Shows conversation JSON, perception checks, etc.

[12:32:18] Combat: Fighter attacks goblin (Success) ▶
   └─ [expanded] Shows attack rolls, damage calculation, state changes
```

### 3. Model Provider Switching

#### Description
A system to configure and switch between different LLM providers for all agents.

#### Requirements

1. **Provider Configuration**:
   - API key management for each provider (Google, Cerebras, Groq)
   - Model selection dropdown for each provider:
     - Google: Gemini 2 Flash
     - Cerebras: Llama-4-Scout-17B-16e-Instruct
     - Groq: Qwen-QWQ-32B
   - Custom parameters per model (temperature, max tokens, etc.)
   - Test connection button

2. **Global/Agent-Specific Settings**:
   - Set default provider for all agents
   - Override provider for specific agents
   - Save provider preferences to user profile

3. **Provider Adapter Implementation**:
   - Abstract provider interface for all LLM calls
   - Provider-specific API wrappers
   - Consistent response format processing
   - Error handling and fallback options

4. **Performance Monitoring**:
   - Track response times for each provider
   - Log token usage and estimated costs
   - Compare response quality metrics

#### Model-Specific Implementations

##### Google Gemini
```typescript
import { GoogleGenerativeAI } from "@google/generative-ai";

export class GeminiProvider implements ModelProvider {
  private model: any;
  
  constructor(apiKey: string, modelName: string = "gemini-2-flash") {
    const genAI = new GoogleGenerativeAI(apiKey);
    this.model = genAI.getGenerativeModel({ model: modelName });
  }
  
  async generateResponse(prompt: string, options: ModelOptions): Promise<string> {
    const result = await this.model.generateContent(prompt);
    return result.response.text();
  }
}
```

##### Cerebras Llama
```typescript
import { Cerebras } from "cerebras-cloud-sdk";

export class CerebrasProvider implements ModelProvider {
  private client: any;
  
  constructor(apiKey: string, modelName: string = "llama-4-scout-17b-16e-instruct") {
    this.client = new Cerebras({ apiKey });
    this.modelName = modelName;
  }
  
  async generateResponse(prompt: string, options: ModelOptions): Promise<string> {
    const completion = await this.client.chat.completions.create({
      model: this.modelName,
      messages: [{ role: "user", content: prompt }],
      max_tokens: options.maxTokens || 2000,
      temperature: options.temperature || 0.7
    });
    
    return completion.choices[0].message.content;
  }
}
```

##### Groq Qwen
```typescript
import * as groq from "groq";

export class GroqProvider implements ModelProvider {
  private client: any;
  
  constructor(apiKey: string, modelName: string = "qwen-qwq-32b") {
    this.client = new groq.Groq({ apiKey });
    this.modelName = modelName;
  }
  
  async generateResponse(prompt: string, options: ModelOptions): Promise<string> {
    const completion = await this.client.chat.completions.create({
      model: this.modelName,
      messages: [{ role: "user", content: prompt }],
      temperature: options.temperature || 0.7,
      max_tokens: options.maxTokens || 4096,
      top_p: options.topP || 0.9
    });
    
    return completion.choices[0].message.content;
  }
}
```

## UI Mockups

### MCP Management Screen
```
+-------------------------------------------------+
| MCP Registry                                  + |
+-------------------------------------------------+
| Filter: [All Types ▼] | [Status: Active ▼] | [🔍]|
|                                                 |
| +-----------------------------------------------+
| | Name: filesystem_mcp       | Type: File Access|
| | Status: ● Active           | Interface: stdio |
| +-----------------------------------------------+
| | Description: Provides file system read/write  |
| | access for agents in controlled directories.  |
| |                                               |
| | Usage: 3 active agents                        |
| |                                               |
| | [Configure] [Test] [View Logs] [Documentation]|
| +-----------------------------------------------+
|                                                 |
| +-----------------------------------------------+
| | Name: spanish_translation   | Type: Language  |
| | Status: ● Active           | Interface: stdio |
| +-----------------------------------------------+
| | Description: Translates text between English  |
| | and Spanish with natural phrasing.            |
| |                                               |
| | Usage: 1 active agent                         |
| |                                               |
| | [Configure] [Test] [View Logs] [Documentation]|
| +-----------------------------------------------+
|                                                 |
| [    Add New MCP    ] [    Import MCP    ]     |
+-------------------------------------------------+
```

### Agent Maker Screen
```
+-------------------------------------------------+
| Agent Maker                                   + |
+-------------------------------------------------+
| Agent Name: [                             ]     |
| Agent Type: [Character ▼]                       |
| Description:                                    |
| +---------------------------------------------+ |
| |                                             | |
| | Human fighter that can call MCP             | |
| | spanish_language                            | |
| |                                             | |
| +---------------------------------------------+ |
|                                                 |
| MCPs to Include (stdio interfaces):             |
| +-----------------------------------------------+
| | Available MCPs       | Selected MCPs         |
| |                      |                        |
| | [ ] database_mcp     | [x] filesystem_mcp    |
| | [ ] weather_api_mcp  | [x] spanish_trans_mcp |
| | [ ] calendar_mcp     |                        |
| | [ ] image_gen_mcp    |                        |
| +-----------------------------------------------+
|                                                 |
| MCP Configuration:                              |
| +-----------------------------------------------+
| | filesystem_mcp:                              |
| | Access paths: [/data, /shared]               |
| | Permissions: [read, write]                   |
| |                                              |
| | spanish_translation_mcp:                     |
| | Default language: [Spanish]                  |
| | Translation quality: [High ▼]                |
| +-----------------------------------------------+
|                                                 |
| Additional Attributes:                          |
| +-----------------------+  +-----------------+  |
| | Strength:     [16]    |  | Skills:         |  |
| | Dexterity:    [14]    |  | [x] Combat      |  |
| | Constitution: [15]    |  | [x] Athletics   |  |
| | Intelligence: [10]    |  | [ ] Stealth     |  |
| | Wisdom:       [12]    |  | [ ] Perception  |  |
| | Charisma:     [11]    |  | [ ] Persuasion  |  |
| +-----------------------+  +-----------------+  |
|                                                 |
| [      Generate Agent      ] [  Save Template  ]|
+-------------------------------------------------+
```

### JSON Summarizer View
```
+-------------------------------------------------+
| Agent Interactions                          + - |
+-------------------------------------------------+
| Filter: [All Agents ▼] | [All Actions ▼] | [🔍] |
|                                                 |
| Timeline:                                       |
|                                                 |
| 12:30:45 | Wizard saw future, read file       ▶ |
| +-----------------------------------------------+
| | {"task":"future_vision",                      |
| |  "agent":"WZA",                              |
| |  "action":"READ_FILE",                       |
| |  "target":"prophecy.txt",                    |
| |  "skillCheck":{                              |
| |    "roll":18,                                |
| |    "modifier":5,                             |
| |    "success":true                            |
| |  },                                          |
| |  "result":"File contents successfully read"  |
| | }                                            |
| +-----------------------------------------------+
|                                                 |
| 12:31:22 | Bartender suspects gnome thief     ▶ |
|                                                 |
| 12:32:18 | Combat: Fighter attacks goblin     ▶ |
|                                                 |
| [    Export Log    ] [    Clear History    ]    |
+-------------------------------------------------+
```

### Model Provider Configuration
```
+-------------------------------------------------+
| Model Provider Settings                      + -|
+-------------------------------------------------+
| Default Provider: [Cerebras ▼]                  |
|                                                 |
| +-------------------------------------------+   |
| | Google Gemini                             |   |
| +-------------------------------------------+   |
| | API Key: [••••••••••••••••••••••••••••]   |   |
| | Model: [Gemini 2 Flash ▼]                 |   |
| | Temperature: [0.7]                        |   |
| | Max Tokens: [2048]                        |   |
| | [     Test Connection     ]                   |
| +-------------------------------------------+   |
|                                                 |
| +-------------------------------------------+   |
| | Cerebras                                  |   |
| +-------------------------------------------+   |
| | API Key: [••••••••••••••••••••••••••••]   |   |
| | Model: [Llama-4-Scout-17B-16e-Instruct ▼] |   |
| | Temperature: [0.7]                        |   |
| | Max Tokens: [2000]                        |   |
| | [     Test Connection     ]                   |
| +-------------------------------------------+   |
|                                                 |
| +-------------------------------------------+   |
| | Groq                                      |   |
| +-------------------------------------------+   |
| | API Key: [••••••••••••••••••••••••••••]   |   |
| | Model: [Qwen-QWQ-32B ▼]                   |   |
| | Temperature: [0.7]                        |   |
| | Max Tokens: [4096]                        |   |
| | [     Test Connection     ]                   |
| +-------------------------------------------+   |
|                                                 |
| [     Save Settings     ] [     Cancel     ]    |
+-------------------------------------------------+
```

## Database Schema

### Firestore Collections

#### users
```
{
  uid: string,
  email: string,
  displayName: string,
  preferences: {
    defaultProvider: string,
    providerSettings: {
      google: {
        apiKey: string,
        model: string,
        temperature: number,
        maxTokens: number
      },
      cerebras: {
        apiKey: string,
        model: string,
        temperature: number,
        maxTokens: number
      },
      groq: {
        apiKey: string,
        model: string,
        temperature: number,
        maxTokens: number
      }
    },
    mcpDefaults: {
      // Default MCP configurations
      filesystem_mcp: {
        permissions: string[],
        paths: string[]
      },
      spanish_translation_mcp: {
        defaultLanguage: string,
        quality: string
      }
      // Additional MCP defaults...
    }
  },
  createdAt: timestamp,
  lastLogin: timestamp
}
```

#### agents
```
{
  id: string,
  name: string,
  type: string,
  description: string,
  createdBy: string,
  createdAt: timestamp,
  updatedAt: timestamp,
  deploymentStatus: string,
  port: number,
  mcps: string[],
  providerOverride: string,
  codeStoragePath: string,
  agentCard: object,
  metadata: {
    attributes: object,
    capabilities: string[],
    dependencies: string[]
  }
}
```

#### interactions
```
{
  id: string,
  timestamp: timestamp,
  summary: string,
  type: string,
  sourceAgent: string,
  targetAgent: string,
  rawJson: object,
  success: boolean,
  skillChecks: array,
  relatedInteractions: string[],
  tags: string[]
}
```

#### mcps
```
{
  id: string,
  name: string,
  description: string,
  type: string,
  interface: "stdio", // Interface type (stdio-based)
  configTemplate: object,
  initializationCode: string, // Code for initializing the MCP connection
  usageExamples: string[], // Examples of how to use the MCP
  stdioFormat: {
    inputFormat: string, // Format description for stdin
    outputFormat: string, // Format description for stdout
    errorFormat: string, // Format description for stderr
    protocols: string[] // Any specific protocols used
  },
  dependencies: string[],
  executionCommand: string, // Command to start the MCP process
  defaultPort: number,
  status: string, // Active, Inactive, Deprecated
  maintainer: string, // Who maintains this MCP
  version: string,
  compatibleAgentTypes: string[] // Types of agents this MCP works well with
}
```

## Implementation Plan

### Phase 1: Setup and Infrastructure (2 weeks)
- Create Firebase project
- Setup authentication system
- Implement basic UI navigation
- Create model provider abstraction layer
- Implement secure API key storage
- Design database schema for MCPs and agent interactions

### Phase 2: MCP Management System (2 weeks)
- Design and implement MCP registry
- Develop MCP configuration interfaces
- Create stdio-based MCP connection framework
- Implement MCP testing and validation tools
- Document standardized MCP formats and protocols

### Phase 3: Agent Maker Implementation (3 weeks)
- Design and implement Agent Maker UI with MCP integration
- Create prompt templates for agent generation with stdio MCP support
- Implement code generation with standardized MCP calling patterns
- Develop AgentCard generator and validator
- Test with various agent types and MCP configurations

### Phase 4: JSON Summarizer (3 weeks)
- Design and implement interaction storage system
- Create summarization prompts for LLM
- Develop timeline visualization component
- Implement expandable/collapsible details
- Add filtering and search capabilities

### Phase 5: Model Provider Switching (2 weeks)
- Implement provider-specific adapters
- Create UI for provider configuration
- Develop testing framework for providers
- Add performance monitoring tools
- Integrate provider selection with existing agents

### Phase 6: Integration and Testing (2 weeks)
- Connect all components
- Comprehensive testing
- Performance optimization
- Documentation
- User feedback integration

## Technical Requirements

### Development Environment
- Node.js 18+
- TypeScript 5+
- React 18+
- Firebase CLI and emulators
- Yarn or npm

### Production Environment
- Firebase Blaze plan (for functions and storage)
- Domain for hosting
- CI/CD for deployment

### Security Considerations
- API keys stored securely in Firebase environment variables
- Role-based access control for sensitive operations
- Data encryption for stored agent code
- Rate limiting for LLM API requests

## Future Enhancements

### Enhanced Visualization
- 3D visualization of agent interactions
- Network graph of agent relationships
- Real-time interaction monitoring

### Advanced Agent Maker
- Visual agent builder with components
- Template library for common agent types
- AI-assisted prompt refinement

### Community Features
- Sharing agent templates
- Collaborative agent development
- Public agent repository

## Appendix

### Key Dependencies
- react
- firebase
- @firebase/firestore
- @firebase/functions
- @firebase/auth
- @firebase/storage
- @google/generative-ai
- cerebras-cloud-sdk
- groq
- @monaco-editor/react
- @material-ui/core
- react-router-dom
- uuid
- lodash

### API Providers Documentation Links
- Google Gemini: https://ai.google.dev/docs
- Cerebras API: https://cerebras.net/developers
- Groq API: https://console.groq.com/docs/
  