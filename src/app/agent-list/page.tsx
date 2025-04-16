'use client';

import React, {useState, useEffect} from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import Link from 'next/link';

interface Agent {
  name: string;
  type: string;
  class?: string;
  npc?: string;
  agentCardJson?: string;
}

const AgentListPage: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([]);

  useEffect(() => {
    // Fetch agent data from local storage
    const storedAgents = localStorage.getItem('agents');
    if (storedAgents) {
      setAgents(JSON.parse(storedAgents));
    }
  }, []);

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {agents.map((agent, index) => (
                <div key={index} className="py-2 border-b border-gray-200 last:border-b-0">
                  <strong className="text-lg">{agent.name}</strong>
                  <p className="text-sm text-gray-500">
                    Type: {agent.type}
                    {agent.type === 'character' && agent.class && `, Class: ${agent.class}`}
                    {agent.type === 'NPC' && agent.npc && `, NPC: ${agent.npc}`}
                  </p>
                  {agent.agentCardJson && (
                    <Link href={`/agent-viewer?agentCardJson=${encodeURIComponent(agent.agentCardJson)}`}>
                      View AgentCard
                    </Link>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p>No agents have been created yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentListPage;
