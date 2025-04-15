import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import {Home, List, User} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to AgentVerse</CardTitle>
          <CardDescription>
            AI Agent Management and Interaction Visualization Platform
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <p>
            AgentVerse is a platform for creating, managing, and visualizing AI agents and their interactions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent>
                <Link href="/agent-maker" className="flex items-center space-x-2">
                  <Button variant="outline">
                    <Home className="h-4 w-4 mr-2"/>
                    Agent Maker
                  </Button>
                </Link>
                <p className="text-sm text-muted-foreground">
                  Create and configure AI agents using natural language descriptions.
                </p>
              </CardContent>
            </Card>
             <Card>
              <CardContent>
                <Link href="/mcp-list" className="flex items-center space-x-2">
                  <Button variant="outline">
                    <List className="h-4 w-4 mr-2"/>
                    MCP List
                  </Button>
                </Link>
                <p className="text-sm text-muted-foreground">
                  View available Model Context Protocol (MCP) components and their tools.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Link href="/agent-list" className="flex items-center space-x-2">
                  <Button variant="outline">
                    <User className="h-4 w-4 mr-2"/>
                    Agent List
                  </Button>
                </Link>
                <p className="text-sm text-muted-foreground">
                  View a list of created agents, showing their name, type, and class.
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
