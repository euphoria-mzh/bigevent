//每次调用post get Ajax 时都先调用 ajaxPrefilter 这个函数
//这个函数可以拿到我们提供给Ajax的配置对象
$.ajaxPrefilter(function (options) {
  /* 发起请求时会进行URL地址拼接 这样我们书写接口时不需要每次都手动 拼接接口地址  以后根路径发生改变也比较好维护*/
  options.url =
    "http://www.liulongbin.top:3007" +
    options.url;

  //统一为有权限的接口设置请求头
  if (options.url.indexOf("/my") !== -1) {
    options.headers = {
      Authorization:
        localStorage.getItem("token") || "",
    };
  }

  //配置全局变量
  options.complete = function (res) {
    if (
      res.responseJSON.status === 1 &&
      res.responseJSON.message ===
        "身份认证失败！"
    ) {
      // 强制清空token
      localStorage.removeItem("token");
      // 强制跳转login.html
      location.href = "/login.html";
    }
  };
});
