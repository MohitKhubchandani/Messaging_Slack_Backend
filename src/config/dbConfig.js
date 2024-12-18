import mongoose from 'mongoose';

import { DEV_DB_URL, NODE_ENV, PROD_DB_URL } from './serverConfig.js';

export default async function connectDB() {
  try {
    const dbURL = NODE_ENV === 'development' ? DEV_DB_URL : PROD_DB_URL;

    if (!dbURL) {
      throw new Error(
        `Database URL for ${NODE_ENV} environment is not defined.`
      );
    }

    await mongoose.connect(dbURL);

    console.log(`✅ Connected to MongoDB :- ${NODE_ENV} environment`);
  } catch (error) {
    console.error(`❌ Error connecting to the database: ${error.message}`);
    process.exit(1); // Exit the application in case of a database connection failure
  }
}
