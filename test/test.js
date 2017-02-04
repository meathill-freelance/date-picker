/**
 * Created by meathill on 2017/2/2.
 */
const test = $('#test-input');

/**
 * 测试点击输入框
 */
QUnit.module('open', {
  beforeEach() {
    test.blur();
    test.data({
      select: null,
      start: null,
      end: null
    });
  }
});
QUnit.test('弹出日期选择框', assert => {
  test.focus();
  assert.ok($('.tqb-date-picker').is(':visible'));
  assert.ok(test.hasClass('tqb-date-picker-input'));
});

QUnit.test('显示今天', assert => {
  test.focus();
  let time = new Date();
  let today = $('.tqb-date-picker').find('.today');
  assert.ok(today.length === 1);
  assert.ok(today.index() === time.getDate());
  assert.ok(today.closest('.calendar-item').is(`.month-${time.getYear()}-${time.getMonth()}`));
});

QUnit.test('显示默认日期', assert => {
  let someday = Math.random() * 6 >> 0;
  let date = moment().add(someday, 'days');
  test.data('defaultDate', date.format('YYYY-MM-DD'));
  test.focus();
  let selected = $('.tqb-date-picker').find('.select');
  assert.ok(selected.length === 1);
  assert.ok(selected.index() === date.getDate());
  assert.ok(selected.closest('.calendar-item').is(`.month-${date.format('YYYY-MM')}`));
});

QUnit.test('显示多个日期', assert => {

});

QUnit.test('显示日期段', assert => {

});

/**
 * 测试选择日期
 */

/**
 * 测试退出输入框
 */
QUnit.module('close', {
  beforeEach(assert) {
    test.focus();
  }
});
QUnit.test('blur 隐藏', assert => {
  assert.ok(!$('.tqb-date-picker').is(':visible'));
});