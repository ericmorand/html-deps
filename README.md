# html-deps
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]

Walk the dependency graph of an HTML document.

## Installation

```bash
npm install html-deps
```

# Example

``` js
var HTMLDeps = require('html-deps');

var depper = new HTMLDeps();
var entry = '/path/to/your/document.html';

depper.on('data', function (dependency) {
    // do something with dependency
});

depper.on('missing', function (dependency) {
    // do something with missing dependency
});

depper.on('error', function (error) {
    // do something on error
});

depper.on('finish', function (error) {
    // do something when done
});

d.end(entry);
```

## Contributing

* Fork the main repository
* Code
* Implement tests using [node-tap](https://github.com/tapjs/node-tap)
* Issue a pull request keeping in mind that all pull requests must reference an issue in the issue queue

## License

Apache-2.0 © [Eric MORAND]()

[npm-image]: https://badge.fury.io/js/html-deps.svg
[npm-url]: https://npmjs.org/package/html-deps
[travis-image]: https://travis-ci.org/ericmorand/html-deps.svg?branch=master
[travis-url]: https://travis-ci.org/ericmorand/html-deps
[daviddm-image]: https://david-dm.org/ericmorand/html-deps.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/ericmorand/html-deps
[coveralls-image]: https://coveralls.io/repos/github/ericmorand/html-deps/badge.svg
[coveralls-url]: https://coveralls.io/github/ericmorand/html-deps