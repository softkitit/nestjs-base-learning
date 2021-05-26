import { MongoClient } from 'mongodb';

import { MONGO_DB, MONGO_URL } from './environments';

async function main() {
  console.log('🚀  Server ready');

  const url = MONGO_URL!;

  const dbName = MONGO_DB!;

  const client = new MongoClient(url, {
    useUnifiedTopology: true
  });

  try {
    await client.connect();

    console.log('🌱  Database seeder is running');

    const db = client.db(dbName);

    client.close();
    console.log('💤  Server off');
  } catch (err) {
    console.log('❌  Server error', err.stack);
  }
}

main();
