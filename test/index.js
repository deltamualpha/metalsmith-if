var Metalsmith = require("metalsmith");
var msIf = require("..");
var exists = require("fs").existsSync;
var rm = require("fs").rmSync;
var read = require("fs").readFileSync;

var f = (_, m, d) => {
  m.metadata({ ran: true });
  d();
};

var prep = () => {
  rm("test/fixture/build", { recursive: true, force: true });
  rm("test/fixture/metalsmith.log", { force: true });
};

describe("metalsmith-if", function () {
  it("should pass through a function if the conditional is true", function (done) {
    prep();
    var m = Metalsmith("test/fixture").use(msIf(true, f));
    m.build(function (err, _) {
      if (err) return done(err);
      if (!exists("test/fixture/build"))
        return done(new Error("files not built"));
      if (!m.metadata().ran) return done(new Error("function not executed"));
      done();
    });
  });

  it("should not pass through a function if the conditional is false", function (done) {
    prep();
    var m = Metalsmith("test/fixture").use(msIf(false, f));
    m.build(function (err, _) {
      if (err) return done(err);
      if (!exists("test/fixture/build"))
        return done(new Error("files not built"));
      if (m.metadata().ran) return done(new Error("function executed"));
      done();
    });
  });

  it("should accept a function as the conditional", function (done) {
    prep();
    var m = Metalsmith("test/fixture").use(msIf(() => false, f));
    m.build(function (err, _) {
      if (err) return done(err);
      if (!exists("test/fixture/build"))
        return done(new Error("files not built"));
      if (m.metadata().ran) return done(new Error("function executed"));
      done();
    });
  });

  it("logs when debug is set", function (done) {
    prep();
    var m = Metalsmith("test/fixture")
      .env("DEBUG", "metalsmith-if")
      .env("DEBUG_LOG", "metalsmith.log")
      .use(msIf(false, f));
    m.build(function (err, _) {
      if (err) return done(err);
      if (!exists("test/fixture/build"))
        return done(new Error("files not built"));
      if (!exists("test/fixture/metalsmith.log"))
        return done(new Error("log not created"));
      if (!read("test/fixture/metalsmith.log").includes("Skipping plugin."))
        return done(new Error("info not logged"));
      if (m.metadata().ran) return done(new Error("function executed"));
      done();
    });
  });
});
