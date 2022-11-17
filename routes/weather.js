const router = require("express").Router();
const axios = require("axios");

const CITY_DATA = require("../constants");

const fetchDataFromAPI = async (city) => {
  const {data} = await axios({
    url: `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${process.env.OPENWEATHERMAP_API_KEY}`,
    method: "GET",
  })

  console.log(data)
  return data
}

const getDataFromDB = async () => {
  
}

router.get("/:city", async (req, res) => {
  console.log("Called weather route");
  if (!req.params.city)
    return res.status(400).json({
      status: 400,
      error: true,
      data: "Please set which city you'd like to check.",
    });

  const selectedCity = CITY_DATA.find(
    (city) =>
      city.local_names.hu.toLowerCase() === req.params.city.toLowerCase()
  );
  if (!selectedCity)
    return res.status(400).json({
      status: 400,
      error: true,
      data: `Please select another city as we don't have data for '${req.params.city}'`,
    });

  const response = await fetchDataFromAPI(selectedCity)
  res.status(200).json({ status: 200, error: false, data: response });
});

module.exports = router;
