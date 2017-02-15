/**
 * Created by realm on 2017/2/15.
 */

const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const METHODS = {
  m: 'Month',
  d: 'Date'
};

class EasyDate {
  constructor(offset) {
    this.base = new Date();
    this.add(offset);
  }

  add(offset) {
    offset = EasyDate.parse(offset);
    if (!offset) {

    }
    for (let key in offset) {
      if (offset.hasOwnProperty(key)) {
        let method = METHODS[key];
        this.base['set' + method](this.base['get' + method]() + offset[key]);
      }
    }
  }

  clone() {
    return new Date(this.base.getTime());
  }

  getDays(today) {
    let month = this.base.getMonth();
    let year = this.base.getFullYear();
    let days = EasyDate.fill(month === 1 && EasyDate.isLeapYear(year) ? 29 : DAYS[month]);
    if (this.isSameMonth(today)) {
      days[today.getDate() - 1] = {
        today: true
      };
    }
    return days;
  }

  getFirstDayOfThisMonth() {
    let date = this.clone();
    date.setDate(1);
    return date.getDay();
  }

  isSameMonth(date) {
    return this.base.getFullYear() === date.getFullYear() && this.base.getMonth() === date.getMonth();
  }

  toDate() {
    return this.base;
  }

  toObject(today) {
    let month = this.base.getMonth();
    return {
      year: this.base.getFullYear(),
      month: EasyDate.toMonth(month),
      empty: this.getFirstDayOfThisMonth(),
      days: this.getDays(today)
    };
  }

  static fill(length) {
    let arr = [];
    for (let i = 0; i < length; i++) {
      arr[i] = 0;
    }
    return arr;
  }

  static toMonth(month) {
    return month > 9 ? month.toString() : ('0' + month);
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
}

export default EasyDate;