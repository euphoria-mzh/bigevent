//每次调用post get Ajax 时都先调用 ajaxPrefilter 这个函数
//这个函数可以拿到我们提供给Ajax的配置对象
$.ajaxPrefilter(function (options) {
  /* 发起请求时会进行URL地址拼接 这样我们书写接口时不需要每次都手动 拼接接口地址  以后根路径发生改变也比较好维护*/
  options.url =
    "http://www.liulongbin.top:3007" +
    options.url;
});
