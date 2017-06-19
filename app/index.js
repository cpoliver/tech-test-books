import { createDb } from './src/lib/db';
import { createServer } from './src/server';

const port = process.env.PORT || 5000;

const db = createDb();

createServer(db).listen(port, () => {
  // eslint-disable-next-line no-undef
  console.log(`Book API listening on port ${port}`);
});
