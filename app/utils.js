/**
 * Created by realm on 2017/3/1.
 */

const toString = Object.prototype.toString;

module.exports = {
  isString(obj) {
    return toString.call(obj) === '[object ' + name + ']';
  }
};