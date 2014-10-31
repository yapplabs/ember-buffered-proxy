import Ember from 'ember';

var hasOwnProp = Object.prototype.hasOwnProperty;
var get = Ember.get;
var set = Ember.set;

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

  initializeBuffer: function() {
    this.buffer = {};
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

  applyBufferedChanges: function() {
    var buffer = this.buffer;
    var content = this.get('content');

    Ember.keys(buffer).forEach(function(key) {
      set(content, key, buffer[key]);
    });

    this.initializeBuffer();
    this.set('hasBufferedChanges', false);
  },

  discardBufferedChanges: function() {
    var buffer = this.buffer;

    this.initializeBuffer();

    Ember.keys(buffer).forEach(function(key) {
      this.propertyWillChange(key);
      this.propertyDidChange(key);
    }, this);

    this.set('hasBufferedChanges', false);
  }
});
