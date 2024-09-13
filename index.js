const express = require("express");
const cors = require("cors");
const { router: jokeRoutes } = require("./routes/joke.routes");
const { authenticateDB } = require("./db-setup");
const { swaggerDocs } = require("./swagger");
const { redisClient } = require("./redis-client");

const app = express();
const port = process.env.PORT || 8080;
const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");


app.get("/", (req, res) => {
  res.json({ message: "Yo wassup bro !!" });
});

app.use("/api/v1/jokes", jokeRoutes);

app.listen(port, async () => {
  await authenticateDB();
  await redisClient.connect()
  swaggerDocs(app, port);
  console.log(`Server running at port: ${port}`);
});

process.on("SIGINT", async () => {
  await redisClient.quit();
  console.log("shutdown redis connection...");
  console.log("closing server...");
  process.exit(0);
});
