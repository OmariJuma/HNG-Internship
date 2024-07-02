const { default: axios } = require('axios');

const router = require('express').Router();
router.get('/hello', async (req, res) => {
  const {visitor_name} = req.query;
  let ip = req.ip;
  try {
    const response =  await axios.get(`http://ip-api.com/json/${ip}`)
    console.log(response.data)    
  } catch (error) {
    res.json({message: error.message})
  }
  try {
    const getWeather = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}q=${city}&aqi=no`)
    const temperature = getWeather.data.current.temp_c
    console.log(temperature)
  } catch (error) {
    res.json({message: error.message})
  }
  // If the IP is an IPv6 version of an IPv4 address, extract the IPv4 part
  if (ip.substr(0, 7) === "::ffff:") {
    ip = ip.substr(7)
  }    res.json({
        "client_ip": ip, //the IP address of the requester
        "location": response.city, //The city of the requester
        "greeting": `hello ${visitor_name}! The temperature is ${temperature}degrees celcius in ${response.city}` //A greeting that includes the name of the requester

    });
    });
module.exports = router;