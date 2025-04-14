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

const AgentMakerPage: React.FC = () => {
  const [agentName, setAgentName] = React.useState('');
  const [agentType, setAgentType] = React.useState('');
  const [agentDescription, setAgentDescription] = React.useState('');
  const [selectedMcps, setSelectedMcps] = React.useState<string[]>([]);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [generatedAgent, setGeneratedAgent] = React.useState<CreateAgentOutput | null>(null);

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
              <Textarea readOnly value={generatedAgent.agentCardJson} className="h-48"/>
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

    