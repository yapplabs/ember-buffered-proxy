/**
@module ember
*/

import Ember from 'ember';
import Mixin from '@ember/object/mixin';

import { aliasMethod, empty } from './helpers';
const { meta } = Ember;

import { isArray } from '@ember/array';
import { readOnly } from '@ember/object/computed';
import { keys as keysFill, create as createFill } from '@ember/polyfills';
import { get, set, getProperties, setProperties, defineProperty, notifyPropertyChange } from '@ember/object';

const keys = Object.keys || keysFill;
const create = Object.create || createFill;
const hasOwnProp = Object.prototype.hasOwnProperty;


const contentFor = (proxy) => {
  return get(proxy, 'content');
}

export default Mixin.create({

buffer: null,
hasBufferedChanges: false,

hasChanges: readOnly('hasBufferedChanges'),
applyChanges: aliasMethod('applyBufferedChanges'),
discardChanges : aliasMethod('discardBufferedChanges'),

init() {
  this.initializeBuffer(this);
  this._super(...arguments);
},

initializeBuffer(context, onlyTheseKeys) {
  var buffer;

  if(isArray(onlyTheseKeys) && !empty(onlyTheseKeys)) {
    buffer = get(context, 'buffer');
    onlyTheseKeys.forEach((key) => delete buffer[key]);
  }
  else {
    buffer = create(null);
    setProperties(context, { buffer, hasBufferedChanges: false })
  }
  return buffer;
},

unknownProperty(key) {
  const buffer = get(this, 'buffer');
  if(hasOwnProp.call(buffer, key)){
      return get(buffer, key)
  }
  return this._super(key);
},

setUnknownProperty(key, value) {
  let m = meta(this);
  const buffer = this.buffer || {},
  content = contentFor(this, m),
  current = content && get(content, key),
  isBufferProp = hasOwnProp.call(buffer, key),
  previous = isBufferProp ? buffer[key] : current;
  
  if (m.isInitializing() || m.isPrototypeMeta(this)) {
      // if marked as prototype or object is initializing then just
      // defineProperty rather than delegate
      defineProperty(this, key, null, value);
      return value;
  }

  if (previous === value) {
      return;
  }

  if (current === value) {
      delete buffer[key];
      if (empty(buffer)) {
        set(this, 'hasBufferedChanges', false);
      }
    } else {
      set(buffer, key, value)
      set(this, 'hasBufferedChanges', true);
  }

  if(isBufferProp){
      notifyPropertyChange(this, key);
  }else{
      notifyPropertyChange(content, key);
  }
  return value;
},

applyBufferedChanges(onlyTheseKeys) {
  const m = meta(this),
  content = contentFor(this, m);
  var buffer  = this.buffer,
  keysToSet = onlyTheseKeys || keys(buffer);
  
  setProperties(content, getProperties(this, ...keysToSet));
  
  buffer = this.initializeBuffer(this, onlyTheseKeys);

  if (empty(buffer)) {
    set(this, 'hasBufferedChanges', false);
  }
},

discardBufferedChanges(onlyTheseKeys) {
  var buffer = get(this, 'buffer'),
      changedKeys = keys(buffer);
      buffer = this.initializeBuffer(this, onlyTheseKeys);

  changedKeys.forEach((key) => {
    if (isArray(onlyTheseKeys) && onlyTheseKeys.indexOf(key) === -1) {
      return;
    }
    notifyPropertyChange(this, key);
  });

  if (empty(buffer)) {
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
}
});