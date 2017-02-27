日期选择组件 Date Picker
===========

这是供天气宝使用的日期选择组件，用在移动设备上

A date picker component for 天气宝

## 需求 Requirements

* [jQuery](https://jquery.com) >=3.1.1
* Mobile Devices

## 安装使用 Installation

本插件会自动初始化页面中含有 `.tqb-date-picker-input` 样式的标签，并将其设置为 `readonly`。使用时只需要引用响应的 CSS、JS 文件即可。

本插件会从目标 `<input>` 的 `data-*` 属性取初始化数据，目前支持以下参数：

| 参数 | 功能 |
|------|------|
| `confirm` | 是否需要用户主动点击“确认”，`false` 或无此属性都会自动将选定的日期填入输入框 |
| `scattered` | 可选日期是否是不连续的 |
| `start` | 可选日期范围的起点，默认是今天 |
| `end` | 可选日期范围的终点，为空则没有，即用户可以选择任意时间 |
| `format` | 日期格式，默认为 `yyyy-mm-dd`，无大小写区分 |

```html
<!doctype html>
<html>
<head>
  <meta name="viewport" content="initial-scale=1,user-scalable=no">
  <link rel="stylesheet" href="path/to/tqb-date-picker.min.css">
  <link rel="stylesheet" href="your/own/css/css.css">
</head>
<body>

<input type="text" class="tqb-date-picker-input">
<script src="path/to/jquery.js"></script>
<script src="path/to/tqb-date-picker.min.js"></script>
<script src="path/to/your/own/js/js.js"></script>
</body>
```

## Todo

* UI Tests