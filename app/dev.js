/**
 * Created by realm on 2017/2/27.
 */

import $ from 'jquery';
import Vue from 'vue';
import marked from 'marked';
//import EasyDate from './EasyDate';
import VueDatePicker from './VueDatePicker';

/* global DEBUG, console */
if (DEBUG) {
  $.get('./README.md')
    .then( content => {
      let html = marked(content);
      $('#readme').html(html);
    });
}

Vue.component('date-picker', VueDatePicker);

new Vue({
  el: '#app',
  data() {
    return {
      singleDate: null,
    };
  }
});