#!/usr/bin/env node
const { promises: fs } = require('fs')
const path = require('path')

const check = String.fromCharCode(0x2713)
const cross = String.fromCharCode(0x2717)

async function main (sourceDir) {
  const sourcePath = path.resolve(sourceDir)
  const entries = await fs.readdir(sourcePath, { recursive: true, withFileTypes: true })

  const jsonFiles = entries
    .filter(entry => entry.isFile() && entry.name.endsWith('.json'))
    .map(entry => path.join(entry.parentPath ?? entry.path, entry.name))

  let passed = 0
  let failed = 0

  await Promise.all(jsonFiles.map(async file => {
    try {
      const data = await fs.readFile(file, 'utf8')
      JSON.parse(data)
      console.log(check, file)
      passed++
    }
    catch (err) {
      failed++
      console.error(cross, file, `\n\t${err.toString().split('\n').join('\n\t')}`)
    }
  }))

  console.log('\n')
  console.log('  ', check, passed, 'valid files')
  console.log('  ', cross, failed, 'invalid files')
  console.log('\n')

  process.exit(failed > 0 ? 1 : 0)
}

if (process.argv.length < 3) {
  console.error('Usage: jsonlint-tree <directory>')
  process.exit(1)
}

main(...process.argv.slice(2)).catch(err => {
  console.error(err)
  process.exit(1)
})
