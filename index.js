require("dotenv/config");
const express = require("express");

const PORT = process.env.PORT || 3000;
const weatherRoute = require("./routes/weather");

const app = express();

app.use("/api/weather", weatherRoute);

app.listen(PORT, () => {
  console.log(`Wheaterry listening on port ${PORT}`);
});
