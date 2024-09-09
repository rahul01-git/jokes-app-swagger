const express = require("express");
const { client } = require("../db-setup");
const { getAllJokes, getRandomJoke, createJoke } = require("../query-helper");

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
  const { rows } = await client.query(getAllJokes);
  res.status(200).json({ message: "Jokes fetched successfully !", data: rows });
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
  const query = createJoke([joke]);
  await client.query(query);
  res.status(201).json({ message: "New Joke created successfully !", data: joke });
});

module.exports = { router };
