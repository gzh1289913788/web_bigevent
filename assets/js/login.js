$(function() {
    // 点击"去注册账号"链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    });

    // 点击"去登录"链接
    $('#link_login').on('click', function() {
        $('.reg-box').hide();
        $('.login-box').show();
    });

    // 从layui中获取form对象
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        uname: [/^[a-zA-Z][a-zA-Z0-9_]{4,15}$/, '账号必须以字母开头，长度5-16位，允许字母数字下划线'],
        pwd: [
            /^[a-zA-Z]\w{5,17}$/, '密码必须以字母开头，长度6~18位，只能包含字母、数字和下划线'
        ],
        repwd: function(value) {
            var pwd = $('#form_reg [name=password]').val();
            if (pwd !== value) {
                return '两次密码不一致';
            }
        }
    });

    //监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        e.preventDefault();
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() };
        $.post('/api/reguser', data,
            function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功！');
                $('#link_login').click();
            });
    });

    $('#form_login').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('登录成功！');
                // console.log(res.token);
                localStorage.setItem('token', res.token);
                location.href = '/index.html';
            }
        })
    })
});