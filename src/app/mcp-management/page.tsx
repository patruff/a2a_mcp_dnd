
import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';

const MCPManagementPage: React.FC = () => {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>MCP Management</CardTitle>
          <CardDescription>Manage Model Context Protocol (MCP) components.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This page will allow you to manage Model Context Protocol (MCP) components that agents can access.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MCPManagementPage;
