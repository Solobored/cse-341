const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Contacts API",
      version: "1.0.0",
      description: "API for managing contacts",
    },
    servers: [
      {
        url: "https://cse341-api.onrender.com",
        description: "Production server",
      },
      {
        url: "http://localhost:8080",
        description: "Local development server",
      },
    ],
  },
  apis: ["./routes/*.js", "./swagger/*.js"],
}

const specs = swaggerJsdoc(options)

module.exports = { specs, swaggerUi }

