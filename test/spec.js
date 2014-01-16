
describe('valid-email', function() {
  var valid = require('valid-email');

  function assert(a) {
    if (!a) {
      throw new Error('invalid');
    }
  }

  it('should be invalid', function(done) {
    valid('@example.com', function(res) {
      assert(!res.valid);
      done();
    });
  });

  it('should be invalid with remote', function(done) {
    valid('john@gmail.com', function(res) {
      assert(!res.valid);
      done();
    });
  });

  it('should has hint', function(done) {
    valid('johnson@gail.com', function(res) {
      if (res.hint !== 'johnson@gmail.com') {
        throw new Error('hint error');
      }
      done();
    });
  });
});
