$(function(){
    //点击切换登录注册框
    $('#link_reg').click(()=>{
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').click(()=>{
        $('.reg-box').hide()
        $('.login-box').show()
    })
    const form = layui.form
    //账号密码校验 layui
    form.verify({
        password:[/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        repwd: (val) =>{
            const pwd = $('.reg-box [name=password]').val()
            console.log(val,pwd);
            if(pwd != val) return "两次密码不一致"
            
        }
    })
    // const baseUrl ="http://www.liulongbin.top:3007"
    //注册账号
    $('#form_reg').submit((e)=>{
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url:'/api/reguser',
            data:{
                username :$('#form_reg [name=username]').val(),
                password :$('#form_reg [name=password]').val()
            },
            success:(res) => {
                console.log(res);
                if(res.status !=0) return layer.msg(res.message);
                layer.msg("注册成功");
                $('#link_login').click()
            }
        })
    })
    //登录账号
    $('#form_login').submit(function(e){
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url:'/api/login',
            data:$(this).serialize(),
            success: (res)=>{
                console.log(res);
                if(res.status!=0) return layer.msg("登录失败");
                layer.msg("登陆成功");
                localStorage.setItem("token",res.token);
                location.href ='/index.html'
            }
        })
    })
})