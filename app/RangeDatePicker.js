/**
 * Created by meathill on 2017/2/28.
 */

import $ from 'jquery';
import DatePicker from './DatePicker';
import EasyDate from './EasyDate';

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

class RangeDatePicker extends DatePicker {

  constructor(target, options) {
    super(target, options);

    this.startDate = this.$el.find('.start-date');
    this.endDate = this.$el.find('.end-date');
    if (this.target.attr('id')) {
      let labels = $(`[for=${this.target[0].id}].tqb-date-picker-label`);
      if (labels.length) {
        this.startLabel = labels.filter('.start');
        this.endLabel = labels.filter('.end');
      }
    }
  }

  confirm() {
    let start = this.$el.find('.start').data('date');
    let end = this.$el.find('.end').data('date');
    this.start.value = start + ' 00:00';
    this.end.value = end + ' 23:59';
    this.target.val(`${start} ~ ${end}`);
    let event = document.createEvent('HTMLEvents'); // 为了让 Vue 能接收到事件
    event.initEvent('change', true, true);
    this.target[0].dispatchEvent(event);
    if (this.startLabel) {
      this.startLabel.text(this.formatDate(start, this.options.labelFilterStart));
      this.endLabel.text(this.formatDate(end, this.options.labelFilterEnd));
    }
    this.hide();
  }

  createElement(options) {
    this.counter = 0;
    super.createElement(options);

    let targetName = this.target.attr('name');
    this.start = this.createInput(targetName, 'start');
    this.end = this.createInput(targetName, 'end');
  }

  createInput(targetName, pos) {
    let input = document.createElement('input');
    input.type = 'hidden';
    input.name = targetName + '-' + pos;
    $(input).insertAfter(this.target);
    return input;
  }

  createMonthObject(current, today, start, end) {
    let month = super.createMonthObject(current, today, start, end);
    month.days = month.days.map( (item, i) => {
      item['index'] = this.counter + i;
      return item;
    });
    this.counter += month.days.length;
    return month;
  }

  setValue(value) {
    let values = value.split(/[\s,~]+/);
    let end = max(values);
    let start = min(values);
    start = this.$el.find(`[data-date="${start}"]`).addClass(() => {
      let classes = ['start'];
      if (end > start) {
        classes.push('tails');
      }
      return classes.join(' ');
    }).data('index');
    end = this.$el.find(`[data-date="${end}"]`).addClass('end').data('index');
    for (; start <= end; start++) {
      this.$el.find(`[data-index=${start}]`).addClass('select');
    }
  }

  onClick(event) {
    let start = this.$el.find('.start');
    let end = this.$el.find('.end');
    if (start.length && end.length) {
      start.removeClass('start tails');
      end.removeClass('end');
      this.$el.find('.select').removeClass('select');
      start = end = null;
    }

    let li = $(event.currentTarget);
    let lis = this.$el.find('li[data-index]');
    if ((!start || start.length === 0) && (!end || end.length === 0)) {
      li.addClass('select start');
      start = li;
      if (this.options.range) {
        let index = this.center = li.data('index');
        let left = index - this.options.range + 1;
        let right = index + this.options.range;
        if (left > 0) {
          lis
            .slice(0, left)
            .addClass('out-range');
        }
        if (right < lis.length) {
          lis.slice(right, lis.length)
            .addClass('out-range');
        }
      }
      this.startDate.removeClass('active').text(this.formatDate(start.data('date')));
      return;
    }

    let startIndex = start.data('index');
    let index = li.data('index');
    this.$el.find('.out-range')
      .removeClass('out-range');
    if (startIndex <= index) {
      li.addClass('select end');
      if (startIndex < index) {
        start.addClass('tails');
      }
    } else {
      start.removeClass('start tails')
        .addClass('end');
      li.addClass('select start tails');
    }
    lis
      .slice(Math.min(startIndex, index), Math.max(startIndex, index))
      .addClass('select');
    end = li;
    this.startDate.text(this.formatDate(start.data('date')));
    this.endDate.text(this.formatDate(end.data('date')));

    if (!this.options.confirm && start.length && end.length) {
      this.confirm();
    }
  }

  formatDate(date, filter = '{m}月{d}日') {
    date = date.toString();
    date = EasyDate.isDate(date, this.options.format);
    let ymd = date.split('-');
    return filter.replace(/{m+}/, Number(ymd[1]).toString())
      .replace(/{d+}/, Number(ymd[2]).toString());
  }

  onScroll(event) {
    let isAppended = super.onScroll(event);
    if (isAppended && this.center) {
      this.$el.find('li[data-index]')
        .slice(this.center + this.options.range)
        .addClass('out-range');
    }
  }
}

export default RangeDatePicker;