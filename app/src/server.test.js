/* eslint-disable max-nested-callbacks */
import request from 'supertest';
import { describe, it } from 'mocha';

import server from '../src/server';

const onEnd = (error, done) => {
  if (error) {
    throw error;
  }

  done();
};

describe('the server', () => {
  describe('the /healthcheck endpoint', () => {
    it('returns confirmation that the server is running', (done) => {
      request(server)
        .get('/healthcheck')
        .expect(200)
        .expect('"all gravy"')
        .end((error) => onEnd(error, done));
    });
  });
});
