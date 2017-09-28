const Depper = require('../src');
const tap = require('tap');
const path = require('path');

tap.test('depper', function (test) {
    test.plan(6);

    test.test('should handle relative resource', function (test) {
        let d = new Depper();
        let entry = path.join(__dirname, '/fixtures/relative-resource/index.html');

        let rows = [];

        d.on('data', function (row) {
            rows.push(row);
        });

        d.on('error', function (err) {
            test.fail();

            test.end();
        });

        d.on('finish', function () {
            test.same(rows.sort(), [
                path.join(__dirname, 'assets/lorem.png')
            ].sort());

            test.end();
        });

        d.end(entry);
    });

    test.test('should handle remote resource', function (test) {
        let d = new Depper();
        let entry = path.join(__dirname, '/fixtures/remote-resource/index.html');

        let rows = [];

        d.on('data', function (row) {
            rows.push(row);
        });

        d.on('error', function (err) {
            test.fail();

            test.end();
        });

        d.on('finish', function () {
            test.same(rows.sort(), [
                'http://lorem.ipsum/dolor.png'
            ].sort());

            test.end();
        });

        d.end(entry);
    });

    test.test('should handle absolute resource', function (test) {
        let d = new Depper();
        let entry = path.join(__dirname, '/fixtures/absolute-resource/index.html');

        let rows = [];

        d.on('missing', function (row) {
            rows.push(row);
        });

        d.on('error', function (err) {
            test.fail();

            test.end();
        });

        d.on('finish', function () {
            test.same(rows.sort(), [
                '/lorem/ipsum.png'
            ].sort());

            test.end();
        });

        d.end(entry);
    });

    test.test('should handle document with no resource', function (test) {
        let d = new Depper();
        let entry = path.join(__dirname, '/fixtures/no-resource/index.html');

        let rows = [];

        d.on('finish', function () {
            test.same(rows.sort(), [].sort());

            test.end();
        });

        d.end(entry);
    });

    test.test('should emit "missing" event', function (test) {
        let d = new Depper();
        let entry = path.join(__dirname, '/fixtures/missing-resource/index.html');

        let rows = [];

        d.on('missing', function (row) {
            rows.push(row);
        });

        d.on('error', function (err) {
            test.fail();

            test.end();
        });

        d.on('finish', function () {
            test.same(rows.sort(), [
                path.join(__dirname, 'assets/missing.png')
            ].sort());

            test.end();
        });

        d.end(entry);
    });

    test.test('should emit "error" event', function (test) {
        let d = new Depper();
        let entry = path.join(__dirname, '/fixtures/missing.html');

        let rows = [];

        d.on('error', function (err) {
            rows.push(err);
        });

        d.on('finish', function () {
            test.equal(rows.length, 1);
            test.equal(rows[0].file, path.join(__dirname, '/fixtures/missing.html'));
            test.ok(rows[0].error);

            test.end();
        });

        d.end(entry);
    });
});