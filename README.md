# jsonlint-tree

[jsonlint](https://www.npmjs.com/package/jsonlint) a directory recursively.

## Install

  npm i -g jsonlint-tree

## Usage

```sh
  $ jsonlint-tree myfolder
```

```text
✓ myfolder/a.json
✓ myfolder/path/b.json
✓ myfolder/path/to/c.json
✗ myfolder/path/to/d.json

   ✓ 3 valid files
   ✗ 1 invalid files
```

## Changelog

* 2.0.0
  * Remove extra dependencies
  * Require Node >=18.17.0

* 1.1.0 
  * It shows the number of valid and invalid files.

* 1.0.0 
  * Initial release :tada:

## License

[ISC License](http://opensource.org/licenses/ISC)
