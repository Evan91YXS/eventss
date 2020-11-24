$(function() {
    let layer = layui.layer;
    $("#logoutBtn").click(function() {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            localStorage.removeItem("token");
            location.href = '/home/login.html'
            layer.close(index);
        });
    });
    $(function() {
        $.ajax({
            url: "/my/userinfo",
            /* headers: {
                Authorization: localStorage.getItem("token")
            }, */
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("获取用户信息失败")
                }
                let name = res.data.nickname || res.data.username;
                let first = name[0].toUpperCase();
                $("#welcome").text("欢迎" + name);
                if (res.data.user_pic) {
                    // 有用户头像，展示用户头像，隐藏文字头像
                    $(".layui-nav-img").show().attr("src", res.data.user_pic);
                    $(".text-avatar").hide();
                } else {
                    // 没有用户头像，隐藏用户头像，显示文字头像===文字头像来源于name的第一个首字母
                    $(".layui-nav-img").hide();
                    $(".text-avatar").text(first).show()
                }
            },

        })
    })
})