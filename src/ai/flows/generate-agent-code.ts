// use server'

/**
 * @fileOverview Generates agent code and AgentCard JSON from a natural language description.
 *
 * - generateAgentCode - A function that handles the agent code generation process.
 * - GenerateAgentCodeInput - The input type for the generateAgentCode function.
 * - GenerateAgentCodeOutput - The return type for the generateAgentCode function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateAgentCodeInputSchema = z.object({
  agentName: z.string().describe('The name of the agent.'),
  agentType: z.string().describe('The type of the agent (character, NPC, service, etc.).'),
  description: z.string().describe('A detailed natural language description of the agent.'),
  selectedMcps: z.array(z.string()).describe('An array of selected MCPs (Model Context Protocols) to include in the agent.'),
  mcpConfigurations: z.record(z.any()).describe('A record of MCP configurations specific to the selected MCPs.'),
  additionalAttributes: z.record(z.any()).describe('A record of additional attributes for the agent (stats, skills, goals, etc.).'),
});

export type GenerateAgentCodeInput = z.infer<typeof GenerateAgentCodeInputSchema>;

const GenerateAgentCodeOutputSchema = z.object({
  agentCode: z.string().describe('The generated agent code in TypeScript.'),
  agentCardJson: z.string().describe('The generated AgentCard JSON.'),
  promptTemplate: z.string().optional().describe('The generated prompt template, if applicable.'),
  configurationFile: z.string().describe('The generated configuration file with port, dependencies, etc.'),
  documentation: z.string().describe('The documentation for the agent capabilities.'),
});

export type GenerateAgentCodeOutput = z.infer<typeof GenerateAgentCodeOutputSchema>;

export async function generateAgentCode(input: GenerateAgentCodeInput): Promise<GenerateAgentCodeOutput> {
  return generateAgentCodeFlow(input);
}

const generateAgentCodePrompt = ai.definePrompt({
  name: 'generateAgentCodePrompt',
  input: {
    schema: z.object({
      agentName: z.string().describe('The name of the agent.'),
      agentType: z.string().describe('The type of the agent (character, NPC, service, etc.).'),
      description: z.string().describe('A detailed natural language description of the agent.'),
      selectedMcps: z.array(z.string()).describe('An array of selected MCPs (Model Context Protocols) to include in the agent.'),
      mcpConfigurations: z.record(z.any()).describe('A record of MCP configurations specific to the selected MCPs.'),
      additionalAttributes: z.record(z.any()).describe('A record of additional attributes for the agent (stats, skills, goals, etc.).'),
    }),
  },
  output: {
    schema: z.object({
      agentCode: z.string().describe('The generated agent code in TypeScript.'),
      agentCardJson: z.string().describe('The generated AgentCard JSON.'),
      promptTemplate: z.string().optional().describe('The generated prompt template, if applicable.'),
      configurationFile: z.string().describe('The generated configuration file with port, dependencies, etc.'),
      documentation: z.string().describe('The documentation for the agent capabilities.'),
    }),
  },
  prompt: `You are an AI agent code generator. You will generate the agent code, AgentCard JSON, configuration file, and documentation based on the user's description and selected MCPs.

Agent Name: {{{agentName}}}
Agent Type: {{{agentType}}}
Description: {{{description}}}
Selected MCPs: {{#each selectedMcps}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
MCP Configurations: {{{mcpConfigurations}}}
Additional Attributes: {{{additionalAttributes}}}

Ensure the generated agent code is well-structured, efficient, and adheres to best practices. The agent should seamlessly integrate with the selected MCPs, utilizing their functionalities as described in their respective documentation. The AgentCard JSON should accurately reflect the agent's properties, capabilities, and dependencies. The configuration file should include all necessary settings for deploying and running the agent.

Ensure that all agent's properties and capabilities are documented in the documentation field.

Output the agentCode, agentCardJson, promptTemplate (if applicable), configurationFile, and documentation as separate strings.
`,
});

const generateAgentCodeFlow = ai.defineFlow<
  typeof GenerateAgentCodeInputSchema,
  typeof GenerateAgentCodeOutputSchema
>(
  {
    name: 'generateAgentCodeFlow',
    inputSchema: GenerateAgentCodeInputSchema,
    outputSchema: GenerateAgentCodeOutputSchema,
  },
  async input => {
    const {output} = await generateAgentCodePrompt(input);
    return output!;
  }
);
