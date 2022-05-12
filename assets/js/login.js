$(function () {
  // 点击去注册跳转到注册页面
  $("#link_reg").on("click", function () {
    $(".loginBox").hide();
    $(".regBox").show();
  });

  // 点击去登录跳转登录页面
  $("#link_login").on("click", function () {
    $(".loginBox").show();
    $(".regBox").hide();
  });

  //表单验证规则
  //从layui中获取form对象
  let form = layui.form;
  // 从layui中获取layer对象
  let layer = layui.layer;
  //通过layui.verify()来自定义验证规则
  form.verify({
    pass: [
      /^[\S]{6,12}$/,
      "密码必须6到12位且不能出现空格",
    ],
    // 校验两次密码是否相同的规则
    pwd: function (value) {
      // console.log(value);
      // value拿到的是确认密码框中的值
      //还需拿到密码框中的值然后进行比较
      let repwd = $("#password").val();
      console.log(repwd);
      if (value !== repwd) {
        return "两次密码不一致";
      }
    },
  });

  //监听注册表单监听事件
  $("#form_reg").on("submit", function (e) {
    e.preventDefault();
    let data = {
      username: $("#form_reg [name=uname]").val(),
      password: $(
        "#form_reg [name=password]"
      ).val(),
    };
    $.post(
      "/api/reguser",
      data,
      function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg("注册成功,请登录");
        //模拟点击去登录 实现注册成功以后自动跳转到登录界面
        $("#link_login").click();
      }
    );
  });

  //监听登录表单的提交事件
  $("#form_login").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/api/login",
      //快速获取表单内容  serialize
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          console.log(res.message);
          return layer.msg("登录失败");
        }
        layer.msg("登录成功");
        // 将token存储在本地
        localStorage.setItem("token", res.token);
        // 跳转到首页
        location.href = "/index.html";
      },
    });
  });
});
