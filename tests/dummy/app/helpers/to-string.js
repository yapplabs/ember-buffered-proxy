import {helper} from '@ember/component/helper';

export function toString(params) {
  return JSON.stringify(params[0]);
}

export default helper(toString);
