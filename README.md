# ember-buffered-proxy [![Build Status](https://travis-ci.org/yapplabs/ember-buffered-proxy.svg?branch=master)](https://travis-ci.org/yapplabs/ember-buffered-proxy)

An Ember Object Proxy (and mixin) that enables change buffering. Ever need to "hold back" property changes before they propagate? If so, this may be the addon for you.

## Usage

```sh
ember install ember-buffered-proxy
```

```js
import BufferedProxy from 'ember-buffered-proxy/proxy';

var content = {
  firstName: 'stefan'
};

var buffer = BufferedProxy.create({
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

var content = {
  firstName: 'stefan'
};

var buffer = ObjectProxy.extend(BufferedMixin).create({
  content: content
});

// same as above
```


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.8 or above
* Ember CLI v3.8 or above
* Node.js v8 or above

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
