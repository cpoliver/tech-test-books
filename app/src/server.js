import restify from 'restify';

import { generateBook } from './bookGenerator';

const DEFAULT_ITEMS_PER_PAGE = 10;
const DEFAULT_PAGE = 1;
const DEFAULT_FILTER = JSON.stringify({});
const DEFAULT_SORT = JSON.stringify({ title: 1 });

const parseParams = ({ params }) => {
  const {
    itemsPerPage = DEFAULT_ITEMS_PER_PAGE,
    page = DEFAULT_PAGE,
    filter = DEFAULT_FILTER,
    sort = DEFAULT_SORT
  } = params;

  return {
    itemsPerPage: parseInt(itemsPerPage, 10),
    page: parseInt(page, 10),
    filter: JSON.parse(filter),
    sort: JSON.parse(sort)
  };
};

export const createServer = (db) => {
  const server = restify.createServer();

  server.use(restify.queryParser());
  server.use(restify.CORS({ origins: ['http://localhost:3000'] })); // eslint-disable-line new-cap

  server.get('/books', (request, response) => {
    const { itemsPerPage, page, filter, sort } = parseParams(request);
    const skip = (page - 1) * itemsPerPage;

    db.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(itemsPerPage)
      .exec((error, books) => {
        if (error) {
          response.send(500);
        } else {
          response.send(200, { books, page, itemsPerPage });
        }
      });
  });

  server.get('/books/count', (request, response) => {
    const { filter = DEFAULT_FILTER } = request.params;

    db.count(JSON.parse(filter), (error, count) => {
      if (error) {
        response.send(500);
      } else {
        response.send(200, { count });
      }
    });
  });

  server.post('/admin/add-books/:count', (request, response) => {
    const { count } = request.params;
    const books = [];

    for (let i = 0; i < count; i++) {
      books.push(generateBook());
    }

    db.insert(books, (error, books) => {
      if (error) {
        response.send(500);
      } else {
        response.send(200, { message: `added ${books.length} books` });
      }
    });
  });

  server.del('/admin/delete-all-books', (request, response) => {
    db.remove({}, { multi: true }, (error, count) => {
      if (error) {
        response.send(500);
      } else {
        response.send(200, { message: `database cleared: deleted ${count} books` });
      }
    });
  });

  return server;
};
