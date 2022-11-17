require("dotenv/config");
const fs = require("fs")
const path = require("path")
const express = require("express");
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

// Consts
const PORT = process.env.PORT || 3000;
const CITY_DATA = require("./constants");

// Routes
const weatherRoute = require("./routes/weather");

const app = express();

// Middlewares
app.use(morgan('tiny'))
app.use(morgan('tiny', {
    stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
}))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/api/weather", weatherRoute);

app.listen(PORT, () => {
  console.log(`Weatherry listening on port ${PORT}`);
});
