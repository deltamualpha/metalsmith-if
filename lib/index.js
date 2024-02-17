function metalsmithIf(conditional, callback) {
  if (typeof conditional === "function" ? conditional() : conditional) {
    return callback;
  } else {
    return function (_, metalsmith, done) {
      metalsmith.debug("metalsmith-if")("Skipping plugin.");
      done();
    };
  }
}

module.exports = metalsmithIf;
