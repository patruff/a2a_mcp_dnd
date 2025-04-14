'use client';

import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Checkbox} from '@/components/ui/checkbox';
import {Button} from '@/components/ui/button';
import {createAgent, CreateAgentInput, CreateAgentOutput} from '@/ai/flows/create-agent';
import {useToast} from '@/hooks/use-toast';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Icons } from "@/components/icons"

const AgentMakerPage: React.FC = () => {
  const [agentName, setAgentName] = React.useState('');
  const [agentType, setAgentType] = React.useState('');
  const [agentDescription, setAgentDescription] = React.useState('');
  const [selectedMcps, setSelectedMcps] = React.useState<string[]>([]);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [generatedAgent, setGeneratedAgent] = React.useState<CreateAgentOutput | null>(null);
  const [provider, setProvider] = React.useState('');
  const [model, setModel] = React.useState('');
    const [open, setOpen] = React.useState(false)

  const {toast} = useToast();

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
      };

      const agent: CreateAgentOutput = await createAgent(agentInput);
      setGeneratedAgent(agent);

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
      setGeneratedAgent(null);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleProviderChange = (value: string) => {
    setProvider(value);
    setModel(''); // Reset model when provider changes
  };

  const getModelsForProvider = (provider: string) => {
    switch (provider) {
      case 'google':
        return ['gemini-2.0-flash', 'gemini-2.0-pro'];
      case 'cerebras':
        return ['llama-4-scout-17b-16e-instruct'];
      case 'groq':
        return ['qwen-qwq-32b'];
      default:
        return [];
    }
  };

  const models = getModelsForProvider(provider);

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
              <Select onValueChange={handleProviderChange}>
                <SelectTrigger id="provider">
                  <SelectValue placeholder="Select provider"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="google">Google</SelectItem>
                  <SelectItem value="cerebras">Cerebras</SelectItem>
                  <SelectItem value="groq">Groq</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="model">Model</Label>
              <Select onValueChange={(value) => setModel(value)} disabled={!provider}>
                <SelectTrigger id="model">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  {models.map((model) => (
                    <SelectItem key={model} value={model}>{model}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={handleSubmit} disabled={isGenerating}>
            {isGenerating ? 'Generating...' : 'Generate Agent'}
          </Button>
        </CardContent>
      </Card>

      {generatedAgent && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Generated Agent Details</CardTitle>
            <CardDescription>Here are the details of the generated agent.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div>
              <Label>Agent Code</Label>
              <Textarea readOnly value={generatedAgent.agentCode} className="h-48"/>
            </div>
            <div>
              <Label>Agent Card JSON</Label>
              <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">View Agent Card JSON</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Agent Card JSON</DialogTitle>
            <DialogDescription>
             Here is the Agent Card
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Textarea readOnly value={generatedAgent.agentCardJson} className="h-48"/>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
            </div>
            <div>
              <Label>Configuration File</Label>
              <Textarea readOnly value={generatedAgent.configurationFile} className="h-48"/>
            </div>
            <div>
              <Label>Documentation</Label>
              <Textarea readOnly value={generatedAgent.documentation} className="h-48"/>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AgentMakerPage;
