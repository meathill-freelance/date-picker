/**
 * Created by realm on 2017/2/15.
 */
import {template, calendar} from './template';
import EasyDate from './EasyDate';

const toString = Object.prototype.toString;
function isString(obj) {
  return toString.call(obj) === '[object ' + name + ']';
}

export default class DatePicker {
  constructor(target, options = {}) {
    this.target = target;
    this.createElement(options);
    this.delegateEvent(options);

    if (options.show) {
      this.show();
    }
  }

  createElement(options) {
    let today = new EasyDate(0, options);
    let start = options.start ? new EasyDate(options.start) : today;
    let end = options.end ? new EasyDate(options.end) : null;
    let range = end || new EasyDate('+1m');
    let current = start.clone();
    let months = [];
    while (current <= range) {
      months.push(DatePicker.createMonthObject(current, today, start, end));
      current.add('1m');
    }
    let data = Object.assign({
      months: months
    }, options);
    let item = $(template(data));
    item.appendTo(document.body);
    this.$el = item;
    this.el = item[0];
    this.lastMonth = current;
  }

  confirm() {

  }

  delegateEvent(options) {
    this.$el
      .on('click', 'li:not(.disabled)', event => {

      })
      .on('click', '.close-button', event => {
        this.hide();
      })
      .on('click', '.confirm-button', event => {
        this.confirm();
      });

    if (!options.end) {
      this.$el.on('scroll', () => {
        if (this.el.scrollHeight - this.el.scrollTop <= this.el.offsetHeight + 10) {
          let item = calendar(this.lastMonth.toObject());
          this.$el.append(item);
          this.lastMonth.add('+1m');
        }
      });
    }
  }

  show() {
    this.$el.removeClass('hide');
  }

  hide() {
    this.$el.addClass('hide');
  }

  static createMonthObject(current, today, start, end) {
    start = isString(start) ? new EasyDate(start) : start;
    end = isString(end) ? new EasyDate(end) : end;
    return current.toObject(today, start, end);
  }
};