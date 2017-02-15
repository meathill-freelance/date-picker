/**
 * Created by meathill on 2017/2/2.
 */
import DatePicker from './DatePicker';

$('body').on('click', '.tqb-date-picker-input', function (event) {
  let target = $(event.currentTarget);
  let options = target.data();
  let picker = options.tqbDatePicker;
  if (picker) {
    picker.show();
  }
  options.show = true;
  picker = new DatePicker(target, options);
  target.data('tqb-date-picker', picker);
});

$('body .tqb-date-picker-input').prop('readonly', true);
window.TQBDatePicker = DatePicker;