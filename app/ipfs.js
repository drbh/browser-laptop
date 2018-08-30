// Start a remote disposable node, and get access to the api
// print the node id, and stop the temporary daemon

const IPFSFactory = require('ipfsd-ctl')
const EventEmitter = require('events')
const {getExtensionsPath} = require('../js/lib/appUrlUtil')
const path = require('path')

const port = 60123
const execPath = path.join(getExtensionsPath('bin'), 'ipfs')
const repo = '~/Desktop/ipfsRepo'

const server = IPFSFactory.createServer({
  port: port
})
const f = IPFSFactory.create({
  remote: false,
  port: port,
  type: 'go',
  exec: execPath
})

const options = {
  // init: false,
  port: port,
  repoPath: repo
}

/**
 * State for a tor daemon subprocess.
 */
class IPFSDaemon extends EventEmitter {
  /**
   * Initialization-only constructor.  No parameters, no nontrivial
   * computation, no I/O.
   */
  constructor () {
    super()
    this._process = null // child process
  }
  setup (callback) {}

  mystart () {
    console.log('My Start')

    server.start((err) => {
      if (err) { throw err }
      console.log('Server Start')
      console.log(f)

      f.spawn(options, (err, ipfsd) => {
        if (err) { throw err }
        console.log('Deamon Start')
        // this._process = ipfsd

        console.log('http://' + ipfsd.api.apiHost + ':' + ipfsd.api.apiPort + '/webui')

        ipfsd.api.id(function (err, id) {
          if (err) { throw err }

          // console.log(id.api.apiPort)
          // ipfsd.stop(server.stop)
        })
      })
    })

    console.log('Server Has Been Started')
  }

  stop () {}
  kill () {}
  // _error (msg) {}
  // _watchEvent (event, filename) {}
  // _poll () {}
  // _doPoll () {}
  // _polled () {}
  // _eatControlPort (callback) {}
  // _eatControlCookie (callback) {}
  // _openControl (portno, cookie) {}
  // _controlError (control, err) {}
  // _controlClosed (control) {}
  getSOCKSAddress () {}
  getVersion () {}
  getControl () {}
  // _torStatus (event, keys, info, statusHandler, infoHandler, callback) {}
  onBootstrap (handler, callback) {}
  onCircuitEstablished (handler, callback) {}
  onNetworkLiveness (handler, callback) {}
}

/**
 * Internal utility class.  State for a tor control socket interface.
 *
 * Emits the following events:
 *
 * async-${KEYWORD}(line, extra)
 * - on asynchronous events from Tor subscribed with
 *   TorControl.subscribe.
 *
 * error(err)
 * - on error
 *
 * close
 * - at most once when the control connection closes; no more events
 *   will be emitted.
 */
// class IPFSControl extends EventEmitter {
//   constructor (readable, writable) {}
//   destroy (err) {}
//   // _onLine (linebuf, trunc) {}
//   // _onEnd () {}
//   // _onError (err) {}
//   // _onClose () {}
//   // _error (msg) {}
//   cmd (cmdline, perline, callback) {}
//   cmd1 (cmdline, callback) {}
//   newnym (callback) {}
//   subscribe (event, callback) {}
//   unsubscribe (event, callback) {}
//   // _getListeners (purpose, callback) {}
//   getSOCKSListeners (callback) {}
//   getControlListeners (callback) {}
//   getVersion (callback) {}
// }

// module.exports.IPFSControl = IPFSControl
module.exports.IPFSDaemon = IPFSDaemon
