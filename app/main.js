/**
 * Created by meathill on 2017/2/2.
 */

import $ from 'jquery';
import Factory from './Factory';

$('body').on('click', '.tqb-date-picker-input,.tqb-date-picker-label', function (event) {
  let target;
  let labelFor;
  if (event.currentTarget.tagName.toLowerCase() === 'label') {
    labelFor = event.currentTarget.htmlFor;
    target = $(`#${labelFor}`);
  } else {
    target = $(event.currentTarget);
  }
  let options = target.data();
  options.isStart = labelFor && $(event.currentTarget).hasClass('start');
  /**
   * @param {DatePicker|null} options.tqbDatePicker
   */
  let picker = options.tqbDatePicker;
  if (picker) {
    return picker.show();
  }
  options.show = true;
  picker = Factory.createDatePicker(target, options);
  target.data('tqb-date-picker', picker);
  target.blur();
});

$('.tqb-date-picker-input').prop('readonly', true);
window.TQBDatePickerFactory = Factory;

if (/\bmicromessenger\b/i.test(navigator.userAgent) && !('FastClick' in window)) {
  let script = document.createElement('script');
  script.async = true;
  script.src = '//cdn.staticfile.org/fastclick/1.0.6/fastclick.min.js';
  script.onload = () => {
    /* global FastClick */
    FastClick.attach(document.body);
  };
  document.body.appendChild(script);

  if (/\bWindowsWechat\b/i.test(navigator.userAgent)) {
    Factory.fixCalendarContainer = true;
  }
}