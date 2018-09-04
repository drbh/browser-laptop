const {getExtensionsPath} = require('../js/lib/appUrlUtil')
const path = require('path')
const execPath = path.join(getExtensionsPath('bin'), 'ipfs')

/**
 * State for a ipfs daemon subprocess.
 */
class IPFSDaemon {
  /**
   * Initialization-only constructor.  No parameters, no nontrivial
   * computation, no I/O.
   */
  constructor () {
    // super()
    this._process = null // child process
  }
  setup (callback) {}

  mystart () {
    console.log('My Start')
    const cmd = execPath + ' daemon'

    console.log(cmd)
    var exec = require('child_process').exec
    exec(cmd, function (error, stdout, stderr) {
      console.log('stdout: ' + stdout)
      console.log('stderr: ' + stderr)
      if (error !== null) {
        console.log('exec error: ' + error)
      }
    })
    console.log('Server Has Been Started')
  }
}
module.exports.IPFSDaemon = IPFSDaemon
