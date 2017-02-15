/**
 * Created by realm on 2017/2/15.
 */
import Handlebars from 'handlebars';

let template = `<div id="sample" class="tqb-date-picker static">
  <header class="tqb-dp-header">
    <button type="button">&lt;</button>
    <h3>今日保障日期</h3>
    {{#if hasClose}}
    <button type="button">&times;</button>
    {{/if}}
  </header>
  <ul class="tqb-labels">
    <li class="sunday">日</li>
    <li>一</li>
    <li>二</li>
    <li>三</li>
    <li>四</li>
    <li>五</li>
    <li class="saturday">六</li>
  </ul>
  {{#each months}}
  <div class="tqb-calendar-item month-{{year}}-{{month}}">
    <header>
      <h4>{{year}}年{{month}}月</h4>
    </header>
    <ul>
      <li class="empty-{{empty}}"></li>
      {{#each days}}
      <li class="{{#if disabled}}disabled{{/if}}{{#if today}}today{{/if}}"></li>
      {{/each}}
    </ul>
  </div>
  {{/each}}
</div>`;

export default Handlebars.compile(template);