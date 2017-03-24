/**
 * 直接把工厂函数放在静态方法，编译之后会有问题
 * 所以还是弄个工厂函数吧
 *
 * Created by meathill on 2017/2/28.
 */

import DatePicker from './DatePicker';
import RangeDatePicker from './RangeDatePicker';

export default {
  createDatePicker(el, options) {
    options.fixCalendarContainer = this.fixCalendarContainer;
    if ('scattered' in options && options.scattered) {
      return new DatePicker(el, options);
    } else {
      return new RangeDatePicker(el, options);
    }
  }
};
