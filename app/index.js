import server from './src/server.js';

console.log('starting server...');

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`${server.name} listening on port ${port}`);
});
