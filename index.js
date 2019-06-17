const minimist = require('minimist')

module.exports = () => {
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
  const cmd = args._[0]
  
  /**
   *  To make the CLI only load commands that were invoked
   *  we use a switch statement that will require the module
   *  needed for the command given, then run that module with
   *  the @args object as a function parameter
   *
   *  The easiest way to do this is by using a switch statement
   *  to dynamically load the various modules
   **/
  switch (cmd) {
    case 'today':
      require('./cmds/today')(args)
      break
    default:
      console.error(`"${cmd}" is not a valid command!`)
      break
  }
}