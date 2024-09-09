const { Client } = require("pg");
const { createTable, getAllJokes, addInitialJokes } = require("./query-helper");
require('dotenv/config')

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});


const authenticateDB = async () => {
  try {
    await client.connect();
    console.log("Postgres db connected!! ✅");

    await client.query(createTable);

    const { rowCount } = await client.query(getAllJokes);
    if (rowCount > 0) {
      console.log(
        "Jokes table already exists and has data. Skipping insertion."
      );
    } else {
      await client.query(addInitialJokes);
      console.log("Initial jokes inserted into the database.");
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { client, authenticateDB };
