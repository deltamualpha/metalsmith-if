var debug = require("debug")("metalsmith-if");

function metalsmithIf(conditional, callback) {
  if (typeof conditional === "function" ? conditional() : conditional) {
    return callback;
  } else {
    return function (_, _, done) {
      debug("Skipping plugin.");
      done();
    };
  }
}

module.exports = metalsmithIf;
