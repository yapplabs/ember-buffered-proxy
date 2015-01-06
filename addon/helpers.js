var hasOwnProp = Object.prototype.hasOwnProperty;

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

export { aliasMethod, empty };
