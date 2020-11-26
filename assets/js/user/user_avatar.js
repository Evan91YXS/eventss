$(function() {
    let layer = layui.layer;
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')

    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    };

    // 1.3 创建裁剪区域
    $image.cropper(options)

    $("#uploadBtn").click(function() {
        $("#file").click();
    });
    $("#file").on("change", function() {
        // change当选择的文件发生改变的时候 该事件就会触发
        let file = this.files[0];
        let newImgURL = URL.createObjectURL(file);
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })
    $("#suerBtn").click(function() {
        let dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')
        $.ajax({
            url: "/my/update/avatar",
            type: "POST",
            data: {
                avatar: dataURL,
            },
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                window.parent.getAvatarAndName();
            }
        })
    })
})