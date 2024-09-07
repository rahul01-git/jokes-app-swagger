const createTable = `
    CREATE TABLE IF NOT EXISTS jokes (
            id SERIAL PRIMARY KEY,
            joke TEXT NOT NULL
        );
    `;

const addInitialJokes = `
        INSERT INTO jokes (joke) VALUES 
        ('Why don’t skeletons fight each other? They don’t have the guts.'),
        ('What do you call fake spaghetti? An impasta.'),
        ('Why did the scarecrow win an award? Because he was outstanding in his field.'),
        ('Why don’t scientists trust atoms? Because they make up everything.'),
        ('Why did the math book look sad? Because it had too many problems.'),
        ('What do you call cheese that isn’t yours? Nacho cheese.'),
        ('Why did the bicycle fall over? It was two-tired.'),
        ('What did the grape do when it got stepped on? Nothing, it just let out a little wine.'),
        ('How do you organize a space party? You planet.'),
        ('Why can’t you give Elsa a balloon? Because she will let it go.');
    `;

const getAllJokes = `
    SELECT * FROM jokes;
`;

const getRandomJoke = `
    SELECT * FROM jokes ORDER BY RANDOM() LIMIT 1;
`;

function createJoke(values) {
  const insertQuery = `
        INSERT INTO jokes(joke) VALUES ($1)
    `;

  return { text: insertQuery, values };
}

module.exports = {
  createTable,
  addInitialJokes,
  getAllJokes,
  getRandomJoke,
  createJoke
};
