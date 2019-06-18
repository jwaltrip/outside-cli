require('dotenv').config()
const minimist = require('minimist')
const { Signale } = require('signale')

module.exports = () => {
  
  // signale logger logLevel config
  const signaleConfig = {
    logLevel: process.env.LOG_LEVEL || "warn",
    scope: "index scope"
  }
  
  const log = new Signale(signaleConfig);
  
  /**
   *  minimist will automatically parse the input args
   *  and generate an object containing the args in an
   *  easy to work with manner
   *
   *  The first 2 arguents are ommitted because:
   *    - 1st arg = path to node interpreter
   *    - 2nd arg = path to script being ran by node
   *
   *  All args that come after the first 2 are the ones we care about
   *  and are used to determine the functionality of the program
   **/
  const args = minimist(process.argv.slice(2))
  // if no command is given, show help
  let cmd = args._[0] || "help"
  
  if (args.version || args.v) {
    cmd = "version"
  }
  
  if (args.help || args.h) {
    cmd = "help"
  }
  
  log.debug(`CLI args: ${JSON.stringify(args)}`)
  log.debug(`CLI cmd:  ${cmd}`)
  
  /**
   *  To make the CLI only load commands that were invoked
   *  we use a switch statement that will dynamically require the module
   *  needed for the command given, then run that module with
   *  the @args object as a function parameter
   *
   *  The easiest way to do this is by using a switch statement
   *  to dynamically load the various modules
   **/
  switch (cmd) {
    
    case "today":
      require('./cmds/today')(args)
      break
    
    case "forecast":
      require("./cmds/forecast")(args)
      break
    
    case "version":
      require("./cmds/version")(args)
      break
    
    case "help":
      require("./cmds/help")(args)
      break
    
    default:
      log.error(`"${cmd}" is not a valid command!`)
      break
  }
}
