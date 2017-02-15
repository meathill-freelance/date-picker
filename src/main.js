/**
 * Created by meathill on 2017/2/2.
 */
import DatePicker from './DatePicker';

$('body').click('.tqb-date-picker-input', function (event) {
  let target = $(event.currentTarget);
  let picker = target.data('tqb-date-picker');
  if (picker) {
    picker.show();
  }
  picker = new DatePicker(target, {
    show: true
  });
});

$('body .tqb-date-picker-input').prop('readonly', true);
window.TQBDatePicker = DatePicker;