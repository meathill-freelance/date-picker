/**
 * Created by realm on 2017/2/15.
 */
const should = require('should');
const EasyDate = require('../../app/EasyDate').default;
const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

describe('Date', () => {
  let date = new EasyDate('+1m');

  describe('#new', () => {
    it('should create instance', () => {
      let some = date.toDate();
      let today = new Date();
      should(some.getFullYear()).equal(today.getFullYear());
      should(some.getMonth()).equal(today.getMonth() + 1);
    });
  });

  describe('#clone', () => {
    it('should clone date', () => {
      let some = date.clone();
      should(some.toDate().getTime()).equal(date.toDate().getTime());
    });

    it('should clone format', () => {
      let some = new EasyDate('+1m', { format: 'yyyy$mm$dd'});
      let another = some.clone();
      should(some.toString()).equal(another.toString());
    });
  });

  describe('#getDates', () => {
    it('should get days', () => {
      let today = new Date();
      let days = EasyDate.getDates(date.base, today, today);
      should(days).be.an.Array();
      should(days.length).equal(DAYS[date.base.getMonth()]);
    });
  });

  describe('#getFirstDayOfThisMonth', () => {
    it('should return the first day of this month', () => {
      let date = new EasyDate();
      let today = new Date();
      today.setDate(1);
      should(date.getFirstDayOfThisMonth()).equal(today.getDay());
    });
  });

  describe('#getMonth', () => {
    it('输出月份，个位数前面自动补0', () => {
      should(EasyDate.toDouble(11)).equal('11');
      should(EasyDate.toDouble(9)).equal('09');
    });
  });

  describe('#isDate', () => {
    it('是否为符合要求的日期', () => {
      let format = 'yyyy-mm-dd';
      should(EasyDate.isDate('2016-10-12', format)).be.True();
      should(EasyDate.isDate('2016-0-12', format)).be.False();
      should(EasyDate.isDate('+1m', format)).be.False();
    });
  });

  describe('#isLeapYear', () => {
    it('是否为闰年', () => {
      should(EasyDate.isLeapYear(2000)).be.True();
      should(EasyDate.isLeapYear(2004)).be.True();
      should(EasyDate.isLeapYear(2100)).be.False();
      should(EasyDate.isLeapYear(2005)).be.False();
    });
  });
});