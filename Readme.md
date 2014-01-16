
# valid-email

Valid an Email Address.

[![Build Status](https://travis-ci.org/yuehu/valid-email.png?branch=master)](https://travis-ci.org/yuehu/valid-email)

## Installation

Install with [component(1)](http://component.io):

    $ component install yuehu/valid-email

## API

The validation is async.

```js
var valid = require('valid-email');
valid(email, function(res) {
    // res.valid ?
    // res.hint
});
```

## License

MIT
