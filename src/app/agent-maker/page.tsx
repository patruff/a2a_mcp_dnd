'use client';

import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Checkbox} from '@/components/ui/checkbox';
import {Button} from '@/components/ui/button';
import {createAgent, CreateAgentInput} from '@/ai/flows/create-agent';
import {useToast} from '@/hooks/use-toast';
import {useRouter} from 'next/navigation';

const AgentMakerPage: React.FC = () => {
  const [agentName, setAgentName] = React.useState('');
  const [agentType, setAgentType] = React.useState('');
  const [agentDescription, setAgentDescription] = React.useState('');
  const [selectedMcps, setSelectedMcps] = React.useState<string[]>([]);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [selectedProvider, setSelectedProvider] = React.useState<string>('');
  const [selectedModel, setSelectedModel] = React.useState<string>('');
  const [agentCardJson, setAgentCardJson] = React.useState<string>('');

  const {toast} = useToast();
  const router = useRouter();

  const availableMcps = ['filesystem_mcp', 'spanish_translation_mcp', 'weather_api_mcp'];

  const handleMcpSelection = (mcp: string) => {
    setSelectedMcps((prev) => (prev.includes(mcp) ? prev.filter((item) => item !== mcp) : [...prev, mcp]));
  };

  const handleSubmit = async () => {
    setIsGenerating(true);
    try {
      const agentInput: CreateAgentInput = {
        agentName: agentName,
        agentType: agentType,
        description: agentDescription,
        selectedMcps: selectedMcps,
        mcpConfigurations: {},
        additionalAttributes: {},
        selectedProvider: selectedProvider,
        selectedModel: selectedModel,
      };

      // Await the createAgent call to get the generated agent data
      const agent = await createAgent(agentInput);

      setAgentCardJson(agent.agentCardJson);

      toast({
        title: 'Agent Generated!',
        description: 'Your agent has been successfully generated.',
      });
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

  const providerModels: { [key: string]: string[] } = {
    Google: ['gemini-2-flash'],
    Cerebras: ['llama-4-scout-17b-16e-instruct'],
    Groq: ['qwen-qwq-32b'],
  };

  const handleViewAgentCard = () => {
    if (agentCardJson) {
      router.push(`/agent-viewer?agentCardJson=${encodeURIComponent(agentCardJson)}`);
    } else {
      toast({
        title: 'Error',
        description: 'Please generate the agent first.',
        variant: 'destructive',
      });
    }
  };

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
              <Select onValueChange={(value) => setAgentType(value)}>
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
                  <Checkbox id={mcp} checked={selectedMcps.includes(mcp)} onCheckedChange={() => handleMcpSelection(mcp)}/>
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
            <Button onClick={handleSubmit} disabled={isGenerating || !!agentCardJson}>
              {isGenerating ? 'Generating...' : 'Generate Agent'}
            </Button>
            <Button variant="outline" onClick={handleViewAgentCard} disabled={isGenerating || !agentCardJson}>
              View AgentCard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentMakerPage;
