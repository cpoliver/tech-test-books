import restify from 'restify';

import db from './lib/db';
import { generateBook } from './bookGenerator';

const server = restify.createServer();

server.use(restify.bodyParser());

server.get('/healthcheck/', (request, response) => {
  response.send(200, 'all gravy');
});

server.get('/books/', (request, response) => {
  db.find({}).limit(10).exec((error, books) => {
    if (error) {
      response.send(500);
    } else {
      response.send(200, books);
    }
  });
});

server.get('/add-books/', (request, response) => {
  const books = [];

  for (let i = 0; i < 100; i++) {
    books.push(generateBook());
  }

  db.insert(books, (error, books) => {
    if (error) {
      response.send(500);
    } else {
      response.send(200, books);
    }
  });
});

export default server;
