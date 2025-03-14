const express = require("express")
const bodyParser = require("body-parser")
const mongodb = require("./db/connect")
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("./swagger.json")
const port = process.env.PORT || 8080
const app = express()
const cors = require('cors');

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    next()
  })
  .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use("/", require("./routes"))
  .use(cors());

mongodb.initDb((err) => {
  if (err) {
    console.log(err)
  } else {
    app.listen(port)
    console.log(`Connected to DB and listening on ${port}`)
  }
})

