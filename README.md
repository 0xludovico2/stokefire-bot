# StokeFire Bot

A TypeScript-based service that subscribes to gaming events via GraphQL and broadcasts them in real-time.

## Features

- Real-time event subscription via GraphQL WebSocket
- Automatic player activity tracking
- Configurable event broadcasting
- TypeScript support
- Railway deployment ready

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/event-bot-service.git
cd event-bot-service
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```
# Add your environment variables here
# DISCORD_WEBHOOK_URL=your_webhook_url
```

4. Build the project:
```bash
npm run build
```

5. Start the service:
```bash
npm start
```

## Development

To run in development mode with hot-reload:
```bash
npm run dev
```

## Deployment

This service is configured for deployment on Railway. Connect your GitHub repository to Railway and it will automatically detect and deploy the Node.js service.

## Environment Variables

- `DISCORD_WEBHOOK_URL` (optional): Webhook URL for Discord integration
- Add other environment variables as needed

## License

MIT

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
