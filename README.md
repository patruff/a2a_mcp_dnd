# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Key files for each section:

- **Landing Page:**
  - `src/app/page.tsx`: This file contains the main landing page of the application, providing an overview and links to other sections.
  - **Code Context**: The landing page uses `next/link` for navigation between different sections and displays cards with descriptions for each section.

- **Agent Maker:**
  - `src/app/agent-maker/page.tsx`: This file contains the agent maker form, which is used to create and configure AI agents using natural language descriptions.
  - **Code Context**: The agent maker form is implemented using React components and includes input fields for agent name, type, description, and other attributes. It utilizes `react-hook-form` for form management and validation. The generated agent card is then displayed in the Agent Viewer.

- **Agent Viewer:**
  - `src/app/agent-viewer/page.tsx`: This file contains the agent viewer, which allows you to view, validate, and download your Agent Card JSON.
  - **Code Context**: The agent viewer retrieves the Agent Card JSON from the URL search parameters and displays it in a formatted text area. It includes buttons for validating, formatting, downloading, and copying the JSON.

- **Agent List:**
  - `src/app/agent-list/page.tsx`: This file displays a list of created agents, showing their name, type, and class.
  - **Code Context**: The agent list page fetches agent data from a data source (currently placeholder data) and renders it in a list using React components. It includes styling for the list items and a message for when no agents have been created yet.

- **MCP List:**
  - `src/app/mcp-list/page.tsx`: This file shows available Model Context Protocol (MCP) components and their tools.
  - **Code Context**: The MCP list page fetches MCP data from a data source (currently a hardcoded list) and renders it in an accordion component. Each MCP item includes a name, description, and a collapsible section with detailed information about the MCP's tools and configuration.

- **Tavern:**
  - `src/app/tavern/page.tsx`: This file displays the Smoky Tavern map.
  - `src/app/TavernMap.css`: This file styles the tavern map.
  - **Code Context**: The Tavern page uses React to create a visual representation of a tavern map. It includes features such as furniture, characters, and lighting effects. Characters can be moved around the map using directional controls.
