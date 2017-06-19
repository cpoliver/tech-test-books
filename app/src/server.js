import restify from 'restify';

import { generateBook } from './bookGenerator';

const DEFAULT_ITEMS_PER_PAGE = 10;
const DEFAULT_PAGE = 1;
const DEFAULT_FILTER = JSON.stringify({});
const DEFAULT_SORT = JSON.stringify({});

const createServer = (db) => {
  const app = restify.createServer();

  app.use(restify.queryParser());

  app.get('/books', (request, response) => {
    const {
      count = DEFAULT_ITEMS_PER_PAGE,
      page = DEFAULT_PAGE,
      filter = DEFAULT_FILTER,
      sort = DEFAULT_SORT
    } = request.params;

    const skip = (page - 1) * count;

    db.find(JSON.parse(filter))
      .sort(JSON.parse(sort))
      .skip(skip)
      .limit(count)
      .exec((error, books) => {
        if (error) {
          response.send(500);
        } else {
          response.send(200, books);
        }
      });
  });

  app.get('/books/count', (request, response) => {
    db.count({}, (error, count) => {
      if (error) {
        response.send(500);
      } else {
        response.send(200, { count });
      }
    });
  });

  app.post('/admin/add-books/:count', (request, response) => {
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

  app.del('/admin/delete-all-books', (request, response) => {
    db.remove({}, { multi: true }, (error, count) => {
      if (error) {
        response.send(500);
      } else {
        response.send(200, { message: `database cleared: deleted ${count} books` });
      }
    });
  });

  return app;
};

export { createServer };
