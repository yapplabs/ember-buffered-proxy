import Ember from 'ember';
import {
  aliasMethod,
  empty
} from './helpers';

var get        = Ember.get;
var set        = Ember.set;
var keys       = Object.keys || Ember.keys;
var create     = Object.create || Ember.create;
var isArray    = Ember.isArray;
var computed   = Ember.computed;

var hasOwnProp = Object.prototype.hasOwnProperty;

export default Ember.Mixin.create({
  hasChanges     : computed.readOnly('hasBufferedChanges'),
  applyChanges   : aliasMethod('applyBufferedChanges'),
  discardChanges : aliasMethod('discardBufferedChanges'),

  init: function() {
    this.initializeBuffer();
    this.hasBufferedChanges = false;
    this._super.apply(this, arguments);
  },

  initializeBuffer: function(onlyTheseKeys) {
    if(isArray(onlyTheseKeys) && !empty(onlyTheseKeys)) {
      onlyTheseKeys.forEach(function(key) {
        delete this.buffer[key];
      }, this);
    }
    else {
      this.buffer = create(null);
    }
  },

  unknownProperty: function(key) {
    var buffer = this.buffer;

    if (hasOwnProp.call(buffer, key)) {
      return buffer[key];
    } else {
      return this._super(key);
    }
  },

  setUnknownProperty: function(key, value) {
    var buffer  = this.buffer;
    var content = this.get('content');
    var current;
    var previous;

    if (content != null) {
      current = get(content, key);
    }

    previous = hasOwnProp.call(buffer, key) ? buffer[key] : current;

    if (previous === value) {
      return;
    }

    this.propertyWillChange(key);

    if (current === value) {
      delete buffer[key];
      if (empty(buffer)) {
        this.set('hasBufferedChanges', false);
      }
    } else {
      buffer[key] = value;
      this.set('hasBufferedChanges', true);
    }

    this.propertyDidChange(key);

    return value;
  },

  applyBufferedChanges: function(onlyTheseKeys) {
    var buffer  = this.buffer;
    var content = this.get('content');

    keys(buffer).forEach(function(key) {
      if (isArray(onlyTheseKeys) && !Ember.A(onlyTheseKeys).contains(key)) {
        return;
      }

      set(content, key, buffer[key]);
    });

    this.initializeBuffer(onlyTheseKeys);

    if (empty(this.buffer)) {
      this.set('hasBufferedChanges', false);
    }
  },

  discardBufferedChanges: function(onlyTheseKeys) {
    var buffer = this.buffer;

    this.initializeBuffer(onlyTheseKeys);

    keys(buffer).forEach(function(key) {
      if (isArray(onlyTheseKeys) && !Ember.A(onlyTheseKeys).contains(key)) {
        return;
      }

      this.propertyWillChange(key);
      this.propertyDidChange(key);
    }, this);

    if (empty(this.buffer)) {
      this.set('hasBufferedChanges', false);
    }
  }
});
