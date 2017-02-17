/**
 * Created by realm on 2017/2/15.
 */

const METHODS = {
  m: 'Month',
  d: 'Date'
};
const defaultFormat = 'yyyy-mm-dd';
let counter = 0;

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
      month: EasyDate.toDouble(month + 1),
      empty: this.getFirstDayOfThisMonth(),
      days: EasyDate.getDates(this.base, today, start, end, this.format)
    };
  }

  toString() {
    return EasyDate.format(this.base, this.format);
  }
  
  static format(date, format) {
    return format
      .replace(/y+/gi, () => {
        return date.getFullYear();
      })
      .replace(/m+/gi, () => {
        return EasyDate.toDouble(date.getMonth() + 1);
      })
      .replace(/d+/gi, () => {
        return EasyDate.toDouble(date.getDate());
      });
  }

  static getDates(date, today, start, end, format) {
    let month = date.getMonth();
    date = new Date(date);
    date.setDate(1);
    let dates = [];
    while (date.getMonth() === month) {
      let label = EasyDate.format(date, format);
      dates.push({
        index: counter++,
        date: label.substr(0, 10),
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

  static toDouble(number) {
    return number > 9 ? number.toString() : ('0' + number);
  }
}

export default EasyDate;