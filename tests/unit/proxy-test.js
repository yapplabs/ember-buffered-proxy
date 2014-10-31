import Ember from 'ember';
import BufferedProxy from 'ember-buffered-proxy/proxy';
import BufferedMixin from 'ember-buffered-proxy/mixin';

module("ember-buffered-proxy/mixin");

test("exists", function() { 
  ok(BufferedProxy);
});

test("that appears correct", function() {
  ok(BufferedMixin.detect( BufferedProxy.create()));
});
