// src/index.ts
import { createClient } from 'graphql-ws';
import ws from 'ws';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Types for our event data
interface Player {
  id: string;
  name: string;
}

interface Event {
  id: string;
  type: string;
  timestamp: string;
  description: string;
  players: Player[];
}

// GraphQL subscription query
const EVENTS_SUBSCRIPTION = `
  subscription OnNewEvent {
    events {
      id
      type
      timestamp
      description
      players {
        id
        name
      }
    }
  }
`;

// Create WebSocket client
const client = createClient({
  url: 'wss://api.stokefire.xyz/graphql',
  webSocketImpl: ws,
  connectionParams: {
    // Add any required authentication headers here
    // Authorization: `Bearer ${process.env.API_TOKEN}`,
  },
});

// Function to format event message
function formatEventMessage(event: Event): string {
  const playerNames = event.players.map(p => p.name).join(' and ');
  const timestamp = new Date(event.timestamp).toLocaleString();
  
  return `🎮 [${timestamp}] ${playerNames} - ${event.description}`;
}

// Function to broadcast event
async function broadcastEvent(message: string) {
  // Here you would implement your broadcasting logic
  // For example, sending to Discord, Slack, or other platforms
  console.log(message);
  
  // Example Discord implementation (uncomment and configure as needed):
  /*
  if (process.env.DISCORD_WEBHOOK_URL) {
    try {
      await fetch(process.env.DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: message }),
      });
    } catch (error) {
      console.error('Error sending to Discord:', error);
    }
  }
  */
}

// Main subscription handler
async function subscribeToEvents() {
  console.log('🚀 Starting event subscription service...');

  try {
    (async () => {
      const onNext = (data: any) => {
        const event: Event = data.events;
        const message = formatEventMessage(event);
        broadcastEvent(message);
      };

      await new Promise((resolve, reject) => {
        client.subscribe(
          {
            query: EVENTS_SUBSCRIPTION,
          },
          {
            next: onNext,
            error: (error) => {
              console.error('Subscription error:', error);
              reject(error);
            },
            complete: () => {
              console.log('Subscription completed');
              resolve(null);
            },
          },
        );
      });
    })();
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

// Error handling and graceful shutdown
process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down...');
  client.dispose();
  process.exit(0);
});

// Start the service
subscribeToEvents();
