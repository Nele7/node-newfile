const fs = require('fs')

class FsService {
  constructor(options) {}

  writeFile(path, data = '') {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, data, (err) => {
        if (err) reject(err)
        resolve()
      })
    })
  }

  readFile(path) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, 'utf-8', (err, data) => {
        if (err) reject()
        resolve(data)
      })
    })
  }

  async writeFileRecursive(path, data) {
    try {
      const lastPath = path.substring(0, path.lastIndexOf('/'))
      await this.mkdir(lastPath)
      await this.writeFile(path)
    } catch (error) {
      console.log(error)
    }
  }

  mkdir(path) {
    return new Promise((resolve, reject) => {
      fs.mkdir(path, { recursive: true }, (err) => {
        if (err) throw reject()
        resolve()
      })
    })
  }

  rmdir(path) {
    return new Promise((resolve, reject) => {
      fs.rmdir(path, { recursive: true }, (err) => {
        if (err) throw reject()
        resolve()
      })
    })
  }
  access() {
    return new Promise((resolve, reject) => {
      fs.access(path, (err) => {
        if (err) throw reject()
        resolve()
      })
    })
  }
  readFileToArr(fReadName) {
    return new Promise((resolve, reject) => {
      const fRead = fs.createReadStream(fReadName)
      const objReadline = readline.createInterface({
        input: fRead,
      })
      var arr = new Array()
      objReadline.on('line', function (line) {
        arr.push(line)
        //console.log('line:'+ line);
      })
      objReadline.on('close', function () {
        // console.log(arr);
        resolve(arr)
      })
    })
  }
  readdir(path) {
    return new Promise((resolve, reject) => {
      fs.readdir(path, function (err, file) {
        if (err) {
          reject(err)
        } else {
          resolve(file)
        }
      })
    })
  }
}

module.exports = FsService
