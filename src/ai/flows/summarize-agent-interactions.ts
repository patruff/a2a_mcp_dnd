'use server';
/**
 * @fileOverview Summarizes interactions between agents using an LLM.
 *
 * - summarizeAgentInteractions - A function that summarizes agent interactions.
 * - SummarizeAgentInteractionsInput - The input type for the summarizeAgentInteractions function.
 * - SummarizeAgentInteractionsOutput - The return type for the summarizeAgentInteractions function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const SummarizeAgentInteractionsInputSchema = z.object({
  interactionData: z.string().describe('The JSON data representing the agent interactions.'),
});
export type SummarizeAgentInteractionsInput = z.infer<typeof SummarizeAgentInteractionsInputSchema>;

const SummarizeAgentInteractionsOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the agent interactions.'),
});
export type SummarizeAgentInteractionsOutput = z.infer<typeof SummarizeAgentInteractionsOutputSchema>;

export async function summarizeAgentInteractions(input: SummarizeAgentInteractionsInput): Promise<SummarizeAgentInteractionsOutput> {
  return summarizeAgentInteractionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeAgentInteractionsPrompt',
  input: {
    schema: z.object({
      interactionData: z.string().describe('The JSON data representing the agent interactions.'),
    }),
  },
  output: {
    schema: z.object({
      summary: z.string().describe('A concise summary of the agent interactions.'),
    }),
  },
  prompt: `You are an AI assistant that summarizes agent interactions.

  Given the following JSON data representing agent interactions, create a concise one-line summary of the interactions.

  Interaction Data: {{{interactionData}}}
  `,
});

const summarizeAgentInteractionsFlow = ai.defineFlow<
  typeof SummarizeAgentInteractionsInputSchema,
  typeof SummarizeAgentInteractionsOutputSchema
>(
  {
    name: 'summarizeAgentInteractionsFlow',
    inputSchema: SummarizeAgentInteractionsInputSchema,
    outputSchema: SummarizeAgentInteractionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
