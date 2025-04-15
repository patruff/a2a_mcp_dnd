'use client';

import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';

interface Agent {
  name: string;
  type: string;
  class?: string;
  npc?: string;
}

const AgentListPage: React.FC = () => {
  // Placeholder data - replace with actual data fetching later
  const agents: Agent[] = [
    {name: 'Wizard Agent', type: 'character', class: 'Wizard'},
    {name: 'Fighter Agent', type: 'character', class: 'Fighter'},
    {name: 'Bartender NPC', type: 'NPC', npc: 'Bartender'},
    {name: 'Service Agent', type: 'service'},
    // Add more agents here
  ];

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Agent List</CardTitle>
          <CardDescription>
            A list of created agents, showing their name, type, and class.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {agents.length > 0 ? (
            <ul className="list-none pl-0">
              {agents.map((agent, index) => (
                <li key={index} className="py-2 border-b border-gray-200 last:border-b-0">
                  <strong className="text-lg">{agent.name}</strong>
                  <p className="text-sm text-gray-500">
                    Type: {agent.type}
                    {agent.type === 'character' && agent.class && `, Class: ${agent.class}`}
                    {agent.type === 'NPC' && agent.npc && `, NPC: ${agent.npc}`}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No agents have been created yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentListPage;
