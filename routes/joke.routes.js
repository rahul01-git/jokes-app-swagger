const express = require("express");
const { client } = require("../db-setup");
const { getAllJokes, getRandomJoke, createJoke } = require("../query-helper");

const router = express.Router();

router.get("/", async (req, res) => {
  const { rows } = await client.query(getAllJokes);
  res.status(200).json({ message: "Jokes fetched successfully !", data: rows });
});

router.get("/random", async (req, res) => {
  const { rows } = await client.query(getRandomJoke);
  res
    .status(200)
    .json({ message: "Random Joke fetched successfully !", data: rows });
});

router.post("/", async (req, res) => {
  const { joke } = req.body;
  const query = createJoke([joke]);
  await client.query(query);
  res.status(201).json({ message: "New Joke created successfully !", data: joke });
});

module.exports = { router };
