const express = require("express")
const bodyParser = require("body-parser")
const mongodb = require("./db/connect")
const swaggerUi = require("swagger-ui-express")
const port = process.env.PORT || 8080
const app = express()
const cors = require('cors');

const swaggerDocument = process.env.NODE_ENV === 'production' 
  ? require("./swagger.prod.json")
  : require("./swagger.json");

app.use(cors({
  origin: ['http://localhost:8080', 'https://cse-341-mabb.onrender.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app
  .use(bodyParser.json())
  .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use("/", require("./routes"));

mongodb.initDb((err) => {
  if (err) {
    console.log(err)
  } else {
    app.listen(port)
    console.log(`Connected to DB and listening on ${port}`)
  }
})
