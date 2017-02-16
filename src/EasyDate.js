/**
 * Created by realm on 2017/2/15.
 */

const METHODS = {
  m: 'Month',
  d: 'Date'
};
const defaultFormat = 'yyyy-mm-dd';

class EasyDate {
  constructor(offset, options = {}) {
    this.format = options.format || defaultFormat;
    if (EasyDate.isDate(offset, this.format)) {
      this.base = new Date(offset);
      return;
    }
    if (offset instanceof Date) {
      this.base = new Date(offset);
      return;
    }

    this.base = new Date();
    this.base.setHours(0);
    this.base.setMinutes(0);
    this.base.setSeconds(0);
    this.add(offset);
  }

  add(offset) {
    offset = EasyDate.parse(offset);
    if (!offset) {
      return;
    }
    for (let key in offset) {
      if (offset.hasOwnProperty(key)) {
        let method = METHODS[key];
        this.base['set' + method](this.base['get' + method]() + offset[key]);
      }
    }
  }

  clone() {
    return new EasyDate(this.base);
  }

  getDay() {
    return this.base.getDay();
  }

  getFirstDayOfThisMonth() {
    let date = this.clone();
    date.setDate(1);
    return date.getDay();
  }

  isSameMonth(date) {
    return this.base.getFullYear() === date.getFullYear() && this.base.getMonth() === date.getMonth();
  }

  setDate(date) {
    this.base.setDate(date);
  }

  toDate() {
    return this.base;
  }

  toObject(today, start, end) {
    let month = this.base.getMonth();
    return {
      year: this.base.getFullYear(),
      month: EasyDate.toMonth(month),
      empty: this.getFirstDayOfThisMonth(),
      days: EasyDate.getDates(this.base, today, start, end)
    };
  }

  toString() {
    return this.base.toISOString();
  }

  static getDates(date, today, start, end) {
    let month = date.getMonth();
    date = new Date(date);
    date.setDate(1);
    let dates = [];
    while (date.getMonth() === month) {
      let label = date.toISOString();
      dates.push({
        date: label,
        today: today && today.toString() == label,
        disabled: (start && label < start.toString()) || (end && label > end.toString())
      });
      date.setDate(date.getDate() + 1);
    }
    return dates;
  }

  static isDate(string, format) {
    format = format.replace(/[ymd]+/gi, match => {
      return '\\d{' + match.length + '}';
    });
    let regexp = new RegExp('^' + format + '$');
    return regexp.test(string);
  }

  static isLeapYear(year) {
    if (year % 100 === 0) {
      return year % 400 === 0;
    }
    return year % 4 === 0;
  }

  static parse(offset) {
    if (!offset) {
      return null;
    }

    offset = offset.toLowerCase();
    let result = {};
    offset.replace(/([+-]?\d+)([ymd])/g, (match, number, unit) => {
      result[unit] = Number(number);
    });
    return result;
  }

  static toMonth(month) {
    month += 1;
    return month > 9 ? month.toString() : ('0' + month);
  }
}

export default EasyDate;