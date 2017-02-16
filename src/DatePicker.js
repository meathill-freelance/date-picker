/**
 * Created by realm on 2017/2/15.
 */
import template from './template';
import EasyDate from './EasyDate';

const toString = Object.prototype.toString;
function isString(obj) {
  return toString.call(obj) === '[object ' + name + ']';
}

export default class DatePicker {
  constructor(target, options = {}) {
    this.target = target;
    this.createElement(options);
    this.delegateEvent();

    if (options.show) {
      this.show();
    }
  }

  createElement(options) {
    let today = new EasyDate(0, options);
    let start = options.start ? new EasyDate(options.start) : today;
    let end = options.end ? new EasyDate(options.end) : new EasyDate('+2m', options);
    let current = start.clone();
    let months = [];
    while (current <= end) {
      months.push(DatePicker.createMonthObject(current, today, start, end));
      current.add('1m');
    }
    let data = Object.assign({
      months: months
    }, options);
    let item = $(template(data));
    item.appendTo(document.body);
    this.el = item;
  }

  confirm() {

  }

  delegateEvent() {
    this.el
      .on('click', 'li:not(.disabled)', event => {

      })
      .on('click', '.close-button', event => {
        this.hide();
      })
      .on('click', '.confirm-button', event => {
        this.confirm();
      });
  }

  show() {
    this.el.removeClass('hide');
  }

  hide() {
    this.el.addClass('hide');
  }

  static createMonthObject(current, today, start, end) {
    start = isString(start) ? new EasyDate(start) : start;
    end = isString(end) ? new EasyDate(end) : end;
    return current.toObject(today, start, end);
  }
};