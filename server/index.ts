import { createApp } from './app.js';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;

async function start() {
  const app = await createApp();
  const server = app.listen(PORT, () => {
    console.log(`[API Server] Running on http://localhost:${PORT}`);
  });

  process.on('SIGTERM', () => {
    server.close(() => process.exit(0));
  });
}

start().catch((err) => {
  console.error('[API Server] Startup failure:', err);
  process.exit(1);
});
