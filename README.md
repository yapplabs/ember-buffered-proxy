# ember-buffered-proxy

[![Build Status](https://github.com/yapplabs/ember-buffered-proxy/actions/workflows/ci.yml/badge.svg)](https://github.com/yapplabs/ember-buffered-proxy/actions/workflows/ci.yml)
[![Ember Observer Score](https://emberobserver.com/badges/ember-buffered-proxy.svg)](https://emberobserver.com/addons/ember-buffered-proxy)


An Ember Object Proxy (and mixin) that enables change buffering. Ever need to "hold back" property changes before they propagate? If so, this may be the addon for you.

## Usage

```sh
ember install ember-buffered-proxy
```

```js
import BufferedProxy from 'ember-buffered-proxy/proxy';

let content = {
  firstName: 'stefan'
};

let buffer = BufferedProxy.create({
  content: content
});

buffer.get('firstName'); // => 'stefan'
buffer.set('firstName', 'Kris');

buffer.get('firstName'); // => 'Kris'
buffer.get('content.firstName'); // => 'stefan'

buffer.get('hasChanges'); // => true
buffer.buffer; // => (get an object describing changed keys) -- {"firstName": "Kris"}

buffer.applyBufferedChanges();

buffer.get('firstName'); // => 'Kris'
buffer.get('content.firstName'); // => 'Kris'
buffer.get('hasChanges'); // => false

buffer.set('firstName', 'Luke');
buffer.get('firstName'); // => 'Luke'
buffer.get('content.firstName'); // => 'Kris'
buffer.hasChanged('firstName'); // => true

buffer.discardBufferedChanges();

buffer.get('firstName'); // => 'Kris'
buffer.get('content.firstName'); // => 'Kris'
buffer.hasChanged('firstName'); // => false

// Below demonstrates that applyBufferedChanges and discardBufferedChanges
// can take an optional array of keys.

buffer.set('email', 'example@example.com');
buffer.get('email'); // => 'example@example.com'
buffer.get('content.email'); // => undefined

buffer.set('address', '123 paradise road');
buffer.get('address'); // => '123 paradise road'
buffer.get('content.address'); // => undefined

buffer.applyBufferedChanges(['email']); // Only apply the email from the buffer

buffer.get('email'); // => 'example@example.com'
buffer.get('address'); // => '123 paradise road'
buffer.get('content.email'); // => 'example@example.com'
buffer.get('content.address'); // => undefined

buffer.setProperties({
  email: 'sample@sample.com',
  address: '1717 rose street'
});

buffer.discardBufferedChanges(['address']); // Discard only the address property from the buffer

buffer.get('email'); // => sample@sample.com
buffer.get('address'); // => undefined
```

You can also use these shorter method names

```js
buffer.discardChanges(); // equivalent to buffer.discardBufferedChanges()
buffer.applyChanges();   // equivalent to buffer.applyBufferedChanges()
```

Or you can grab the mixin directly

```js
import BufferedMixin from 'ember-buffered-proxy/mixin';

let content = {
  firstName: 'stefan'
};

let buffer = ObjectProxy.extend(BufferedMixin).create({
  content: content
});

// same as above
```


Compatibility
------------------------------------------------------------------------------

| Version | Minimal Ember version required |
| --- | --- |
| > 2.1.0 | 3.13 |
| > 1.0.1 | 3.8 |
| 0.8.0 - 1.0.1 | 2.15 |
| < 0.8 | 2.5 |

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
