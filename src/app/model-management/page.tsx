
import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';

const ModelManagementPage: React.FC = () => {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Model Management</CardTitle>
          <CardDescription>Configure and switch between different LLM providers.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This page will allow you to configure and switch between different LLM providers (Google, Cerebras, Groq).</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModelManagementPage;

