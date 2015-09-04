var debug = require('debug')('metalsmith-if');

function metalsmithIf (conditional, cb, env) {
  if (typeof conditional === 'function' ? conditional(env) : conditional) {
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
