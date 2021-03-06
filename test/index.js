var assert = require('assert');
var exists = require('fs').existsSync;
var Metalsmith = require('metalsmith');
var msIf = require('..');

var ran = function() {
  return function(files, metalsmith, done) {
    metalsmith.metadata().ran = true;
    done();
  };
};

describe('metalsmith-if', function(){
  it('should pass through a function if the conditional is true', function(done){
    var m = Metalsmith('test/fixture')
      .use(msIf(
        true,
        ran()
      ));
    m.build(function(err){
      if (err) { console.log(err); }
      assert(exists('test/fixture/build'));
      assert(m.metadata().ran);
      done();
    });
  });

  it('should not pass through a function if the conditional is false', function(done){
    var m = Metalsmith('test/fixture')
      .use(msIf(
        false,
        ran()
      ));
    m.build(function(err){
      if (err) { console.log(err); }
      assert(exists('test/fixture/build'));
      assert(!m.metadata().ran);
      done();
    });
  });

  var envTester = function(){
    return false;
  };

  it('should accept a function as the conditional', function(done){
    var m = Metalsmith('test/fixture')
      .use(msIf(
        envTester,
        ran()
      ));
    m.build(function(err){
      if (err) { console.log(err); }
      assert(exists('test/fixture/build'));
      assert(!m.metadata().ran);
      done();
    });
  });
});
