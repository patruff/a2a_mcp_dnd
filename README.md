# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Key files for each section:

### Technologies Used:

- **Next.js**: A React framework for building server-rendered and statically generated web applications.
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that enhances code quality and maintainability.
- **Tailwind CSS**: A utility-first CSS framework for rapidly designing custom user interfaces.
- **ShadCN UI**: A collection of pre-built, customizable UI components for React, built on top of Radix UI and Tailwind CSS.
- **Lucide React**: A library of beautiful, consistent icons for React applications.
- **Genkit**: GenAI related code.

- **Landing Page:**
  - `src/app/page.tsx`: This file contains the main landing page of the application, providing an overview and links to other sections.
  - **Code Context**: The landing page uses `next/link` for navigation between different sections and displays cards with descriptions for each section.
    - **Dependencies**:
        - `next/link`: Used for navigation between different sections.
        - `lucide-react`: For icons.
        - `@/components/ui/card`: Shadcn UI card components.
        - `@/components/ui/button`: Shadcn UI button components.

- **Agent Maker:**
  - `src/app/agent-maker/page.tsx`: This file contains the agent maker form, which is used to create and configure AI agents using natural language descriptions.
  - **Code Context**:
    - Dependencies:
      - React: Used for building the UI components.
      - `react-hook-form`: Manages form state and validation.
      - `@hookform/resolvers`: Integrates Zod for schema-based validation.
      - `zod`: Defines the schema for the form inputs.
      - `@/components/ui/*`: Shadcn UI components for consistent styling.
      - `next/navigation`: Used to navigate between pages.
      - `useState`: Stores agent data.
      - `useToast`: Displays toast notifications
      - `lucide-react`: For icons.

    - The agent maker form is implemented using React components and includes input fields for agent name, type, description, and other attributes.
    - The component uses state variables (`useState`) to manage the form inputs and the selected MCPs. The `useToast` hook is used to display notifications for successful agent creation and errors.
    - The form utilizes Shadcn UI components for styling and consistency.
    - The `availableMcps` array contains a list of available MCPs, which are rendered as checkboxes. The `handleMcpSelection` function updates the `selectedMcps` state when an MCP is selected or deselected.
    - The `handleSubmit` function is called when the form is submitted. It constructs the Agent Card JSON from the form inputs and navigates to the agent viewer page to display the generated JSON.
    - **UI Design Decisions**:
      - The UI is designed to be simple and intuitive, with clear labels and input fields.
      - The form is divided into sections to group related inputs together.
      - The available MCPs are displayed in a grid of checkboxes, allowing users to easily select the MCPs they want to include in their agent.
      - Shadcn UI components are used to ensure a consistent look and feel across the application.
      - A color picker and a icon select are used for the icon and theme color to provide a visual way to customize the agent.

- **Agent Viewer:**
  - `src/app/agent-viewer/page.tsx`: This file contains the agent viewer, which allows you to view, validate, and download your Agent Card JSON.
  - **Code Context**:
    - **Dependencies**:
      - React: Used for building the UI components.
      - `next/navigation`: Accesses URL search parameters to retrieve the Agent Card JSON.
      - `@/components/ui/*`: Shadcn UI components for consistent styling.
      - `lucide-react`: For icons.
    - The agent viewer retrieves the Agent Card JSON from the URL search parameters using `useSearchParams`.
    - The `agentCardJson` state variable stores the Agent Card JSON.
    - The `useEffect` hook is used to parse the Agent Card JSON when the component mounts or when the `agentCardJsonParam` changes.
    - The component includes buttons for validating, formatting, downloading, and copying the JSON.
    - **UI Design Decisions**:
      - The UI is designed to be simple and focused on displaying the Agent Card JSON.
      - A text area is used to display the JSON, with buttons for formatting, validating, downloading, and copying the JSON.
      - The `lucide-react` component is used to display the JSON in a formatted and interactive way, making it easier for users to read and understand.

- **Agent List:**
  - `src/app/agent-list/page.tsx`: This file displays a list of created agents, showing their name, type, and class.
  - **Code Context**:
    - **Dependencies**:
      - React: Used for building the UI components.
      - `@/components/ui/*`: Shadcn UI components for consistent styling.
      - `lucide-react`: For icons.
      - next/link

    - The agent list page fetches agent data from local storage and renders it in a three-column grid using React components. It includes styling for the list items and links to the AgentCard JSON in the Agent Viewer.

- **MCP List:**
  - `src/app/mcp-list/page.tsx`: This file shows available Model Context Protocol (MCP) components and their tools.
  - **Code Context**:
    - **Dependencies**:
      - React: Used for building the UI components.
      - `@/components/ui/*`: Shadcn UI components for consistent styling.
      - `lucide-react`: For icons.
    - The MCP list page fetches MCP data from a data source (currently a hardcoded list) and renders it in an accordion component.
    - Each MCP item includes a name, description, and a collapsible section with detailed information about the MCP's tools and configuration.
    - The component uses Shadcn UI components for styling and consistency.
    - The `Accordion` component is used to display the MCPs in a collapsible list, allowing users to easily view the details of each MCP.
    - **MCP Loading**:
      - The MCP data is currently hardcoded in the `mcps` array. In a real-world application, this data would be fetched from a database or an external API.
      - The `mcps` array is mapped over to render each MCP in the list.
    - **UI Design Decisions**:
      - The UI is designed to be simple and focused on displaying the available MCPs.
      - The `Accordion` component is used to display the MCPs in a collapsible list, allowing users to easily view the details of each MCP.
      - Shadcn UI components are used to ensure a consistent look and feel across the application.

- **Tavern:**
  - `src/app/tavern/page.tsx`: This file displays the Smoky Tavern map.
  - `src/app/TavernMap.css`: This file styles the tavern map.
  - **Code Context**: The Tavern page uses React to create a visual representation of a tavern map. It includes features such as furniture, characters, and lighting effects. Characters can be moved around the map using directional controls.



