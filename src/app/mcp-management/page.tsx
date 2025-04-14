'use client';

import React, {useState} from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion"

const MCPManagementPage: React.FC = () => {
  const [mcps, setMcps] = useState([
    {
      name: '@modelcontextprotocol/server-filesystem',
      description: 'File system access for reading/writing files',
      status: 'active',
      details: {
        description: 'MCP server for file system operations. Provides secure access to read and write files within specified directories.',
        tools: [
          {
            name: 'filesystem/readFile',
            description: 'Read content from a file',
            parameters: [{name: 'path', type: 'string', required: true}],
          },
          {
            name: 'filesystem/writeFile',
            description: 'Write content to a file',
            parameters: [{name: 'path', type: 'string', required: true}, {
              name: 'content',
              type: 'string',
              required: true,
            }],
          },
        ],
        configurationOptions: [],
        command: 'npx @modelcontextprotocol/server-filesystem',
        usageExamples: [],
      },
    },
    {
      name: '@modelcontextprotocol/server-memory',
      description: 'In-memory storage for AI agents',
      status: 'active',
      details: {
        description: 'In-memory storage for AI agents',
        tools: [],
        configurationOptions: [],
        command: 'npx @modelcontextprotocol/server-memory',
        usageExamples: [],
      },
    },
    {
      name: '@modelcontextprotocol/server-brave-search',
      description: 'Brave search server',
      status: 'active',
      details: {
        description: 'Brave search server',
        tools: [],
        configurationOptions: [],
        command: 'npx @modelcontextprotocol/server-brave-search',
        usageExamples: [],
      },
    },
    {
      name: '@modelcontextprotocol/server-github',
      description: 'GitHub server',
      status: 'active',
      details: {
        description: 'GitHub server',
        tools: [],
        configurationOptions: [],
        command: 'npx @modelcontextprotocol/server-github',
        usageExamples: [],
      },
    },
    {
      name: '@patruff/server-terminator',
      description: 'File deletion and management tools',
      status: 'inactive',
      details: {
        description: 'File deletion and management tools',
        tools: [],
        configurationOptions: [],
        command: 'npx @patruff/server-terminator',
        usageExamples: [],
      },
    },
    {
      name: '@patruff/server-flux',
      description: 'Server flux',
      status: 'inactive',
      details: {
        description: 'Server flux',
        tools: [],
        configurationOptions: [],
        command: 'npx @patruff/server-flux',
        usageExamples: [],
      },
    },
    {
      name: '@patruff/server-gmail-drive',
      description: 'Gmail drive server',
      status: 'inactive',
      details: {
        description: 'Gmail drive server',
        tools: [],
        configurationOptions: [],
        command: 'npx @patruff/server-gmail-drive',
        usageExamples: [],
      },
    },
    {
      name: '@abhiz123/todoist-mcp-server',
      description: 'Todoist MCP server',
      status: 'inactive',
      details: {
        description: 'Todoist MCP server',
        tools: [],
        configurationOptions: [],
        command: 'npx @abhiz123/todoist-mcp-server',
        usageExamples: [],
      },
    },
    {
      name: '@patruff/server-lightrag',
      description: 'Lightrag server',
      status: 'inactive',
      details: {
        description: 'Lightrag server',
        tools: [],
        configurationOptions: [],
        command: 'npx @patruff/server-lightrag',
        usageExamples: [],
      },
    },
    {
      name: '@patruff/server-codesnip',
      description: 'Codesnip server',
      status: 'inactive',
      details: {
        description: 'Codesnip server',
        tools: [],
        configurationOptions: [],
        command: 'npx @patruff/server-codesnip',
        usageExamples: [],
      },
    },
  ]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newPackageName, setNewPackageName] = useState('');

  const addMcp = () => {
    if (newPackageName) {
      // Basic validation, more robust validation may be needed
      const newMcp = {
        name: newPackageName,
        description: 'New MCP',
        status: 'inactive',
        details: {
          description: 'New MCP',
          tools: [],
          configurationOptions: [],
          command: `npx ${newPackageName}`,
          usageExamples: [],
        },
      };
      setMcps([...mcps, newMcp]);
      setNewPackageName('');
      setIsAddModalOpen(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>MCP Registry</CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Add MCP</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New MCP</DialogTitle>
                <DialogDescription>
                  Enter the npm package name for the new MCP.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Package Name
                  </Label>
                  <Input
                    id="name"
                    value={newPackageName}
                    onChange={(e) => setNewPackageName(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={addMcp}>
                  Add
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center justify-between">
            <Input type="text" placeholder="Search MCPs..."/>
            <Input type="text" placeholder="Filter MCPs..."/>
          </div>
          <Accordion type="single" collapsible>
            {mcps.map((mcp, index) => (
              <AccordionItem key={index} value={mcp.name}>
                <AccordionTrigger>
                  <div className="flex w-full justify-between">
                    <span>{mcp.name}</span>
                    <span>{mcp.description}</span>
                    <span>Status: {mcp.status}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-4">
                    <p>Description: {mcp.details.description}</p>
                    <p>Available Tools:</p>
                    <ul>
                      {mcp.details.tools.map((tool, toolIndex) => (
                        <li key={toolIndex}>
                          {tool.name}: {tool.description}
                          <ul>
                            {tool.parameters && tool.parameters.map((param, paramIndex) => (
                              <li key={paramIndex}>
                                {param.name}: {param.type} ({param.required ? 'required' : 'optional'})
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                    <p>Command: {mcp.details.command}</p>
                    <Button variant="outline">Configure</Button>
                    <Button variant="outline">Enable/Disable</Button>
                    <Button variant="outline">Remove</Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default MCPManagementPage;
