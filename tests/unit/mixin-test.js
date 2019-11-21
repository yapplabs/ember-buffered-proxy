import ObjectProxy from '@ember/object/proxy';
import EmberObject, { set, get } from '@ember/object';
import Mixin from 'ember-buffered-proxy/mixin';
import {
  module,
  test
} from 'qunit';

module('ember-buffered-proxy/mixin', function() {
  test('that it works', (assert) => {
    const BufferedProxy = ObjectProxy.extend(Mixin);
    const content = {
      baz: 1,
      notifyPropertyChange() {}
    };

    const proxy = BufferedProxy.create({ content });

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
    const BufferedProxy = ObjectProxy.extend(Mixin);
    const content = {
      baz: 1,
      world: 'hello',
      notifyPropertyChange() {}
    };
    const proxy = BufferedProxy.create({ content });

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
    const BufferedProxy = ObjectProxy.extend(Mixin);
    const proxy = BufferedProxy.create({
      content: {
        property: 1,
        notifyPropertyChange() {}
      }
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

  test('allows passing other variables at .create time', (assert) => {
    const BufferedProxy = ObjectProxy.extend(Mixin);
    const fakeContainer = EmberObject.create({});

    const proxy = BufferedProxy.create({
      content: {
        property: 1,
        notifyPropertyChange() {}
      },
      container: fakeContainer,
      foo: 'foo',
    });

    assert.equal(proxy.get('container'), fakeContainer, 'Proxy didn\'t allow defining container property at create time');
    assert.equal(proxy.get('foo'), 'foo', 'Proxy didn\'t allow setting an arbitrary value at create time');
  });

  test('that .hasChanged() works', (assert) => {
    const BufferedProxy = ObjectProxy.extend(Mixin);
    const content = {
      notifyPropertyChange() {}
    };

    const proxy = BufferedProxy.create({ content });

    set(proxy, 'foo', 1);

    assert.equal(proxy.hasChanged('foo'), true);
    assert.equal(proxy.hasChanged('bar'), false);

    set(proxy, 'bar', 1);

    assert.equal(proxy.hasChanged('foo'), true);
    assert.equal(proxy.hasChanged('bar'), true);

    proxy.applyBufferedChanges(['bar']);

    set(proxy, 'foobar', false);

    assert.equal(proxy.hasChanged('foo'), true);
    assert.equal(proxy.hasChanged('bar'), false);
    assert.equal(proxy.hasChanged('foobar'), true);

    proxy.applyBufferedChanges();

    assert.equal(proxy.hasChanged('foo'), false);
    assert.equal(proxy.hasChanged('bar'), false);
    assert.equal(proxy.hasChanged('foobar'), false);

    assert.equal(proxy.hasChanged(), false, 'Not passing a key returns false');
    assert.equal(proxy.hasChanged('baz'), false, 'If the key does not exist on the proxy then return false');
  });
});
