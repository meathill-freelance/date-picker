/**
 * Created by realm on 2017/2/15.
 */
import template from './template';
import EasyDate from './EasyDate';

export default class DatePicker {
  constructor(target, options = {}) {
    this.target = target;
    this.createElement(options);
    this.delegateEvent();

    if (options.isStatic) {
      this.el.addClass('static');
    }
    if (options.show) {
      this.show();
    }
  }

  createElement(options) {
    let today = new Date();
    let current = new EasyDate();
    let end = new EasyDate('+1m');
    let months = [];
    while (current < end) {
      months.push(this.createMonthObject(current, today));
      current.add('1m');
    }
    let data = {
      hasClose: options.hasClose,
      months: months
    };
    let item = $(template(data));
    item.appendTo(document.body);
    this.el = item;
  }

  createMonthObject(current) {
    return current.toObject();
  }

  delegateEvent() {
    this.el
      .on('click', 'li', event => {

      })
      .on('click', '.close-button', event => {
        this.hide();
      });
  }

  show() {
    this.el.removeClass('hide');
  }

  hide() {
    this.el.addClass('hide');
  }
};