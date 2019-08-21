$(function () {
//登录界面JS
    $('#loginEyePassword').click(function () {
        let pass_type = $('input#password').attr('type');
        if (pass_type === 'password' ){
            $('input#password').attr('type', 'text');      //设置属性，可见
            $('#loginEyePassword').attr('src','imgs/eyeOpen.png')
        } else {
            $('input#password').attr('type', 'password');
            $('#loginEyePassword').attr('src','imgs/eyeClose.png')
        }
    });

    //用户名输入框获得焦点后隐藏“用户名错误”
    $('#loginUserText').focus(function () {
        $('#userNameError').css('visibility','hidden');
        $('#passWordError').css('visibility','hidden');
    });
    //用户名输入框获得焦点后隐藏“密码错误”
    $('#password').focus(function () {
        $('#passWordError').css('visibility','hidden');
        $('#loginEyePassword').css('visibility','visible');
    });

    //登录按钮
    $('#loginBut').click(function () {
        $.ajax({
            type: 'POST',
            url: './login.php',
            dataType:'json',
            data:{
                'userName':$('#loginUserText').val(),
                'passWord':$('#password').val().replace(/[^0-9]/gi,'')           //将密码中的非数字类型去掉
            },
            async:false,    //同步执行
            success:function (data) {
                switch (data.code) {
                    //用户名错误
                    case 0:$('#userNameError').css('visibility','visible');
                        break;
                    //密码错误
                    case 1:
                        $('#loginEyePassword').css('visibility','hidden');
                        $('#passWordError').css('visibility','visible');
                        break;
                    default:  window.location.href = './main.html'; //用户名密码正确
                }
            },
            error:function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
                alert(textStatus);
            }
        })
    });
});