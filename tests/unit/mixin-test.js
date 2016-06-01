import Ember from 'ember';
import Mixin from 'ember-buffered-proxy/mixin';
import {
  module,
  test
} from 'qunit';

const { get, set } = Ember;

module('ember-buffered-proxy/mixin');

test('that it works', (assert) => {
  const BufferedPorxy = Ember.ObjectProxy.extend(Mixin);
  const content = { baz: 1 };

  const proxy = BufferedPorxy.create({ content });

  assert.equal(get(proxy, 'baz'), 1);
  assert.equal(get(content, 'baz'), 1);

  assert.ok(!('foo' in content));
  assert.equal(get(proxy, 'hasBufferedChanges'), false);

  set(proxy, 'foo', 1);

  assert.equal(get(proxy, 'foo'), 1);
  assert.ok(!('foo' in content));
  assert.equal(get(proxy, 'hasBufferedChanges'), true);

  proxy.applyBufferedChanges();

  assert.equal(get(proxy, 'foo'), 1);
  assert.ok('foo' in content);
  assert.equal(get(proxy, 'hasBufferedChanges'), false);
  assert.equal(get(content, 'foo'), 1);

  set(proxy, 'bar', 1);

  assert.equal(get(proxy, 'foo'), 1);
  assert.equal(get(proxy, 'bar'), 1);

  assert.ok('foo' in content);
  assert.ok(!('bar' in content));

  assert.equal(get(proxy, 'hasBufferedChanges'), true);

  proxy.discardBufferedChanges();

  assert.equal(get(proxy, 'foo'), 1);
  assert.equal(get(proxy, 'bar'), undefined);

  assert.ok('foo' in content);
  assert.ok(!('bar' in content));

  assert.equal(get(proxy, 'hasBufferedChanges'), false);

  assert.equal(get(proxy, 'baz'), 1);
  assert.equal(get(content, 'baz'), 1);
});

test('that apply/discard only these keys works', (assert) => {
  const BufferedPorxy = Ember.ObjectProxy.extend(Mixin);
  const content = { baz: 1, world: 'hello' };

  const proxy = BufferedPorxy.create({ content });

  assert.equal(get(proxy, 'baz'), 1);
  assert.equal(get(content, 'baz'), 1);
  assert.equal(get(proxy, 'world'), 'hello');
  assert.equal(get(content, 'world'), 'hello');

  assert.ok(!('foo' in content));
  assert.equal(get(proxy, 'hasBufferedChanges'), false);

  set(proxy, 'foo', 1);

  assert.equal(get(proxy, 'foo'), 1);
  assert.ok(!('foo' in content));
  assert.equal(get(proxy, 'hasBufferedChanges'), true);

  set(proxy, 'testing', '1234');

  assert.equal(get(proxy, 'testing'), '1234');
  assert.ok(!('testing' in content));
  assert.equal(get(proxy, 'hasBufferedChanges'), true);

  proxy.applyBufferedChanges(['foo']);

  assert.equal(get(proxy, 'foo'), 1);
  assert.ok('foo' in content);
  assert.ok(!('testing' in content));
  assert.equal(get(proxy, 'hasBufferedChanges'), true);
  assert.equal(get(content, 'foo'), 1);
  assert.equal(get(proxy, 'testing'), '1234');

  proxy.applyBufferedChanges(['testing']);

  assert.equal(get(proxy, 'testing'), '1234');
  assert.ok('testing' in content);
  assert.equal(get(proxy, 'hasBufferedChanges'), false);
  assert.equal(get(content, 'testing'), '1234');

  // Testing discardBufferdChanges with onlyTheseKeys

  proxy.setProperties({ bar: 2, example: 123 });

  assert.equal(get(proxy, 'foo'), 1);
  assert.equal(get(proxy, 'bar'), 2);
  assert.equal(get(proxy, 'example'), 123);

  assert.ok('foo' in content);
  assert.ok('testing' in content);
  assert.ok(!('bar' in content));
  assert.ok(!('example' in content));

  assert.equal(get(proxy, 'hasBufferedChanges'), true);

  proxy.discardBufferedChanges(['bar']);

  assert.equal(get(proxy, 'foo'), 1);
  assert.equal(get(proxy, 'testing'), '1234');
  assert.equal(get(proxy, 'bar'), undefined);
  assert.equal(get(proxy, 'example'), 123);

  assert.ok('foo' in content);
  assert.ok('testing' in content);
  assert.ok(!('bar' in content));
  assert.ok(!('example' in content));
  assert.equal(get(proxy, 'hasBufferedChanges'), true);

  proxy.discardBufferedChanges(['example']);

  assert.equal(get(proxy, 'foo'), 1);
  assert.equal(get(proxy, 'testing'), '1234');
  assert.equal(get(proxy, 'bar'), undefined);
  assert.equal(get(proxy, 'example'), undefined);

  assert.ok('foo' in content);
  assert.ok('testing' in content);
  assert.ok(!('bar' in content));
  assert.ok(!('example' in content));
  assert.equal(get(proxy, 'hasBufferedChanges'), false);

  assert.equal(get(proxy, 'baz'), 1);
  assert.equal(get(content, 'baz'), 1);
});

test('aliased methods work', (assert) => {
  const BufferedProxy = Ember.ObjectProxy.extend(Mixin);
  const proxy = BufferedProxy.create({
    content: { property: 1 }
  });

  set(proxy, 'property', 2);
  assert.ok(get(proxy, 'hasChanges'), 'Modified proxy has changes');

  proxy.applyChanges();
  assert.equal(get(proxy, 'content.property'), 2, 'Applying changes sets the content\'s property');
  assert.ok(!(get(proxy, 'hasChanges')), 'Proxy has no changes after changes are applied');

  set(proxy, 'baz', 3);
  proxy.discardChanges();
  assert.equal(get(proxy, 'property'), 2, 'Discarding changes resets the proxy\'s property');
  assert.ok(!(get(proxy, 'hasChanges')), 'Proxy has no changes after changes are discarded');
});
