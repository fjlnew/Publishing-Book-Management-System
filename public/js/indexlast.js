function login(){
    var id = document.getElementById("id").value;
    var password = document.getElementById("password").value;
    var passwordmd5 = md5(password);
    var data = $.param({ "id": id }) + "&" +$.param({ "passwordmd5": passwordmd5 })
    + "&"+ $("#editform").serialize() + "";
    $.ajax({
        url: '/login',
        type: 'post',
        data: data,
        dataType: 'json',
        success: function (data) {
            var err_code = data.err_code
            if(err_code===0){
                window.location.href='/main'
            }else if(err_code===1){
                window.alert('账号或者密码错误')
            }else if(err_code===500){
                window.alert('服务器忙')
            }
            console.log(data)
        }
    }) 
}