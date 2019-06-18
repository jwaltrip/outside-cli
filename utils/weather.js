const axios = require("axios")
const { Signale } = require("signale")

// config logger
const logConfig = {
  logLevel: process.env.LOG_LEVEL || "warn",
  scope: "weather scope"
}
const log = new Signale(logConfig)

module.exports = async (location) => {
  const results = await axios({
    method: "get",
    url: "https://api.openweathermap.org/data/2.5/weather",
    params: {
      q: location,
      units: "imperial",
      appid: process.env.WEATHER_API_KEY
    }
  })
  
  log.debug(`weather info: ${JSON.stringify(results.data)}`)
  
  return results.data
}
