# Introduction

This project demonstrating how to initialize a pure front end project with mocha testing framework and istanbul coverage
tool.

## Usage

Since this is a `yeoman-webapp` project, it supports all grunt tasks provided by that generator, i.e.

### Developing

`grunt serve`: which enabled livereload for developing

### Testing

`grunt test`: run mocha test in console through phantomjs

`grunt serve:test`: serve the test index.html so that you can debug test inside browser. (Added)

### Coverage

`grunt coverage`: use istanbul to collect coverage results. (Added)

This requires some modifications from the original yeoman project:

0. replace `grunt-mocha` with `grunt-mocha-phantom-istanbul`
0. according to `grunt-mocha-phantom-istanbul`'s README, it does not instrument the source code, which is required by
   istanbul for collecting coverage data, so we need `grunt-istanbul` to manually instrument the source code
   
### Distribution

`grunt dist`: create distributions

# Credit

The example code in app and the example test code in test/spec both comes from Zhao Leiyu and Wang Anqi.
