import Ember from 'ember';

var hasOwnProp = Object.prototype.hasOwnProperty;
var get = Ember.get;
var set = Ember.set;
var keys = Ember.keys;
var isArray = Ember.isArray;
var computed = Ember.computed;

function aliasMethod(methodName) {
  return function() {
    return this[methodName].apply(this, arguments);
  };
}

function empty(obj) {
  var key;
  for (key in obj) {
    if (!hasOwnProp.call(obj, key)) { continue; }
    return false;
  }
  return true;
}

export default Ember.Mixin.create({
  init: function() {
    this.initializeBuffer();
    this.hasBufferedChanges = false;
  },

  hasChanges: computed.readOnly('hasBufferedChanges'),

  initializeBuffer: function(onlyTheseKeys) {
    if(isArray(onlyTheseKeys) && !empty(onlyTheseKeys)) {
      onlyTheseKeys.forEach(function(key) {
        delete this.buffer[key];
      }, this);
    }
    else {
      this.buffer = {};
    }
  },

  unknownProperty: function(key) {
    var buffer = this.buffer;

    if (buffer.hasOwnProperty(key)) {
      return buffer[key];
    } else {
      return this._super(key);
    }
  },

  setUnknownProperty: function(key, value) {
    var buffer = this.buffer;
    var content = this.get('content');
    var current;

    if (content != null) {
      current = get(content, key);
    }

    var previous = buffer.hasOwnProperty(key) ? buffer[key] : current;

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
    var buffer = this.buffer;
    var content = this.get('content');

    keys(buffer).forEach(function(key) {
      if (isArray(onlyTheseKeys) && !onlyTheseKeys.contains(key)) {
        return;
      }

      set(content, key, buffer[key]);
    });

    this.initializeBuffer(onlyTheseKeys);

    if (empty(this.buffer)) {
      this.set('hasBufferedChanges', false);
    }
  },

  applyChanges: aliasMethod('applyBufferedChanges'),

  discardBufferedChanges: function(onlyTheseKeys) {
    var buffer = this.buffer;

    this.initializeBuffer(onlyTheseKeys);

    keys(buffer).forEach(function(key) {
      if (isArray(onlyTheseKeys) && !onlyTheseKeys.contains(key)) {
        return;
      }

      this.propertyWillChange(key);
      this.propertyDidChange(key);
    }, this);

    if (empty(this.buffer)) {
      this.set('hasBufferedChanges', false);
    }
  },

  discardChanges: aliasMethod('discardBufferedChanges'),
});
