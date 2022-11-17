const router = require("express").Router();
const axios = require("axios");
const db = require("../db");

const CITY_DATA = require("../constants");

const fetchDataFromAPI = async (city) => {
  const { data } = await axios({
    url: `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${process.env.OPENWEATHERMAP_API_KEY}`,
    method: "GET",
  });

  return data;
};

const getDataFromDB = async (city) => {
  const client = await db();
  const storedData = await client.get(city.local_names.hu.toLowerCase());
  let response;
  if (!storedData) {
    response = await fetchDataFromAPI(city);
    await client.set(
      city.local_names.hu.toLowerCase(),
      JSON.stringify(response)
    );
  } else response = JSON.parse(storedData);

  const now = Date.now();
  const lastUpdate = response.dt * 1000;
  const timeDifference = 10 * 60 * 1000; // 10 minutes

  if (now - lastUpdate >= timeDifference) {
    response = await fetchDataFromAPI(city);
    await client.set(
      city.local_names.hu.toLowerCase(),
      JSON.stringify(response)
    );
  }

  return response;
};

router.post("/", async (req, res) => {
  if (!req.body.city)
    return res.status(400).json({
      status: 400,
      error: true,
      data: "Please set which city you'd like to check.",
    });

  const selectedCity = CITY_DATA.find(
    (city) => city.local_names.hu.toLowerCase() === req.body.city.toLowerCase()
  );
  
  if (!selectedCity)
    return res.status(400).json({
      status: 400,
      error: true,
      data: `Please select another city as we don't have data for '${req.body.city}'`,
    });

  const response = await getDataFromDB(selectedCity);
  return res.status(200).json({ status: 200, error: false, data: response });
});

module.exports = router;
