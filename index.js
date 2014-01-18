
var d = document;
var REGEX = /^.+@[^.].*\.[a-z]{2,10}$/i;
var BASEURI = "https://api.mailgun.net/v2/address/validate";

function valid(email, cb) {
  if (!REGEX.test(email)) {
    cb && cb({
      valid: false,
      hint: null
    });
  } else if (valid.mailgunKey) {
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
valid.mailgunKey = 'pubkey-5ogiflzbnjrljiky49qxsiozqef5jxp7';

/**
 * Use mailgun API to validate email.
 */

function remoteValid(email, cb) {
  var name = 'valid_email_' + new Date().valueOf();
  window[name] = function(res) {
    cb(res);
    delete window[name];
  };

  var script = d.createElement('script');
  var url = BASEURI + '?callback=' + name + '&api_key=' + valid.mailgunKey;
  script.src = url + '&address=' + encodeURIComponent(email);
  script.onload = function() {
    d.body.removeChild(script);
  };
  d.body.appendChild(script);
}

module.exports = valid;
