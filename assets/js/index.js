$(function () {
  // 调用函数获取用户信息
  getUserInfo();

  // 绑定退出按钮事件
  $("#btnLogout").on("click", function () {
    // 调用layui退出确认弹出层
    layer.confirm(
      "确认退出吗?",
      { icon: 3, title: "提示" },
      function (index) {
        //do something
        //清除本地存储的token值
        localStorage.removeItem("token");
        //跳转回登录页面
        location.href = "/login.html";

        layer.close(index);
      }
    );
  });
});

// 获取用户的基本信息
function getUserInfo() {
  $.ajax({
    method: "GET",
    url: "/my/userinfo",
    // 就是 请求头配置对象
    // headers: {
    //   Authorization:
    //     localStorage.getItem("token") || "",
    // },
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg(
          "获取用户信息信息失败"
        );
      }

      // 调用渲染头像的函数
      renderAvatar(res.data);
    },

    //不论验证成功还是通过都会返回一个参数叫做complete
    // complete: function (res) {
    //   if (
    //     res.responseJSON.status === 1 &&
    //     res.responseJSON.message ===
    //       "身份认证失败！"
    //   ) {
    //     // 强制清空token
    //     localStorage.removeItem('token')
    //     // 强制跳转login.html
    //     location.href = '/login.html'
    //   }
    // },
  });
}

//渲染用户头像
function renderAvatar(user) {
  //1.获取用户名
  let name = user.nickname || user.username;
  $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
  //按需渲染头像
  if (user.user_pic !== null) {
    //  渲染图片头像
    $(".layui-nav-img")
      .attr("src", user.user_pic)
      .show();
    $(".text_avatar").hide();
  } else {
    // 渲染文字头像
    $(".layui-nav-img").hide();
    let first = name[0].toUpperCase();
    $(".text_avatar").html(first).show();
  }
}
