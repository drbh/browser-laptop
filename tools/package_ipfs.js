const request = require('request')
const os = require('os')
const fs = require('fs')
const crypto = require('crypto')
const path = require('path')

// 3rd party packages
const tar = require('tar')
const AdmZip = require('adm-zip')

// check platform and setup fucntion for verification
const isWindows = process.platform === 'win32'
const isDarwin = process.platform === 'darwin'
const isLinux = process.platform === 'linux'

let platform = process.platform
let fileExtension = '.tar.gz'

let exeExtension = ''
if (isWindows) {
  platform = 'windows'
  fileExtension = '.zip'
  exeExtension = '.exe'
}

const verifyChecksum = (file, hash) => {
  const filecontent = fs.readFileSync(file)
  return hash === crypto.createHash('sha512').update(filecontent).digest('hex')
}

// set script varibles
var uri = 'https://ipfs.io/ipns/dist.ipfs.io/go-ipfs/v0.4.17/'
var version = '0.4.17'

// build url for request and specific a download location
var downloadLink = uri + 'go-ipfs_v' + version + '_' + platform + '-amd64' + fileExtension
const tmpPath = `${os.tmpdir()}/`
// console.log(downloadLink,"\n",

console.log('Download for system')
console.log(downloadLink)

const downloadExtract = () => {
  const ipfsBinary = tmpPath + 'go-ipfs/ipfs' + exeExtension
  console.log(ipfsBinary)
}
const out = fs.createWriteStream(tmpPath + 'out')

// check the checksum
const verifyMove = function () {
  console.log('Extracted')
  console.log(tmpPath)
  const ipfsBinary = tmpPath + 'go-ipfs/ipfs' + exeExtension
  // // verify the checksum
  let sha512IPFS
  if (isDarwin) {
    sha512IPFS = 'c3d18404f257fcf8674ca0afcd45bf36501624c10a8642d59d52deb850383b7f136f4849919a1a4560eee1af61705cd91dd01b3e219fb38d0582cace2b0b03d7'
  } else if (isLinux) {
    sha512IPFS = 'e4131388efe52d0ec0e68fa3c0110c43fc58e2a5c5bb2c72062f5b947c7622dff78cde1181029331144298f15879887c20173d0eada368e7051f4f2b5c6b41ef'
  } else {
    sha512IPFS = 'b9175c6f1b624ee1e5db3076f5f5859c4e5dd9abc050f75c6a4ee5ecb7ab89b8fdec965c88b851775b369bc08a8c2dfc0d84807726a4f24448eacfc0e48cdc6c'
  }

  if (!verifyChecksum(ipfsBinary, sha512IPFS)) {
    console.error('IPFS checksum verification failed')
    process.exit(1)
  }
  console.log('IPFS binary checksum matches')
  // // Move file to specified path and then change permissions
  var binLocation = process.argv.slice(2)[0]
  if (binLocation === undefined) {
    binLocation = path.join('app', 'extensions', 'bin')
  }
  var oldPath = ipfsBinary
  var newPath = binLocation + '/ipfs' + exeExtension

  fs.rename(oldPath, newPath, function (err) {
    if (err) throw err
    console.log('Successfully moved to', newPath)
    // update permissions of
    fs.chmodSync(newPath, 0o755)
  })
}

// make a request and pipe the output to tmp dir
var stream = request(downloadLink).pipe(out)
stream.on('finish', function () {
  console.log('Downloaded')

  if (fileExtension === '.zip') {
        // unzip
    var zip = new AdmZip(tmpPath + 'out')
    var xtract = zip.extractAllTo('.')
    verifyMove()
  }
  if (fileExtension === '.tar.gz') {
    var gzipped = tmpPath + 'out'
    var unziplocation = tmpPath
    // console.log(gzipped, unziplocation)
    // tar gunzip
    xtract = tar.x({file: gzipped, C: unziplocation})
    xtract.then(verifyMove)
  }
})
// // build a checksum
// const filecontent = fs.readFileSync(ipfsBinary)
// var hash = crypto.createHash('sha512').update(filecontent).digest('hex')
// console.log(hash)
