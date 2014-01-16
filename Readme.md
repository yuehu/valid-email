
# valid-email

Valid an Email Address.

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
