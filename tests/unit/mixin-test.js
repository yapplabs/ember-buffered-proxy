import Ember from 'ember';
import Mixin from 'ember-buffered-proxy/mixin';

module('ember-buffered-proxy/mixin');

test('exists', function() {
  ok(Mixin);
});

test('that it works', function() {
  var BufferedPorxy = Ember.ObjectProxy.extend(Mixin);

  var content = {
    baz: 1
  };

  var proxy = BufferedPorxy.create({
    content: content
  });

  equal(proxy.get('baz'), 1);
  equal(content.baz, 1);

  ok(!('foo' in content));
  equal(proxy.get('hasBufferedChanges'), false);

  proxy.set('foo', 1);

  equal(proxy.get('foo'), 1);
  ok(!('foo' in content));
  equal(proxy.get('hasBufferedChanges'), true);

  proxy.applyBufferedChanges();

  equal(proxy.get('foo'), 1);
  ok('foo' in content);
  equal(proxy.get('hasBufferedChanges'), false);
  equal(content.foo, 1);

  proxy.set('bar', 1);

  equal(proxy.get('foo'), 1);
  equal(proxy.get('bar'), 1);

  ok('foo' in content);
  ok(!('bar' in content));

  equal(proxy.get('hasBufferedChanges'), true);

  proxy.discardBufferedChanges();

  equal(proxy.get('foo'), 1);
  equal(proxy.get('bar'), undefined);

  ok('foo' in content);
  ok(!('bar' in content));

  equal(proxy.get('hasBufferedChanges'), false);

  equal(proxy.get('baz'), 1);
  equal(content.baz, 1);
});

test('that apply/discard only these keys works', function() {
  var BufferedPorxy = Ember.ObjectProxy.extend(Mixin);

  var content = {
    baz: 1,
    world: 'hello'
  };

  var proxy = BufferedPorxy.create({
    content: content
  });

  equal(proxy.get('baz'), 1);
  equal(content.baz, 1);
  equal(proxy.get('world'), 'hello');
  equal(content.world, 'hello');

  ok(!('foo' in content));
  equal(proxy.get('hasBufferedChanges'), false);

  proxy.set('foo', 1);

  equal(proxy.get('foo'), 1);
  ok(!('foo' in content));
  equal(proxy.get('hasBufferedChanges'), true);

  proxy.set('testing', '1234');

  equal(proxy.get('testing'), '1234');
  ok(!('testing' in content));
  equal(proxy.get('hasBufferedChanges'), true);

  proxy.applyBufferedChanges(['foo']);

  equal(proxy.get('foo'), 1);
  ok('foo' in content);
  ok(!('testing' in content));
  equal(proxy.get('hasBufferedChanges'), true);
  equal(content.foo, 1);
  equal(proxy.get('testing'), '1234');

  proxy.applyBufferedChanges(['testing']);

  equal(proxy.get('testing'), '1234');
  ok('testing' in content);
  equal(proxy.get('hasBufferedChanges'), false);
  equal(content.testing, '1234');

  // Testing discardBufferdChanges with onlyTheseKeys

  proxy.setProperties({
    bar: 2,
    example: 123
  });

  equal(proxy.get('foo'), 1);
  equal(proxy.get('bar'), 2);
  equal(proxy.get('example'), 123);

  ok('foo' in content);
  ok('testing' in content);
  ok(!('bar' in content));
  ok(!('example' in content));

  equal(proxy.get('hasBufferedChanges'), true);

  proxy.discardBufferedChanges(['bar']);

  equal(proxy.get('foo'), 1);
  equal(proxy.get('testing'), '1234');
  equal(proxy.get('bar'), undefined);
  equal(proxy.get('example'), 123);

  ok('foo' in content);
  ok('testing' in content);
  ok(!('bar' in content));
  ok(!('example' in content));
  equal(proxy.get('hasBufferedChanges'), true);

  proxy.discardBufferedChanges(['example']);

  equal(proxy.get('foo'), 1);
  equal(proxy.get('testing'), '1234');
  equal(proxy.get('bar'), undefined);
  equal(proxy.get('example'), undefined);

  ok('foo' in content);
  ok('testing' in content);
  ok(!('bar' in content));
  ok(!('example' in content));
  equal(proxy.get('hasBufferedChanges'), false);

  equal(proxy.get('baz'), 1);
  equal(content.baz, 1);
});

test('aliased methods work', function() {
  var BufferedProxy = Ember.ObjectProxy.extend(Mixin);

  var proxy = BufferedProxy.create({
    content: { property: 1 }
  });

  proxy.set('property', 2);
  ok(proxy.get('hasChanges'), 'Modified proxy has changes');

  proxy.applyChanges();
  equal(proxy.get('content.property'), 2, 'Applying changes sets the content\'s property');
  ok(!(proxy.get('hasChanges')), 'Proxy has no changes after changes are applied');

  proxy.set('baz', 3);
  proxy.discardChanges();
  equal(proxy.get('property'), 2, 'Discarding changes resets the proxy\'s property');
  ok(!(proxy.get('hasChanges')), 'Proxy has no changes after changes are discarded');
});
