# jsonlint-tree

Validate JSON files in a directory recursively

## Install

```sh
  npm i -g jsonlint-tree
```

## Usage

```sh
  jsonlint-tree directory
```

```text
✓ directory/a.json
✓ directory/path/b.json
✓ directory/path/to/c.json
✗ directory/path/to/d.json

   ✓ 3 valid files
   ✗ 1 invalid files
```

## Changelog

* 3.0.0
  * Exit code is now `1` on any failure
  * Drop `jsonlint` dependency, it validates with a plain `JSON.parse` now
  * Fix dir paths for NodeJS 24+
  * Fix the summary not printing when non-json files are present

* 2.0.0
  * Remove extra dependencies
  * Require Node >=18.17.0

* 1.1.0 
  * It shows the number of valid and invalid files.

* 1.0.0 
  * Initial release :tada:

## License

[ISC License](http://opensource.org/licenses/ISC)
