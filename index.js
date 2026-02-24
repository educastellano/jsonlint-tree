#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const jsonlint = require('jsonlint')
const argv = require('minimist')(process.argv.slice(2))

const check = String.fromCharCode(0x2713)
const cross = String.fromCharCode(0x2717)

const folder = argv._[0].startsWith('/') ? argv._[0] : `${process.cwd()}/${argv._[0]}`

let passed = 0
let failed = 0

fs.readdir(folder, { recursive: true, withFileTypes: true }, (err, entries) => {
  if (err) throw err

  const files = entries
    .filter(entry => entry.isFile())
    .map(entry => path.join(entry.path, entry.name))

  for (const file of files) {
    if (file.endsWith('.json')) {
      fs.readFile(file, 'utf8', (err, data) => {
        if (err) throw err
        try {
          jsonlint.parse(data)
          console.log(check, file)
          passed++
        }
        catch (e) {
          failed++
          console.error(cross, file, `\n\t${e.toString().split('\n').join('\n\t')}`)
        }
        if (passed+failed === files.length) {
          console.log('\n')
          console.log('  ', check, passed, 'valid files')
          console.log('  ', cross, failed, 'invalid files')
          console.log('\n')
          process.exit(failed)
        }
      })
    }
  }
})
