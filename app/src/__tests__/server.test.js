/* eslint-disable max-nested-callbacks */
import request from 'supertest';
import { beforeEach, describe, it } from 'mocha';
import { expect } from 'chai';
import { intersection, join, length, pipe, pluck, prop } from 'ramda';

import books from '../../src/data/example-books.json';
import { createDb } from '../../src/lib/db';
import { createServer } from '../../src/server';

let db;
let server;

const errorFn = () => {
  throw new Error('forced error');
};

const matchingItemsCount = pipe(
  prop('books'),
  intersection(books),
  length
);

const getTitles = pipe(
  prop('books'),
  pluck('title'),
  join(',')
);

describe('the server', () => {
  beforeEach(() => {
    db = createDb({ inMemoryOnly: true });
    db.insert(books);
    server = createServer(db);
  });

  describe('/books', () => {
    it('returns 10 books by default', (done) => {
      request(server)
        .get('/books')
        .expect((response) => expect(matchingItemsCount(response.body)).to.equal(10))
        .expect(200, done);
    });

    it('handles pagination', (done) => {
      const count = 8;
      const page = 2;
      const expected = 3;

      request(server)
        .get(`/books?itemsPerPage=${count}&page=${page}`)
        .expect((response) => expect(matchingItemsCount(response.body)).to.equal(expected))
        .expect(200, done);
    });

    it('returns the pagination information', (done) => {
      const itemsPerPage = 11;
      const page = 1;

      request(server)
        .get(`/books?itemsPerPage=${itemsPerPage}&page=${page}`)
        .expect((response) => expect(response.body.itemsPerPage).to.equal(itemsPerPage))
        .expect((response) => expect(response.body.page).to.equal(page))
        .expect(200, done);
    });

    it.skip('errors when the pagination itemsPerPage parameter is invalid', (done) => {
      request(server)
        .get('/books?itemsPerPage=x&page=1')
        .expect(400, { message: 'invalid parameter: itemsPerPage' }, done);
    });

    it.skip('errors when the pagination page parameter is invalid', (done) => {
      request(server)
        .get('/books?itemsPerPage=10&page=x')
        .expect(400, { message: 'invalid parameter: page' }, done);
    });

    it('handles filtering', (done) => {
      const filter = JSON.stringify({
        genre: { $in: ['adventure', 'mystery'] },
        'author.gender': { $in: ['male'] }
      });

      request(server)
        .get(`/books?filter=${filter}`)
        .expect((response) => expect(matchingItemsCount(response.body)).to.equal(3))
        .expect(200, done);
    });

    it.skip('errors when the filter parameter is invalid', (done) => {
      request(server)
        .get('/books?itemsPerPage=10&filter=x')
        .expect(400, { message: 'invalid parameter: filter' }, done);
    });

    it('handles sorting', (done) => {
      const sort = JSON.stringify({ title: 1 });

      const expected = [
        'Books at the Hospital',
        'Electricity Delusion',
        'Hiding the South'
      ].join(',');

      request(server)
        .get(`/books?sort=${sort}&page=1&itemsPerPage=3`)
        .expect((response) => expect(getTitles(response.body)).to.equal(expected)
        )
        .expect(200, done);
    });

    it.skip('errors when the sort parameter is invalid', (done) => {
      request(server)
        .get('/books?sort=x')
        .expect(400, { message: 'invalid parameter: sort' }, done);
    });

    it('responds with a 500 if the db operation fails', (done) => {
      db.find = errorFn;

      request(server)
        .get('/books')
        .expect(500, done);
    });
  });

  it('handles sorting and pagination simultaneously', (done) => {
    const count = 2;
    const page = 2;
    const expected = 2;

    const sort = JSON.stringify({ title: 1 });

    request(server)
      .get(`/books?itemsPerPage=${count}&page=${page}&sort=${sort}`)
      .expect((response) => expect(matchingItemsCount(response.body)).to.equal(expected))
      .expect(200, done);
  });

  describe('/books/count', () => {
    it('returns the total number of books in the db', (done) => {
      request(server)
        .get('/books/count')
        .expect(200, { count: 11 }, done);
    });

    it('returns the total number of books in the db for a given filter', (done) => {
      const filter = JSON.stringify({
        genre: { $in: ['adventure', 'mystery'] },
        'author.gender': { $in: ['male'] }
      });

      request(server)
        .get(`/books/count?filter=${filter}`)
        .expect(200, { count: 3 }, done);
    });
  });

  describe('/admin/add-books/{count}', () => {
    it('adds the specified number of books', (done) => {
      const count = 3;

      request(server)
        .post(`/admin/add-books/${count}`)
        .expect(200, { message: `added ${count} books` }, done);
    });

    it.skip('errors when the count parameter is invalid', (done) => {
      request(server)
        .post('/admin/add-books/notcount')
        .expect(400, { message: 'invalid parameter: count' }, done);
    });

    it('responds with a 500 if the operation fails', (done) => {
      db.insert = errorFn;

      request(server)
        .post('/admin/add-books/42')
        .expect(500, done);
    });
  });

  describe('/admin/delete-all-books', () => {
    it('deletes all the books', (done) => {
      request(server)
        .del('/admin/delete-all-books')
        .expect(200, { message: 'database cleared: deleted 11 books' }, done);
    });

    it('responds with a 500 if the operation fails', (done) => {
      db.remove = errorFn;

      request(server)
        .del('/admin/delete-all-books')
        .expect(500, done);
    });
  });
});
