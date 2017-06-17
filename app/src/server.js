import restify from 'restify';

const server = restify.createServer();

server.use(restify.bodyParser());

server.get('/healthcheck/', (request, response) => {
  response.send(200, 'all gravy');
});

export default server;
