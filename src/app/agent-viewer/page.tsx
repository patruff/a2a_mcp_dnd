'use client';

import React, {useState, useEffect} from 'react';
import {useSearchParams} from 'next/navigation';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import {Label} from '@/components/ui/label';
import {Copy} from 'lucide-react';
import {useToast} from '@/hooks/use-toast';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';

const AgentViewerPage: React.FC = () => {
  const searchParams = useSearchParams();
  const agentCardJsonParam = searchParams.get('agentCardJson');
  const [agentCardJson, setAgentCardJson] = useState<string>('');
  const [formattedJson, setFormattedJson] = useState<string>('');
  const [validationResult, setValidationResult] = useState<string>('');
  const {toast} = useToast();

  const [provider, setProvider] = useState('Google');
  const [icon, setIcon] = useState('🧙‍♂️'); // Default icon
    const [model, setModel] = useState('gemini-2-flash');

  useEffect(() => {
    if (agentCardJsonParam) {
      try {
        const decodedJson = decodeURIComponent(agentCardJsonParam);
        setAgentCardJson(decodedJson);
        formatAndDisplay(decodedJson);

          // Parse the JSON to extract provider and icon values
          const parsedJson = JSON.parse(decodedJson);
          setProvider(parsedJson.provider.name || 'Google');
          setIcon(parsedJson.icon || '🧙‍♂️');
            setModel(parsedJson.provider.preferred_model || 'gemini-2-flash');
      } catch (error: any) {
        console.error('Error decoding or parsing agentCardJson:', error);
        setValidationResult(`Error: ${error.message}`);
      }
    }
  }, [agentCardJsonParam]);

  const formatAndDisplay = (jsonString: string) => {
    try {
      const parsedJson = JSON.parse(jsonString);
      const formatted = JSON.stringify(parsedJson, null, 2);
      setFormattedJson(formatted);
      setValidationResult('JSON is valid.');
    } catch (error: any) {
      setFormattedJson('');
      setValidationResult(`Invalid JSON: ${error.message}`);
    }
  };

  const validateJson = () => {
    try {
      JSON.parse(agentCardJson);
      setValidationResult('JSON is valid.');
    } catch (error: any) {
      setValidationResult(`Invalid JSON: ${error.message}`);
    }
  };

  const downloadJson = () => {
    if (!formattedJson) {
      toast({
        title: 'Error',
        description: 'Please generate or format JSON first.',
        variant: 'destructive',
      });
      return;
    }

    const blob = new Blob([formattedJson], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'agent.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: 'Downloaded',
      description: 'Agent JSON downloaded successfully.',
    });
  };

  const copyToClipboard = async () => {
    if (!formattedJson) {
      toast({
        title: 'Error',
        description: 'Please generate or format JSON first.',
        variant: 'destructive',
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(formattedJson);
      toast({
        title: 'Copied',
        description: 'Agent JSON copied to clipboard.',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: `Failed to copy: ${error.message}`,
        variant: 'destructive',
      });
    }
  };

    const handleProviderChange = (newProvider: string) => {
        setProvider(newProvider);
        // Update the model based on the new provider
        switch (newProvider) {
            case 'Google':
                setModel('gemini-2-flash');
                break;
            case 'Cerebras':
                setModel('llama-4-scout-17b-16e-instruct');
                break;
            case 'Groq':
                setModel('qwen-qwq-32b');
                break;
            default:
                setModel('');
                break;
        }
    };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Agent Card Viewer</CardTitle>
          <CardDescription>View, validate, and download your Agent Card JSON.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Provider</Label>
              <Select onValueChange={handleProviderChange} value={provider}>
                <SelectTrigger>
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
                  <Label>Model</Label>
                  <Select onValueChange={setModel} value={model}>
                      <SelectTrigger>
                          <SelectValue placeholder="Select model"/>
                      </SelectTrigger>
                      <SelectContent>
                          {provider === 'Google' && (
                              <SelectItem value="gemini-2-flash">gemini-2-flash</SelectItem>
                          )}
                          {provider === 'Cerebras' && (
                              <SelectItem value="llama-4-scout-17b-16e-instruct">llama-4-scout-17b-16e-instruct</SelectItem>
                          )}
                          {provider === 'Groq' && (
                              <SelectItem value="qwen-qwq-32b">qwen-qwq-32b</SelectItem>
                          )}
                      </SelectContent>
                  </Select>
              </div>
            <div>
              <Label>Icon</Label>
              <Select onValueChange={setIcon} value={icon}>
                <SelectTrigger>
                  <SelectValue placeholder="Select icon"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="🧙‍♂️">🧙‍♂️ Wizard</SelectItem>
                  <SelectItem value="🗡️">🗡️ Sword</SelectItem>
                  <SelectItem value="🛡️">🛡️ Shield</SelectItem>
                  <SelectItem value="🏹">🏹 Bow</SelectItem>
                  <SelectItem value="🧝">🧝 Elf</SelectItem>
                  <SelectItem value="🐉">🐉 Dragon</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="agent-card-json">Agent Card JSON</Label>
            <Textarea id="agent-card-json" readOnly value={formattedJson} className="min-h-[300px]"/>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button onClick={validateJson}>Validate JSON</Button>
            <Button onClick={downloadJson}>Download JSON</Button>
            <Button onClick={copyToClipboard}>Copy JSON <Copy className="ml-2 h-4 w-4"/></Button>
          </div>
          {validationResult && <p>{validationResult}</p>}
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentViewerPage;
