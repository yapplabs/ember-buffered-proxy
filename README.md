# Ember-buffered-proxy

A Ember Proxy the enables change buffering.

## Usage

```sh
npm install --save-dev ember-buffered-proxy
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
buffer.set('firstName.content', 'Stefan');
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




## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
