/**
 * Created by realm on 2017/2/15.
 */
let calendar = `<div class="tqb-calendar-item month-{{year}}-{{month}}">
  <header>
    <h4>{{year}}年{{month}}月</h4>
  </header>
  <ul>
    <li class="empty-{{empty}}"></li>
    {{#each days}}
    <li class="{{#if disabled}}disabled{{/if}}{{#if today}}today{{/if}}" data-date="{{date}}" data-index="{{@index}}"></li>
    {{/each}}
  </ul>
</div>`;
let template = `<div class="tqb-date-picker out {{#if static}}static{{/if}}">
  <header class="tqb-dp-header">
    <button type="button" class="close-button">&lt;</button>
    <h3>今日保障日期</h3>
    {{#if confirm}}
    <button type="button" class="confirm-button">确定</button>
    {{/if}}
    <ul class="tqb-labels">
      <li class="sunday">日</li>
      <li>一</li>
      <li>二</li>
      <li>三</li>
      <li>四</li>
      <li>五</li>
      <li class="saturday">六</li>
    </ul>
  </header>
  <div class="container">
    {{#each months}}
    {{> month}}
    {{/each}}
  </div>  
</div>`;

calendar = Handlebars.compile(calendar);
Handlebars.registerPartial('month', calendar);
template = Handlebars.compile(template);

export {calendar, template};