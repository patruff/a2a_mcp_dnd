'use client';

import React, {useState, useEffect} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import {Label} from '@/components/ui/label';
import {Copy} from 'lucide-react';
import {useToast} from '@/hooks/use-toast';

const AgentViewerPage: React.FC = () => {
  const searchParams = useSearchParams();
  const agentCardJsonParam = searchParams.get('agentCardJson');
  const [agentCardJson, setAgentCardJson] = useState<string>('');
  const [formattedJson, setFormattedJson] = useState<string>('');
  const [validationResult, setValidationResult] = useState<string>('');
  const {toast} = useToast();
  useEffect(() => {
    if (agentCardJsonParam) {
      try {
        const decodedJson = decodeURIComponent(agentCardJsonParam);
        setAgentCardJson(decodedJson);
        formatAndDisplay(decodedJson);
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

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Agent Card Viewer</CardTitle>
          <CardDescription>View, validate, and download your Agent Card JSON.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
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
