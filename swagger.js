const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Joke APIs",
      description: "API endpoints for a mini joke app documented on swagger",
      contact: {
        name: "Rahul",
        url: "https://github.com/rahul01-git/jokes-app-swagger.git",
      },
      version: "1.0.0",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
        description: "Local Server",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
function swaggerDocs(app, port) {
  app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get("/swagger.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}

module.exports = { swaggerDocs };
