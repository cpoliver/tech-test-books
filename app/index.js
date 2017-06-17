import server from './src/server.js';

const port = process.env.PORT || 5000;

server.listen(port, () => {
  // eslint-disable-next-line no-undef
  console.log(`${server.name} listening on port ${port}`);
});
