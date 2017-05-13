日期选择控件 Date Picker
===========

这是供天气宝使用的日期选择控件，用在移动设备上

A date picker component for 天气宝

[GitHub](https://github.com/meathill-freelance/date-picker)

## 需求 Requirements

* [jQuery](https://jquery.com) >=3.1.1
* Mobile Devices

## 安装使用 Installation

本控件会自动初始化页面中含有 `.tqb-date-picker-input` 样式的标签，并将其设置为 `readonly`。使用时只需要引用响应的 CSS、JS 文件即可。

本控件会从目标 `<input>` 的 `data-*` 属性取初始化数据，目前支持以下参数：

| 参数 | 功能 |
|------|------|
| `confirm` | 是否需要用户主动点击“确认”，`false` 或无此属性都会自动将选定的日期填入输入框 |
| `scattered` | 可选日期是否是不连续的 |
| `multiple` | 不连续日期选择时，是否可选多个日期 |
| `start` | 可选日期范围的起点，默认是今天 |
| `end` | 可选日期范围的终点，为空则没有，即用户可以选择任意时间 |
| `format` | 日期格式，默认为 `yyyy-mm-dd`，无大小写区分 |
| `labelFilterStart` | 输出到开始日期 <label> 里的日期格式 |
| `labelFilterEnd` | 输出到结束日期 <label> 里的日期格式 |

### 不连续日期

选择不连续日期时，每次点击选择一个日期。提交时，将修改 `<input>` 中的值，为所有选中的日期，用英文逗号（`,`）相连。

### 连续时间段

选择连续时间段时，本控件会生成两个新的 `<input type="hidden">` ，分别名为 `${name}-start` 和 `${name}-end`，用来提交起止日期。另外：

* 开始日期，会自动补上 ` 00:00`，比如选择 `2017-02-28`，表单中的值就是 `2017-02-28 00:00`。
* 结束日期，会自动补上 ` 23:59`，比如选择 `2017-02-28`，表单中的值就是 `2017-02-28 23:59`。
* 显示的文本框里的值是 `${start} ~ ${end}`，这个只用来向用户展示，并不直接提交。

### 代码范例

```html
<!doctype html>
<html>
<head>
  <meta name="viewport" content="initial-scale=1,user-scalable=no">
  <link rel="stylesheet" href="path/to/tqb-date-picker.min.css">
  <link rel="stylesheet" href="your/own/css/css.css">
</head>
<body>

<input type="text" class="tqb-date-picker-input"
    data-scattered="true" <!-- 选择不连续日期 -->
    data-start="2017-06-26" <!-- 可选日期从 2017-06-26 开始 -->
    data-format="yyyy-mm-dd" <!-- 日期输出的格式为 yyyy-mm-dd，如 2017-06-26 -->
    >
<script src="path/to/jquery.js"></script>
<script src="path/to/tqb-date-picker.min.js"></script>
<script src="path/to/your/own/js/js.js"></script>
</body>
```

## Todo

* UI Tests