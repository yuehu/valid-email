
var d = document;
var REGEX = /^([a-z0-9!#$%&'*+\/=?^_`{|.}~-]+@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)$/i;
var MAILGUN_URL = "https://api.mailgun.net/v2/address/validate";

function valid(email, cb) {
  if (!REGEX.test(email)) {
    cb && cb({
      valid: false,
      hint: null
    });
  } else if (valid.MAILGUN_KEY) {
    remoteValid(email, function(res) {
      cb && cb({
        valid: res.is_valid,
        hint: res.did_you_mean
      });
    });
  } else {
    cb && cb({
      valid: true,
      hint: null
    });
  }
}

// Default public key from mailgun demo
// http://mailgun.github.io/validator-demo/
valid.MAILGUN_KEY = 'pubkey-5ogiflzbnjrljiky49qxsiozqef5jxp7';

/**
 * Use mailgun API to validate email.
 */

function remoteValid(email, cb) {
  var name = 'valid_email_' + new Date().valueOf();
  window[name] = function(res) {
    cb(res);
    delete window[name];
  };

  // timeout in 1.5s
  var timer = setTimeout(function() {
    cb({is_valid: true, did_you_mean: null});
  }, 1500);

  var script = d.createElement('script');
  var url = MAILGUN_URL + '?callback=' + name + '&api_key=' + valid.MAILGUN_KEY;
  script.src = url + '&address=' + encodeURIComponent(email);
  script.onload = function() {
    clearTimeout(timer);
    d.body.removeChild(script);
  };
  d.body.appendChild(script);
}

module.exports = valid;
