const { resolve, dirname } = require("path");
const exists = require("fs").existsSync;

function metalsmithIf(arg, callback) {
  // if we're running directly, we have a callback provided and can just substitute that for ourselves.
  if (callback !== undefined && (typeof arg === "function" ? arg() : arg)) {
    return callback;
  } else {
    return function (files, metalsmith, done) {
      // at runtime, check if we're being run via the CLI and, if given a "true" as our first argument,
      // dynamically resolve, require, and call the plugin to be substituted
      if (metalsmith.env("cli") && arg[0]) {
        try {
          var name = arg[1];
          // see buildCommand in the Metalsmith bin file
          const dir = process.cwd();
          const local = resolve(dirname(dir), name);
          const npm = resolve(dirname(dir), "node_modules", name);

          if (exists(local) || exists(`${local}.js`)) {
            mod = require(local);
          } else if (exists(npm)) {
            mod = require(npm);
          } else {
            mod = require(name);
          }
        } catch (e) {
          throw new Error(`failed to require plugin "${name}".`);
        }
        // call the newly-imported plugin with the arguments we were provided.
        mod(...arg.slice(2))(files, metalsmith, done);
      } else {
        // or, if we didn't get swapped out, debug-log that we're now a no-op.
        metalsmith.debug("metalsmith-if")("Skipping plugin.");
        done();
      }
    };
  }
}

module.exports = metalsmithIf;
