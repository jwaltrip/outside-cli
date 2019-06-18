const { Signale } = require("signale")

// Logger config
const logConfig = {
  scope: "help scope"
}

const log = new Signale(logConfig)

const menus = {
  main: `
    outside [command] <options>
    
    today ............. show weather for today
    forecast .......... show 10-day weather forecast
    version ........... show package version
    help .............. show help menu for a command
  `,
  
  today: `
    outside today <options>
    
    --location, -l .... the location to use
  `,
  
  forecast: `
    outside forecast <options>
    
    --location, -l .... the location to use
  `
}

module.exports = (args) => {
  // determine whether to show main help screen
  // or to show help for a specific command ex: "today", etc
  const subCmd = (args._[0] === "help")
                 ? args._[1]
                 : args._[0]
  
  log.debug(`subCmd: ${subCmd}`)
  
  console.log(menus[subCmd] || menus.main)
}
