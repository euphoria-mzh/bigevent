$(function () {
  let form = layui.form;
  let layer = layui.layer;
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return "用户昵称为1~6个字符";
      }
    },
  });
  // 调用获取用户基本信息函数
  initUserInfo();

  // 初始化用户的基本信息
  function initUserInfo() {
    $.ajax({
      type: "GET",
      url: "/my/userinfo",
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(
            "获取用户基本信息失败"
          );
        }
        // 调用layui快速赋值
        form.val("user_form", res.data);
      },
    });
  }

  //重置按钮绑定事件
  $("#btnReset").on("click", function (e) {
    // 阻止默认行为
    e.preventDefault();
    initUserInfo();
  });

  // 监听表单提交事件
  $(".layui-form").on("submit", function (e) {
    // 阻止默认行为
    e.preventDefault();
    // 发起Ajax请求
    $.ajax({
      type: "POST",
      url: "/my/userinfo",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("修改用户信息失败");
        }
        layer.msg("修改用户信息成功");
        // 重新渲染头像和昵称
        window.parent.getUserInfo();
      },
    });
  });
});
