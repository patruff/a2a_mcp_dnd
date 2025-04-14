'use server';

/**
 * @fileOverview Creates an AI agent based on the provided specifications.
 *
 * - createAgent - A function that handles the agent creation process.
 * - CreateAgentInput - The input type for the createAgent function.
 * - CreateAgentOutput - The return type for the createAgent function.
 */

import {ai} from '@/ai/ai-instance';
import {generateAgentCode, GenerateAgentCodeInput, GenerateAgentCodeOutput} from '@/ai/flows/generate-agent-code';
import {z} from 'genkit';

const CreateAgentInputSchema = z.object({
  agentName: z.string().describe('The name of the agent.'),
  agentType: z.string().describe('The type of the agent (character, NPC, service, etc.).'),
  description: z.string().describe('A detailed natural language description of the agent.'),
  selectedMcps: z.array(z.string()).describe('An array of selected MCPs (Model Context Protocols) to include in the agent.'),
  mcpConfigurations: z.record(z.any()).describe('A record of MCP configurations specific to the selected MCPs.'),
  additionalAttributes: z.record(z.any()).describe('A record of additional attributes for the agent (stats, skills, goals, etc.).'),
});

export type CreateAgentInput = z.infer<typeof CreateAgentInputSchema>;

const CreateAgentOutputSchema = z.object({
  agentCode: z.string().describe('The generated agent code in TypeScript.'),
  agentCardJson: z.string().describe('The generated AgentCard JSON.'),
  promptTemplate: z.string().optional().describe('The generated prompt template, if applicable.'),
  configurationFile: z.string().describe('The generated configuration file with port, dependencies, etc.'),
  documentation: z.string().describe('The documentation for the agent capabilities.'),
});

export type CreateAgentOutput = z.infer<typeof CreateAgentOutputSchema>;

export async function createAgent(input: CreateAgentInput): Promise<CreateAgentOutput> {
  return createAgentFlow(input);
}

const createAgentFlow = ai.defineFlow<
  typeof CreateAgentInputSchema,
  typeof CreateAgentOutputSchema
>(
  {
    name: 'createAgentFlow',
    inputSchema: CreateAgentInputSchema,
    outputSchema: CreateAgentOutputSchema,
  },
  async input => {
    // Directly use the generateAgentCode flow
    const result: GenerateAgentCodeOutput = await generateAgentCode(input as GenerateAgentCodeInput);
    return result;
  }
);

    
