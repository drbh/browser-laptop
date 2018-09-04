// Start a remote disposable node, and get access to the api
// print the node id, and stop the temporary daemon

const IPFSFactory = require('ipfsd-ctl')
const EventEmitter = require('events')
const {getExtensionsPath} = require('../js/lib/appUrlUtil')
const path = require('path')

const port = 43134
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

const IpfsApi = require('ipfs-api')
const options = {
  config: {
    Addresses: {
      API: '/ip4/127.0.0.1/tcp/43134',
      Gateway: '/ip4/127.0.0.1/tcp/5001'
    }
  },
  disposable: false,
  IpfsApi: IpfsApi,
  // init: false,
  // port: port,
  repoPath: repo
}

/**
 * State for a tor daemon subprocess.
 */
// class IPFSDaemon extends EventEmitter {
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

    // const DaemonFactory = require('ipfsd-ctl')
    //
    // const IPFSFactory = require('ipfsd-ctl')
    // const f = IPFSFactory.create({type: 'go', exec: execPath})

    //
    // server.start((err) => {
    //   f.spawn({
    //     config: {
    //       Addresses: {
    //         API: '/ip4/127.0.0.1/tcp/43134'
    //       }
    //     },
    //     disposable: false,
    //     start: true,
    //     init: true,
    //     IpfsApi: IpfsApi
    //   }, (err, ctl) => {
    //     if (err) throw err
    //   // console.log(Object.keys(ctl))
    //   // console.log(ctl.opts)
    //   // console.log(ctl.opts.config)
    //   // console.log(ctl.path)
    //   // console.log(ctl.disposable)
    //   // console.log(ctl.exec)
    //   // console.log(ctl.subprocess)
    //   // console.log(ctl.initialized)
    //   // console.log(ctl.clean)
    //   // console.log(ctl._apiAddr)
    //   // console.log(ctl._gatewayAddr)
    //   // console.log(ctl._started)
    //   // console.log(ctl.api)
    //   // console.log(ctl.apiAddr)
    //   // const api = IpfsApi(ctl.apiAddr)
    //     ctl.start(function (data) {
    //       console.log(data)
    //     })
    //   // api.id(console.log)
    //   })
    // })
    // server.start((err) => {
// opens an api connection to local running go-ipfs node
//     DaemonFactory
//         .create({type: 'go', exec: execPath, port: port, remote: true})
//         .spawn({disposable: false, port: port}, (err, ipfsd) => {
//           if (err) {
//             throw err
//           }
//           console.log(ipfsd.api)

    // ipfsd.api.id(function (err, id) {
    //   if (err) {
    //     throw err
    //   }
    //
    //   console.log('js-ipfs')
    //   console.log(id)
    //   ipfsd.stop()
    // })
    // })
    // })

    // server.start((err) => {
    //   if (err) { throw err }
    //   console.log('Server Start')
    //   // console.log(f)
    //
    //   f.spawn(options, (err, ipfsd) => {
    //     if (err) { throw err }
    //     console.log('Deamon Start')
    //     // this._process = ipfsd
    //     console.log(ipfsd.opts)
    //     // console.log('http://' + ipfsd.api.apiHost + ':' + ipfsd.api.apiPort + '/webui')
    //     ipfsd.init(console.log)
    //     // ipfsd.api.id(function (err, id) {
    //     //   if (err) { throw err }
    //     //
    //     //   // console.log(id.api.apiPort)
    //     //   // ipfsd.stop(server.stop)
    //     // })
    //   })
    // })


    server.start((err) => {
      if (err) { throw err }
      console.log('Server Start')
      // console.log(f)

      f.spawn(options, (err, ipfsd) => {
        if (err) { throw err }
        console.log('Deamon Start')
        // this._process = ipfsd
        console.log(ipfsd.opts)
        // console.log('http://' + ipfsd.api.apiHost + ':' + ipfsd.api.apiPort + '/webui')
        ipfsd.start(console.log)
        // ipfsd.api
        //
        //   .id(function (err, id) {
        //   if (err) { throw err }
        //   console.log('http://' + ipfsd.api.apiHost + ':' + ipfsd.api.apiPort + '/webui')
        // })
      })
    })

    const IPFS = require('ipfs')

    const DaemonFactory = require('ipfsd-ctl')

    DaemonFactory
      .create({ type: 'go', exec: execPath })
      .spawn((err, ipfsd) => {
        if (err) {
          throw err
        }


        console.log('http://' + ipfsd.api.apiHost + ':' + ipfsd.api.apiPort + '/webui')
        // ipfsd.api.id((err, id) => {
        //   if (err) {
        //     throw err
        //   }
        //
        //   console.log('js-ipfs')
        //   console.log(id)
        //   // ipfsd.stop(() => process.exit(0))
        // })
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
