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
} from '@/components/ui/dialog';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from '@/components/ui/accordion';
import {PlusCircle} from 'lucide-react';

const MCPManagementPage: React.FC = () => {
  const [mcps, setMcps] = useState([
    {
      name: '@modelcontextprotocol/server-filesystem',
      description: 'File system access for reading/writing files',
      details: {
        description:
          'MCP server for file system operations. Provides secure access to read and write files within specified directories.',
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
          {
            name: 'filesystem/listDirectory',
            description: 'List contents of a directory',
            parameters: [{name: 'path', type: 'string', required: true}],
          },
          {
            name: 'filesystem/deleteFile',
            description: 'Delete a file',
            parameters: [{name: 'path', type: 'string', required: true}],
          },
          {
            name: 'filesystem/createDirectory',
            description: 'Create a directory',
            parameters: [{name: 'path', type: 'string', required: true}],
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
      details: {
        description: 'In-memory storage for AI agents',
        tools: [
          {
            name: 'memory/set',
            description: 'Store a value in memory',
            parameters: [{name: 'key', type: 'string', required: true}, {name: 'value', type: 'any', required: true}],
          },
          {
            name: 'memory/get',
            description: 'Retrieve a value from memory',
            parameters: [{name: 'key', type: 'string', required: true}],
          },
          {
            name: 'memory/delete',
            description: 'Delete a value from memory',
            parameters: [{name: 'key', type: 'string', required: true}],
          },
          {
            name: 'memory/list',
            description: 'List all keys in memory',
            parameters: [],
          },
        ],
        configurationOptions: [],
        command: 'npx @modelcontextprotocol/server-memory',
        usageExamples: [],
      },
    },
    {
      name: '@modelcontextprotocol/server-brave-search',
      description: 'Brave search server',
      details: {
        description: 'Brave search server',
        tools: [
          {
            name: 'brave/websearch',
            description: 'Perform a web search using Brave Search',
            parameters: [{name: 'query', type: 'string', required: true}],
          },
          {
            name: 'brave/localsearch',
            description: 'Search for local businesses and places',
            parameters: [{name: 'query', type: 'string', required: true}],
          },
        ],
        configurationOptions: [],
        command: 'npx @modelcontextprotocol/server-brave-search',
        usageExamples: [],
      },
    },
    {
      name: '@modelcontextprotocol/server-github',
      description: 'GitHub server',
      details: {
        description: 'GitHub server',
        tools: [
          {
            name: 'github/searchRepositories',
            description: 'Search for GitHub repositories',
            parameters: [{name: 'query', type: 'string', required: true}],
          },
          {
            name: 'github/getFileContents',
            description: 'Get contents of a file from a repository',
            parameters: [{name: 'owner', type: 'string', required: true}, {
              name: 'repo',
              type: 'string',
              required: true,
            }, {name: 'path', type: 'string', required: true}],
          },
          {
            name: 'github/createRepository',
            description: 'Create a new repository',
            parameters: [{name: 'name', type: 'string', required: true}, {
              name: 'description',
              type: 'string',
              required: false,
            }],
          },
          {
            name: 'github/createOrUpdateFile',
            description: 'Create or update a file in a repository',
            parameters: [{name: 'owner', type: 'string', required: true}, {
              name: 'repo',
              type: 'string',
              required: true,
            }, {name: 'path', type: 'string', required: true}, {
              name: 'content',
              type: 'string',
              required: true,
            }, {name: 'message', type: 'string', required: true}],
          },
          {
            name: 'github/createIssue',
            description: 'Create a new issue in a repository',
            parameters: [{name: 'owner', type: 'string', required: true}, {
              name: 'repo',
              type: 'string',
              required: true,
            }, {name: 'title', type: 'string', required: true}, {
              name: 'body',
              type: 'string',
              required: false,
            }],
          },
          {
            name: 'github/createPullRequest',
            description: 'Create a new pull request',
            parameters: [{name: 'owner', type: 'string', required: true}, {
              name: 'repo',
              type: 'string',
              required: true,
            }, {name: 'title', type: 'string', required: true}, {
              name: 'head',
              type: 'string',
              required: true,
            }, {name: 'base', type: 'string', required: true}],
          },
        ],
        configurationOptions: [],
        command: 'npx @modelcontextprotocol/server-github',
        usageExamples: [],
      },
    },
    {
      name: '@patruff/server-terminator',
      description: 'File deletion and management tools',
      details: {
        description: 'File deletion and management tools',
        tools: [
          {
            name: 'terminator/terminateLocalFile',
            description: 'Permanently delete a file from local filesystem',
            parameters: [{name: 'path', type: 'string', required: true}],
          },
          {
            name: 'terminator/terminateRemoteFile',
            description: 'Permanently delete a file from a GitHub repository',
            parameters: [{name: 'owner', type: 'string', required: true}, {
              name: 'repo',
              type: 'string',
              required: true,
            }, {name: 'path', type: 'string', required: true}],
          },
        ],
        configurationOptions: [],
        command: 'npx @patruff/server-terminator',
        usageExamples: [],
      },
    },
    {
      name: '@patruff/server-flux',
      description: 'Server flux',
      details: {
        description: 'Server flux',
        tools: [
          {
            name: 'flux/generateImage',
            description: 'Generate an image using Flux model',
            parameters: [{name: 'prompt', type: 'string', required: true}],
          },
          {
            name: 'flux/editImage',
            description: 'Edit an existing image with text prompts',
            parameters: [{name: 'prompt', type: 'string', required: true}, {
              name: 'image_url',
              type: 'string',
              required: true,
            }],
          },
        ],
        configurationOptions: [],
        command: 'npx @patruff/server-flux',
        usageExamples: [],
      },
    },
    {
      name: '@patruff/server-gmail-drive',
      description: 'Gmail drive server',
      details: {
        description: 'Gmail drive server',
        tools: [
          {
            name: 'gmail/searchEmail',
            description: 'Search Gmail messages',
            parameters: [{name: 'query', type: 'string', required: true}],
          },
          {
            name: 'gmail/sendEmail',
            description: 'Send a new email',
            parameters: [{name: 'to', type: 'string', required: true}, {
              name: 'subject',
              type: 'string',
              required: true,
            }, {name: 'body', type: 'string', required: true}],
          },
          {
            name: 'drive/searchDrive',
            description: 'Search for files in Google Drive',
            parameters: [{name: 'query', type: 'string', required: true}],
          },
          {
            name: 'drive/createFolder',
            description: 'Create a new folder in Google Drive',
            parameters: [{name: 'name', type: 'string', required: true}],
          },
          {
            name: 'drive/uploadFile',
            description: 'Upload a file to Google Drive',
            parameters: [{name: 'name', type: 'string', required: true}, {
              name: 'content',
              type: 'string',
              required: true,
            }],
          },
        ],
        configurationOptions: [],
        command: 'npx @patruff/server-gmail-drive',
        usageExamples: [],
      },
    },
    {
      name: '@abhiz123/todoist-mcp-server',
      description: 'Todoist MCP server',
      details: {
        description: 'Todoist MCP server',
        tools: [
          {
            name: 'todoist/createTask',
            description: 'Create a new task in Todoist',
            parameters: [{name: 'content', type: 'string', required: true}],
          },
          {
            name: 'todoist/getTasks',
            description: 'Get a list of tasks from Todoist',
            parameters: [],
          },
          {
            name: 'todoist/updateTask',
            description: 'Update an existing task in Todoist',
            parameters: [{name: 'id', type: 'string', required: true}, {
              name: 'content',
              type: 'string',
              required: false,
            }],
          },
          {
            name: 'todoist/deleteTask',
            description: 'Delete a task from Todoist',
            parameters: [{name: 'id', type: 'string', required: true}],
          },
          {
            name: 'todoist/completeTask',
            description: 'Mark a task as complete',
            parameters: [{name: 'id', type: 'string', required: true}],
          },
        ],
        configurationOptions: [],
        command: 'npx @abhiz123/todoist-mcp-server',
        usageExamples: [],
      },
    },
    {
      name: '@patruff/server-lightrag',
      description: 'Lightrag server',
      details: {
        description: 'Lightrag server',
        tools: [
          {
            name: 'rag/query',
            description: 'Query documents using RAG',
            parameters: [{name: 'query', type: 'string', required: true}],
          },
          {
            name: 'rag/insertText',
            description: 'Insert text into the RAG system',
            parameters: [{name: 'text', type: 'string', required: true}],
          },
          {
            name: 'rag/insertFile',
            description: 'Insert a file into the RAG system',
            parameters: [{name: 'file_path', type: 'string', required: true}],
          },
        ],
        configurationOptions: [],
        command: 'npx @patruff/server-lightrag',
        usageExamples: [],
      },
    },
    {
      name: '@patruff/server-codesnip',
      description: 'Codesnip server',
      details: {
        description: 'Codesnip server',
        tools: [
          {
            name: 'codesnip/editSnippet',
            description: 'Edit a specific code snippet in a file',
            parameters: [{name: 'file_path', type: 'string', required: true}, {
              name: 'snippet_id',
              type: 'string',
              required: true,
            }, {name: 'new_content', type: 'string', required: true}],
          },
          {
            name: 'codesnip/findSnippets',
            description: 'Find code snippets matching a pattern',
            parameters: [{name: 'query', type: 'string', required: true}],
          },
        ],
        configurationOptions: [],
        command: 'npx @patruff/server-codesnip',
        usageExamples: [],
      },
    },
  ]);
  const [newPackageName, setNewPackageName] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const addMcp = () => {
    if (newPackageName) {
      // Basic validation, more robust validation may be needed
      const newMcp = {
        name: newPackageName,
        description: 'New MCP',
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
                  <div className="flex w-full items-center justify-between">
                    <span>{mcp.name.split('/')[1]}</span>
                    <span>{mcp.description}</span>
                    <PlusCircle className="h-4 w-4 shrink-0 transition-transform duration-200 [&[data-state=open]>svg]:rotate-180"/>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-4">
                    <p className="mb-2">Description: {mcp.details.description}</p>
                    <p className="mb-2 font-semibold">Available Tools:</p>
                    <ul className="mb-4 list-disc pl-5">
                      {mcp.details.tools.map((tool, toolIndex) => (
                        <li key={toolIndex} className="mb-3">
                          <span className="font-medium">{tool.name}:</span> {tool.description}
                          <ul className="list-disc pl-5 mt-1">
                            {tool.parameters && tool.parameters.map((param, paramIndex) => (
                              <li key={paramIndex}>
                                <span className="font-semibold">{param.name}:</span> {param.type} ({param.required ? 'required' : 'optional'})
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                    <p className="mb-2">Command: {mcp.details.command}</p>
                    <div className="flex gap-2">
                      <Button variant="outline">Configure</Button>
                      <Button variant="outline">Enable/Disable</Button>
                      <Button variant="outline">Remove</Button>
                    </div>
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
