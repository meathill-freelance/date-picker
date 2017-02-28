/**
 * Created by realm on 2017/2/15.
 */
import template from '../template/picker.hbs';
import calendar from '../template/calendar.hbs';
import EasyDate from './EasyDate';
import RangeDatePicker from './RangeDatePicker';

const toString = Object.prototype.toString;
function isString(obj) {
  return toString.call(obj) === '[object ' + name + ']';
}
function max(array) {
  let last = array.pop();
  return array.reduce( (memo, item) => {
    return memo > item ? memo : item;
  }, last);
}
function min(array) {
  let last = array.pop();
  return array.reduce( (memo, item) => {
    return memo > item ? item : memo;
  }, last);
}

export default class DatePicker {
  /**
   *
   * @param target
   * @param {Object} options
   *    @param {Boolean|null} options.confirm 是否有确认按钮
   *    @param {Boolean|null} options.show 是否直接显示
   *    @param {Boolean|null} options.scattered 是否选择单日
   *    @param {Boolean|null} options.multiple 是否可以选择多个日期
   *    @param {String|null} options.start 可选日期范围的起点，默认是今天
   *    @param {String|null} options.end 可选日期范围的终点，为空则没有，即用户可以选择任意时间
   *    @param {String|null} options.format 日期格式，默认为 `yyyy-mm-dd`，无大小写区分
   */
  constructor(target, options = {}) {
    this.target = target;
    this.createElement(options);
    this.delegateEvent(options);
    this.setValue(target.val(), options);

    if (options.show) {
      this.show();
    }
    this.options = options;
  }

  createElement(options) {
    let today = new EasyDate(0, options);
    let start = options.start ? new EasyDate(options.start) : today;
    let end = options.end ? new EasyDate(options.end) : null;
    let range = end || new EasyDate('+1m');
    let current = start.clone();
    let months = [];
    let counter = 0;
    while (current <= range) {
      let month = DatePicker.createMonthObject(current, today, start, end);
      month.days = month.days.map( (item, i) => {
        item['index'] = counter + i;
        return item;
      });
      months.push(month);
      counter += month.days.length;
      current.add('1m');
    }
    let data = Object.assign({
      months: months
    }, options);
    let item = $(template(data));
    item.insertAfter(this.target);
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
    let clickHandler = options.scattered ? DatePicker.onClick_scattered : this.onClick;
    this.$el
      .on('click', 'li:not(.disabled,.empty)', clickHandler.bind(this))
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

  setValue(value, options) {
    let values = value.split(',');
    values.forEach( value => {
      this.$el.find('[data-date="' + value + '"]').addClass('select');
    });
    if (!options || !options.scattered) {
      let end = max(values);
      let start = min(values);
      this.$el.find('[data-date="' + start + '"]').addClass('start');
      this.$el.find('[data-date="' + end + '"]').addClass('end');
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
    let start = this.$el.find('.start');
    let end = this.$el.find('.end');
    if (start.length && end.length) {
      start.removeClass('start');
      end.removeClass('end');
      this.$el.find('.select').removeClass('select');
      start = end = null;
    }

    let li = $(event.currentTarget);
    if ((!start || start.length === 0) && (!end || end.length === 0)) {
      li.addClass('select start');
      start = li;
      return;
    }

    let startIndex = start.data('index');
    let index = li.data('index');
    if (startIndex <= index) {
      li.addClass('select end');
    } else {
      start.removeClass('start')
        .addClass('end');
      li.addClass('select start');
    }
    this.$el.find(`li[data-index]`)
      .slice(Math.min(startIndex, index), Math.max(startIndex, index))
      .addClass('select');
    end = li;

    if (!this.options.confirm && start.length && end.length) {
      this.confirm();
    }
  }

  static onClick_scattered(event) {
    let li = $(event.currentTarget);
    li.toggleClass('select');
  }

  static createMonthObject(current, today, start, end) {
    start = isString(start) ? new EasyDate(start) : start;
    end = isString(end) ? new EasyDate(end) : end;
    return current.toObject(today, start, end);
  }

  static getInstance(el, options) {
    if (options.scattered) {
      return new DatePicker(el, options);
    } else {
      return new RangeDatePicker(el, options);
    }
  }
};