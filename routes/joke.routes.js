const express = require("express");
const { client } = require("../db-setup");
const { getAllJokes, getRandomJoke, createJoke } = require("../query-helper");
const { redisClient } = require("../redis-client");

const router = express.Router();

/**
 * @openapi
 * /api/v1/jokes:
 *   get:
 *     summary: Get all jokes
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       joke:
 *                         type: string
 */

router.get("/", async (req, res) => {
  const cacheKey = "all_jokes";
  try {
    const cachedJokes = await redisClient.get(cacheKey)
    if (cachedJokes) return res.status(200).json(JSON.parse(cachedJokes));

    const { rows } = await client.query(getAllJokes);
    const response = { message: "Jokes fetched successfully!", data: rows };

    await redisClient.set(cacheKey, JSON.stringify(response), "EX", 3600);

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching jokes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * @openapi
 * /api/v1/jokes/random:
 *   get:
 *     summary: Get a random joke
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       joke:
 *                         type: string
 */
router.get("/random", async (req, res) => {
  const { rows } = await client.query(getRandomJoke);
  res
    .status(200)
    .json({ message: "Random Joke fetched successfully !", data: rows });
});

/**
 * @openapi
 * /api/v1/jokes:
 *   post:
 *     summary: Create a new joke
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              joke:
 *                type: string
 *     responses:
 *       '201':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *
 */

router.post("/", async (req, res) => {
  const { joke } = req.body;
  if (joke.trim() === "") throw new Error("Joke not provided");
  try {
    const query = createJoke([joke]);
    await client.query(query);
    await redisClient.del("all_jokes");

    res
      .status(201)
      .json({ message: "New Joke created successfully !", data: joke });
  } catch (error) {
    console.error("Error creating joke:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = { router };
