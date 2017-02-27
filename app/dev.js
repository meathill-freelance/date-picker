/**
 * Created by realm on 2017/2/27.
 */

import marked from 'marked';
import { DEBUG } from 'config';

if (DEBUG) {
  $.get('./README.md')
    .then( content => {
      let html = marked(content);
      $('#readme').html(html);
    });
}