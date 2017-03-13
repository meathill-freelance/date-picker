/**
 * Created by realm on 2017/2/15.
 */
import template from '../template/picker.hbs';
import calendar from '../template/calendar.hbs';
import EasyDate from './EasyDate';
import utils from './utils';

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
    this.counter = 0;
    this.range = utils.getRange(options);
    if ('multiple' in options) {
      options.confirm = options.multiple;
    }
    this.createElement(options);
    this.delegateEvent(options);
    this.setValue(target.val());

    if (options.show) {
      this.show();
    }
    this.options = options;
  }

  createElement(options) {
    let today = options.today = new EasyDate(0, options);
    let start = options.start = options.start ? new EasyDate(options.start, options) : today;
    let end = options.end = options.end ? new EasyDate(options.end, options) : null;
    let current = start.clone();
    let months = [];
    for (let i = 0; i< 2; i++) { // 默认画两个月
      let month = this.createMonthObject(current, today, start, end);
      months.push(month);
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

  createMonthObject(current, today, start, end) {
    let month = current.toObject(today, start, end);
    month.days = month.days.map( (item, i) => {
      item['index'] = this.counter + i;
      return item;
    });
    this.counter += month.days.length;
    return month;
  }

  confirm() {
    let value = this.$el.find('.select').map(function() {
      return $(this).data('date');
    }).get();
    this.target.val(value.join(','));
    this.hide();
  }

  delegateEvent(options) {
    this.$el
      .on('click', 'li:not(.disabled,.empty)', this.onClick.bind(this))
      .on('click', '.close-button', () => {
        this.$el.addClass('out');
      })
      .on('click', '.confirm-button', () => {
        this.confirm();
      })
      .on('transitionend', () => {
        this.$el.toggleClass('hide', this.$el.hasClass('out'));
      });

    this.$el.find('.container').on('scroll', event => {
      let container = event.target;
      if (container.scrollHeight - container.scrollTop <= container.offsetHeight + 10) {
        let item = calendar(this.createMonthObject(this.lastMonth, options.today, options.start, options.end));
        $(container).append(item);
        this.lastMonth.add('+1m');
      }
    });
  }

  setValue(value, options) {
    let values = value.split(',');
    values.forEach( value => {
      this.$el.find('[data-date="' + value + '"]').addClass('select');
    });
  }

  show() {
    let options = this.target.data();
    let range = utils.getRange(options);
    if (range != this.range) {
      this.$el.remove();
      this.createElement(options);
      this.delegateEvent(options);
      this.setValue(this.target.val());
      this.options = options;
      this.range = range;
      return;
    }
    this.$el.removeClass('hide');
    setTimeout(() => {
      this.$el.removeClass('out');
    }, 10);
  }

  hide() {
    this.$el.addClass('out');
  }

  onClick(event) {
    let li = $(event.currentTarget);
    if (li.hasClass('select')) {
      li.removeClass('select');
      return;
    }

    if (!this.options.multiple) {
      this.$el.find('.select').removeClass('select');
    }
    li.addClass('select');
    if (!this.options.confirm) {
      this.confirm();
    }
  }
};