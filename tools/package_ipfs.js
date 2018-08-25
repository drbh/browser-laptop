const execute = require('./lib/execute')
const path = require('path')
const fs = require('fs')
const crypto = require('crypto')

/**
 * does a hash comparison on a file to a given hash
 */
const verifyChecksum = (file, hash) => {
  const filecontent = fs.readFileSync(file)
  return hash === crypto.createHash('sha512').update(filecontent).digest('hex')
}

const isWindows = process.platform === 'win32'
const isDarwin = process.platform === 'darwin'
const isLinux = process.platform === 'linux'

const ipfsS3Prefix = 'https://s3.us-east-2.amazonaws.com/demo-ipfs-binaries/'
var ipfsPath = process.argv.slice(2)[0] // npm run package-ipfs ipfsPath
if (ipfsPath === undefined) {
  ipfsPath = path.join('app', 'extensions', 'bin')
}

const ipfsVersion = '0.4.17'
const braveVersion = '5'
const exeSuffix = isWindows ? '.exe' : ''
const ipfsURL = ipfsS3Prefix + 'ipfs-' + ipfsVersion + '-' + process.platform + '-brave-' + braveVersion + exeSuffix

// mkdir -p doesn't work well with Windows
if (!fs.existsSync(ipfsPath)) {
  fs.mkdirSync(ipfsPath)
}

// sha512 below are for Ipfs
var sha512Ipfs
if (isDarwin) {
  sha512Ipfs = '1a578a544ba259a9de11a63ef24f867bb7efbf7df4cd45dd08b9fff775f3b7f39eacd699c25fab22d69d4bee25bc03e9977a5cc66416792281276d584c101a5f'
} else if (isLinux) {
  sha512Ipfs = '193f01b75123debf90b3e35d0bc731f9e59cc06cd4e2869123f133f3a5f5c1796150b536c3cca50a9579c03f90084e5052d3ca385f807eac191f46348a57dce1'
} else {
  sha512Ipfs = '7ba514fdd5f184015d65bbb65c82475dc256d23078dd3f7d115b4e2b93bf73ceedfbca89eed1baf501bddcdb7f5c81f384e02836588d067c01c3f469b0664885'
}

// download the binary
const ipfsBinary = path.join(ipfsPath, 'ipfs' + exeSuffix)
const cmd = 'curl -o ' + ipfsBinary + ' ' + ipfsURL
execute([cmd], '', (err) => {
  if (err) {
    console.error('downloading ipfs failed', err)
    process.exit(1)
  }
  // verify the checksum
  if (!verifyChecksum(ipfsBinary, sha512Ipfs)) {
    console.error('ipfs checksum verification failed', err)
    process.exit(1)
  }
  console.log('ipfs binary checksum matches')
  // make it executable
  fs.chmodSync(ipfsBinary, 0o755)
  console.log('done')
})
