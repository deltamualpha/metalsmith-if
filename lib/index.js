var debug = require('debug')('metalsmith-if');

function metalsmithIf (conditional, cb) {
  if (typeof conditional === 'function' ? conditional() : conditional) {
    return cb;
  } else {
    return function (files, metalsmith, done) {
      // noop
      debug("Skipping plugin.");
      done();
    };
  }
}

module.exports = metalsmithIf;
