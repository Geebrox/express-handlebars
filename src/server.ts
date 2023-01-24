import express from 'express';

const server = express();

server.listen(3000, () => {
  console.log('🚀 Server has been started: http://localhost:3000');
});
