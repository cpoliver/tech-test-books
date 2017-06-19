import Datastore from 'nedb';

export default new Datastore({ filename: '../data/nedb.json', autoload: true });
