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

    if (options.show) {
      this.show();
    }
  }

  createElement(options) {
    let today = new Date();
    let current = new EasyDate();
    let end = new EasyDate('+2m');
    let start = options.start || today;
    let range = options.end;
    let months = [];
    while (current.toDate() < end.toDate()) {
      months.push(this.createMonthObject(current, today, start, range));
      current.add('1m');
    }
    let data = {
      hasClose: options.hasClose,
      static: options.static,
      months: months
    };
    let item = $(template(data));
    item.appendTo(document.body);
    this.el = item;
  }

  createMonthObject(current, today) {
    return current.toObject(today);
  }

  confirm() {

  }

  delegateEvent() {
    this.el
      .on('click', 'li', event => {

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
};