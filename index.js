#!/usr/bin/env node
const { promises: fs } = require('fs')
const path = require('path')
const args = process.argv.slice(2)

const check = String.fromCharCode(0x2713)
const cross = String.fromCharCode(0x2717)

const inputFolder = args[0]

if (!inputFolder) {
  console.error('Usage: jsonlint-tree <folder>')
  process.exit(1)
}

const folder = path.resolve(inputFolder)

async function main () {
  const entries = await fs.readdir(folder, { recursive: true, withFileTypes: true })

  const files = entries
    .filter(entry => entry.isFile() && entry.name.endsWith('.json'))
    .map(entry => path.join(entry.parentPath ?? entry.path, entry.name))

  let passed = 0
  let failed = 0

  await Promise.all(files.map(async file => {
    try {
      const data = await fs.readFile(file, 'utf8')
      JSON.parse(data)
      console.log(check, file)
      passed++
    }
    catch (e) {
      failed++
      console.error(cross, file, `\n\t${e.toString().split('\n').join('\n\t')}`)
    }
  }))

  console.log('\n')
  console.log('  ', check, passed, 'valid files')
  console.log('  ', cross, failed, 'invalid files')
  console.log('\n')

  process.exit(failed > 0 ? 1 : 0)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
