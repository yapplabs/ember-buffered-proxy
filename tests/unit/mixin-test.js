import Mixin from 'ember-buffered-proxy/mixin';
import Ember from 'ember';

module("ember-buffered-proxy/mixin");

test("exists", function() { 
  ok(Mixin);
});

test("that it works", function() {
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
