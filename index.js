#!/usr/bin/env node
var fs          = require('fs')
var readdir     = require('recursive-readdir')
var jsonlint    = require('jsonlint')
var colors      = require('colors')
var replaceall  = require('replaceall')
var argv        = require('minimist')(process.argv.slice(2))

const check = String.fromCharCode(0x2713).green
const cross = String.fromCharCode(0x2717).red

var folder = argv._[0].startsWith('/') ? argv._[0] : `${process.cwd()}/${argv._[0]}`

var passed = 0
var failed = 0

readdir(folder, (err, files) => {
    files.forEach(file => {
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
                    console.error(cross, file, `\n\t${replaceall('\n', '\n\t', e.toString())}`)
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
    })
})
