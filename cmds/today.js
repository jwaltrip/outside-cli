const { Signale } = require("signale")
const ora = require("ora")
const getWeather = require("../utils/weather")

// logger config
const logConfig = {
  logLevel: process.env.LOG_LEVEL || "warn",
  scope: "today scope"
}
const log = new Signale(logConfig)

// add toTitleCase fn to String prototype
String.prototype.toTitleCase = function () {
  return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

module.exports = async (args) => {
  const spinner = ora().start()
  
  try {
    const location = args.location || args.l
    const weather = await getWeather(location)
    
    log.debug(`location: ${location}`)
    
    spinner.stop()
    
    console.log(`Current conditions in ${location}:\n`)
    console.log(`\tCurrent Temp:      ${weather.main.temp}° ${weather.weather[0].description.toTitleCase()}\n`)
    console.log(`\tToday's High:      ${weather.main.temp_max}°`)
    console.log(`\tToday's Low:       ${weather.main.temp_min}°`)
    console.log(`\tToday's Humidity:  ${weather.main.humidity}%`)

  } catch (err) {
    spinner.stop()
    
    log.error(err)
  }
}
