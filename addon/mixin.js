import Ember from 'ember';
import {
  aliasMethod,
  empty
} from './helpers';

const { get, set, isArray, computed, getProperties } = Ember;

const keys = Object.keys || Ember.keys;
const create = Object.create || Ember.create;
const hasOwnProp = Object.prototype.hasOwnProperty;

export default Ember.Mixin.create({
  buffer: null,
  hasBufferedChanges: false,
  
  hasChanges: computed.readOnly('hasBufferedChanges'),
  applyChanges: aliasMethod('applyBufferedChanges'),
  discardChanges : aliasMethod('discardBufferedChanges'),

  init() {
    this.initializeBuffer();
    set(this, 'hasBufferedChanges', false);
    this._super(...arguments);
  },

  initializeBuffer(onlyTheseKeys) {
    if(isArray(onlyTheseKeys) && !empty(onlyTheseKeys)) {
      onlyTheseKeys.forEach((key) => delete this.buffer[key]);
    }
    else {
      set(this, 'buffer', create(null));
    }
  },

  unknownProperty(key) {
    const buffer = get(this, 'buffer');

    return (hasOwnProp.call(buffer, key)) ? buffer[key] : this._super(key);
  },

  setUnknownProperty(key, value) {
    const { buffer, content } = getProperties(this, ['buffer', 'content']);
    let current;
    let previous;

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
        set(this, 'hasBufferedChanges', false);
      }
    } else {
      buffer[key] = value;
      set(this, 'hasBufferedChanges', true);
    }

    this.propertyDidChange(key);

    return value;
  },

  applyBufferedChanges(onlyTheseKeys) {
    const { buffer, content } = getProperties(this, ['buffer', 'content']);

    keys(buffer).forEach((key) => {
      if (isArray(onlyTheseKeys) && onlyTheseKeys.indexOf(key) === -1) {
        return;
      }

      set(content, key, buffer[key]);
    });

    this.initializeBuffer(onlyTheseKeys);

    if (empty(get(this, 'buffer'))) {
      set(this, 'hasBufferedChanges', false);
    }
  },

  discardBufferedChanges(onlyTheseKeys) {
    const buffer = get(this, 'buffer');

    this.initializeBuffer(onlyTheseKeys);

    keys(buffer).forEach((key) => {
      if (isArray(onlyTheseKeys) && onlyTheseKeys.indexOf(key) === -1) {
        return;
      }

      this.propertyWillChange(key);
      this.propertyDidChange(key);
    });

    if (empty(get(this, 'buffer'))) {
      set(this, 'hasBufferedChanges', false);
    }
  }
});
