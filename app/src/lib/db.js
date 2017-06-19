import Datastore from 'nedb';

const DEFAULT_FILE_NAME = '../data/nedb.json';

export const createDb = ({ inMemoryOnly = false } = {}) => new Datastore({
  inMemoryOnly,
  filename: DEFAULT_FILE_NAME,
  autoload: true
});
