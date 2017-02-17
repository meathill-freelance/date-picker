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
  /**
   *
   * @param target
   * @param {Object} options
   *    @param {Boolean|null} options.confirm 是否有确认按钮
   *    @param {Boolean|null} options.show 是否直接显示
   *    @param {Boolean|null} options.scattered 是否选择单日
   */
  constructor(target, options = {}) {
    this.target = target;
    if ('scattered' in options && !('hasConfirm' in options)) {
      options.confirm = options.scattered;
    }
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
    this.lastMonth = current;
    setTimeout(() => {
      item.removeClass('out');
    }, 10);
  }

  confirm() {
    let value = this.$el.find('.select').map(function() {
      return $(this).data('date');
    }).get();
    this.target.val(value.join(','));
    this.hide();
  }

  delegateEvent(options) {
    let clickHandler;
    if (options.scattered) {
      clickHandler = this.onClick_scattered;
    } else {
      clickHandler = options.hasConfirm ? this.onClick : this.onClick_auto;
    }
    this.$el
      .on('click', 'li:not(.disabled)', clickHandler)
      .on('click', '.close-button', () => {
        this.$el.addClass('out');
      })
      .on('click', '.confirm-button', () => {
        this.confirm();
      })
      .on('transitionend', () => {
        this.$el.toggleClass('hide', this.$el.hasClass('out'));
      });

    if (!options.end) {
      this.$el.find('.container').on('scroll', event => {
        let container = event.target;
        if (container.scrollHeight - container.scrollTop <= container.offsetHeight + 10) {
          let item = calendar(this.lastMonth.toObject());
          $(container).append(item);
          this.lastMonth.add('+1m');
        }
      });
    }
  }

  show() {
    this.$el.removeClass('hide');
    setTimeout(() => {
      this.$el.removeClass('out');
    }, 10);
  }

  hide() {
    this.$el.addClass('out');
  }

  onClick(event) {

  }

  onClick_auto(event) {

  }

  onClick_scattered(event) {
    let li = $(event.currentTarget);
    li.toggleClass('select');
  }

  static createMonthObject(current, today, start, end) {
    start = isString(start) ? new EasyDate(start) : start;
    end = isString(end) ? new EasyDate(end) : end;
    return current.toObject(today, start, end);
  }
};