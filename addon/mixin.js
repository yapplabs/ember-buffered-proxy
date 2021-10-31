/* eslint-disable ember/no-get */
/* eslint-disable ember/no-new-mixins */
import Ember from 'ember';
import Mixin from '@ember/object/mixin';
import { isArray } from '@ember/array';
import { readOnly } from '@ember/object/computed';
import {
  defineProperty,
  notifyPropertyChange,
  getProperties,
  set,
  get,
} from '@ember/object';

import { aliasMethod, empty } from './helpers';

const { meta } = Ember; // eslint-disable-line ember/new-module-imports
const hasOwnProp = Object.prototype.hasOwnProperty;

export default Mixin.create({
  buffer: null,
  hasBufferedChanges: false,

  hasChanges: readOnly('hasBufferedChanges'),
  applyChanges: aliasMethod('applyBufferedChanges'),
  discardChanges: aliasMethod('discardBufferedChanges'),

  init() {
    this.initializeBuffer();
    set(this, 'hasBufferedChanges', false);
    this._super(...arguments);
  },

  initializeBuffer(onlyTheseKeys) {
    if (isArray(onlyTheseKeys) && !empty(onlyTheseKeys)) {
      onlyTheseKeys.forEach((key) => delete this.buffer[key]);
    } else {
      set(this, 'buffer', Object.create(null));
    }
  },

  unknownProperty(key) {
    const buffer = get(this, 'buffer');

    return hasOwnProp.call(buffer, key) ? buffer[key] : this._super(key);
  },

  setUnknownProperty(key, value) {
    const m = meta(this);

    if (m.proto === this || (m.isInitializing && m.isInitializing())) {
      // if marked as prototype or object is initializing then just
      // defineProperty rather than delegate
      defineProperty(this, key, null, value);
      return value;
    }

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

    if (current === value) {
      delete buffer[key];
      if (empty(buffer)) {
        set(this, 'hasBufferedChanges', false);
      }
    } else {
      buffer[key] = value;
      set(this, 'hasBufferedChanges', true);
    }

    notifyPropertyChange(content, key);

    return value;
  },

  applyBufferedChanges(onlyTheseKeys) {
    const { buffer, content } = getProperties(this, ['buffer', 'content']);

    Object.keys(buffer).forEach((key) => {
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
    const { buffer, content } = getProperties(this, ['buffer', 'content']);

    this.initializeBuffer(onlyTheseKeys);

    Object.keys(buffer).forEach((key) => {
      if (isArray(onlyTheseKeys) && onlyTheseKeys.indexOf(key) === -1) {
        return;
      }

      notifyPropertyChange(content, key);
    });

    if (empty(get(this, 'buffer'))) {
      set(this, 'hasBufferedChanges', false);
    }
  },

  /*
   * Determines if a given key has changed else returns false. Allows individual key lookups where
   * as hasBufferedChanged only looks at the whole buffer.
   */
  hasChanged(key) {
    const { buffer, content } = getProperties(this, ['buffer', 'content']);

    if (typeof key !== 'string' || typeof get(buffer, key) === 'undefined') {
      return false;
    }

    if (get(buffer, key) !== get(content, key)) {
      return true;
    }

    return false;
  },
});
