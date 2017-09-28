const fs = require('fs');
const path = require('path');
const Transform = require('stream').Transform;
const HtmlParser = require('htmlparser2');
const Url = require('url');

class Depper extends Transform {
    constructor(options) {
        options = options || {};
        options.objectMode = true;

        super(options);
    }

    _transform(chunk, encoding, callback) {
        let self = this;
        let file = chunk;

        let processDependency = function (dependency) {
            let url = Url.parse(dependency);

            // if the url host is set, it is a remote uri
            if (url.host) {
                self.push(dependency);
            }
            else {
                if (!path.isAbsolute(dependency)) {
                    dependency = path.resolve(path.join(path.dirname(file), dependency));
                }

                try {
                    fs.statSync(dependency);

                    self.push(dependency);
                }
                catch (err) {
                    self.emit('missing', dependency, file);
                }
            }
        };

        let parser = new HtmlParser.Parser({
            onopentag: function (name, attributes) {
                if (attributes.src) {
                    processDependency(attributes.src);
                }
            }
        });

        let resolve = function () {
            let data = fs.readFileSync(file);

            parser.write(data);
            parser.end();
        };

        try {
            resolve();

            callback();
        }
        catch (err) {
            callback({
                file: file,
                error: err
            });
        }
    }
}

module.exports = Depper;