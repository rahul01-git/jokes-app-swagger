const express = require("express");
const { router: jokeRoutes } = require("./routes");
const { authenticateDB } = require("./db-setup");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Yo wassup bro !!" });
});

app.use("/api/v1/jokes", jokeRoutes);

app.listen(port, () => {
  authenticateDB();
  console.log(`Server running at port: ${port}`);
});
