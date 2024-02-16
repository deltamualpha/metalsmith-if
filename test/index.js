var assert = require("assert");
var exists = require("fs").existsSync;
var Metalsmith = require("metalsmith");
var msIf = require("..");

var f = (_, m, d) => {
  m.metadata({ ran: true });
  d();
};

describe("metalsmith-if", function () {
  it("should pass through a function if the conditional is true", function (done) {
    var m = Metalsmith("test/fixture").use(msIf(true, f));
    m.build(function (err, _) {
      if (err) throw err;
      assert(exists("test/fixture/build"));
      assert(m.metadata().ran);
      done();
    });
  });

  it("should not pass through a function if the conditional is false", function (done) {
    var m = Metalsmith("test/fixture").use(msIf(false, f));
    m.build(function (err, _) {
      if (err) throw err;
      assert(exists("test/fixture/build"));
      assert(!m.metadata().ran);
      done();
    });
  });

  it("should accept a function as the conditional", function (done) {
    var m = Metalsmith("test/fixture").use(msIf(() => false, f));
    m.build(function (err, _) {
      if (err) throw err;
      assert(exists("test/fixture/build"));
      assert(!m.metadata().ran);
      done();
    });
  });
});
