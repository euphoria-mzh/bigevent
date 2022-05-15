$(function () {
  // 1.1 获取裁剪区域的 DOM 元素
  let $image = $("#image");
  // 1.2 配置选项
  let options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: ".img-preview",
  };
  // 1.3 创建裁剪区域
  $image.cropper(options);

  // 为上传按钮绑定事件
  $("#btnChoseImage").on("click", function () {
    $("#file").click();
  });

  // // 为file绑定change事件
  $("#file").on("change", function (e) {
    // console.log(e);
    let fileList = e.target.files;
    // console.log(fileList);
    if (fileList.length === 0) {
      return layer.msg("请选择图片");
    }
    // 根据用户选择的文件，创建对应的 URL 地址
    let newImgURL = URL.createObjectURL(
      fileList[0]
    );
    // console.log(newImgURL);
    // 把创建的 URL 作为 img 的 src 属性，显示出图片
    $image
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", newImgURL) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });
  // 为确定按钮绑定事件
  $("#btnUpload").on("click", function () {
    let dataURL = $image
      .cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100,
      })
      .toDataURL("image/png"); // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    $.ajax({
      type: "POST",
      url: "/my/update/avatar",
      data: {
        avatar: dataURL,
      },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("上传失败");
        }
        layer.msg("上传成功");
        // 更新头像
        window.parent.getUserInfo();
      },
    });
  });
});
