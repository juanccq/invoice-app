import http from 'http';
import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

server.on('error', (error) => {
  if( error.syscall !== 'listen' ) {
    throw error;
  }

  const bind = typeof PORT == 'string' ? 'Pipe ' + PORT : 'Port ' + PORT;

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});

process.on('SIGNIT', () => {
  console.log('Server is shutting down...');
  server.close(() => {
    console.log('Server has shut down gracefully');
    process.exit(0);
  });
});