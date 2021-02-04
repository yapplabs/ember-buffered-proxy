const hasOwnProp = Object.prototype.hasOwnProperty;

export function aliasMethod(methodName) {
  return function () {
    return this[methodName].apply(this, arguments);
  };
}

export function empty(obj) {
  let key;
  for (key in obj) {
    if (!hasOwnProp.call(obj, key)) {
      continue;
    }
    return false;
  }
  return true;
}
