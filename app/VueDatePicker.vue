<template>
  <div class="vue-date-picker">
    <input @focus="onFocus" class="form-control tqb-date-picker-input" :placeholder="placeholder" :name="name" :value="this.value">
    <div class="tqb-date-picker" :class="{static: static, scattered: scattered, continuous: !scattered}" v-if="isShowCalendar">
      <header class="tqb-dp-header">
        <button type="button" class="tqb-dp-close-button" @click="close"></button>
        <h3>今日保障日期</h3>
        <button type="button" class="tqb-dp-confirm-button" v-if="confirm" @click="confirm">确定</button>
        <div class="tqb-dp-selected" v-if="!scattered">
          <label class="start-date" :class="{active: isStart}"></label>
          <label class="end-date" :class="{active: !isStart}"></label>
        </div>
        <ul class="tqb-dp-labels">
          <li class="sunday">日</li>
          <li>一</li>
          <li>二</li>
          <li>三</li>
          <li>四</li>
          <li>五</li>
          <li class="saturday">六</li>
        </ul>
      </header>
      <div class="tqb-dp-container" :style="fixHeight" @scroll="onScroll" ref="container">
        <div class="tqb-dp-calendar-item" :class="'month-' + month.year + '-' + month.month" v-for="month in months">
          <header>
            <h4>{{month.year}}年{{month.month}}月</h4>
          </header>
          <ul>
            <li class="empty" :class="'empty-' + empty"></li>
            <li :class="{today: day.today, select: day.isSelected}" @click="onClick(day)" v-for="day in month.days"></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import EasyDate from './EasyDate';
  import util from './utils';

  export default {
    computed: {
      fixHeight() {
        return this.fixCalendarContainer ? {
          height: window.innerHeight - 105,
        } : null;
      },
    },

    data() {
      return {
        isShowCalendar: false,

        localValue: new Set(),
        empty: 0,
        months: null,
        range: null,
        lastMonth: null,
      };
    },

    props: {
      placeholder: {
        type: String,
        default: '',
      },
      name: {
        type: String,
        default: '',
      },
      value: {
        type: String,
        default: '',
      },
      start: {
        type: String,
        default: '',
      },
      end: {
        type: String,
        default: '',
      },
      isStart: {
        type: Boolean,
        default: false,
      },
      format: {
        type: Boolean,
        default: 'YYYY-MM-DD',
      },
      fixCalendarContainer: {
        type: Boolean,
        default: false,
      },
      scattered: {
        type: Boolean,
        default: true,
      },
      static: {
        type: Boolean,
        default: false,
      },
    },

    methods: {
      close() {
        this.isShowCalendar = false;
      },

      confirm() {
        this.$emit('input', [...this.localValue].join(','));
        this.close();
      },

      createElement() {
        const options = {
          format: this.format,
        };
        let today = this.today = new EasyDate(0, options);
        let start = this.start ? new EasyDate(this.start, options) : today;
        let end = this.end ? new EasyDate(this.end, options) : null;
        let current = start.clone();
        current.setDate(1);
        let months = [];
        for (let i = 0; i< 2; i++) { // 默认画两个月
          let month = this.createMonthObject(current, today, start, end);
          months.push(month);
          current.add('1m');
        }
        this.months = months;
        this.lastMonth = current;
      },

      createMonthObject(current, today, start, end) {
        return current.toObject(today, start, end);
      },

      processValue() {
        if (this.value && this.value.length) {
          this.localValue = new Set(this.value);
        }
      },

      onClick(day) {
        const {disabled, date} = day;
        if (disabled) {
          return;
        }
        if (this.localValue.has(date)) {
          this.localValue.delete(date);
        } else {
          this.localValue.add(date);
        }
        day.isSelected = this.localValue.has(date);
      },

      onFocus() {
        this.range = util.getRange({start: this.start, end: this.end});
        this.createElement();
        this.isShowCalendar = true;
      },

      onScroll(event) {
        if (this.lastMonth.isGreaterOrEqual(this.end)) {
          return;
        }

        const container = event.target;
        if (container.scrollHeight - container.scrollTop <= container.offsetHeight + 10) {
          const month = this.createMonthObject(this.lastMonth, this.today, this.start, this.end);
          this.months.push(month);
          this.lastMonth.add('+1m');
        }
      },
    },

    beforeMount() {
      this.processValue();
      this.createElement();
    },
  };
</script>