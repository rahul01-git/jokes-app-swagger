const express = require("express");
const { router: jokeRoutes } = require("./routes/joke.routes");
const { authenticateDB } = require("./db-setup");
const { swaggerDocs } = require("./swagger");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");

app.get("/", (req, res) => {
  res.json({ message: "Yo wassup bro !!" });
});

app.use("/api/v1/jokes", jokeRoutes);

app.listen(port, () => {
  authenticateDB();
  swaggerDocs(app, port);
  console.log(`Server running at port: ${port}`);
});
