async function regis() {
    var linkimage = ""
    var uploadimg = 'http://localhost:8080/api/public/upload';
    const filePath = document.getElementById('file')
    const formData = new FormData()
    formData.append("file", filePath.files[0])
    const response = await fetch(uploadimg, {
        method: 'POST',
        headers: new Headers({

        }),
        body: formData
    });
    if(response.status < 300){
        linkimage =  await response.text(); 
    }
    if(linkimage == ""){
        alert("hãy đăng ảnh đại diện của bạn")
        return;
    }
    var url = 'http://localhost:8080/api/register'
    var username = document.getElementById("username").value
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    var repassword = document.getElementById("repassword").value
    var fullname = document.getElementById("fullname").value
    var user = {
        "username": username,
        "email": email,
        "password": password,
        "fullname":fullname,
        "avatar":linkimage,
        "authorities": [
            "ROLE_USER"
        ]
    }
    if(password != repassword){
        alert("Mật khẩu không trùng khớp")
        return;
    }
    if(password === "" || repassword === ""){
        alert("mật khẩu không được để trống!")
        return;
    }
    const res = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(user)
    });
    var result = await res.text();
    console.log(result)
    if (result === '1') {
        alert("email đã tồn tại")
    }
    else if (result === '2') {
        alert("username đã tồn tại")
    }
    else if (result === '0') {
        swal({
            title: "Thông báo", 
            text: "đăng ký thành công", 
            type: "success"
          },
        function(){ 
            window.location.replace('login.html')
        });
    }
}

async function login() {
    var url = 'http://localhost:8080/api/authenticate'
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value
    var user = {
        "username": username,
        "password": password
    }
    console.log(user)
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(user)
    });
    var token = await response.text(); 

    
    if(response.status > 300){
        alert("tài khoản hoặc mật khẩu không chính xác")
    }
    if(response.status < 300){

        window.localStorage.setItem('token', token);
       
        var urlAccount = 'http://localhost:8080/api/userlogged';
        const res = await fetch(urlAccount, {
            method: 'POST',
            headers: new Headers({
                'Authorization': 'Bearer '+token, 
                'Content-Type': 'application/json'
            })
        });

        var account = await res.json();
        window.localStorage.setItem('username', account.username);
        console.log(account)
        var check = 0;
        for(i=0; i<account.authorities.length; i++){
            if(account.authorities[i].name === 'ROLE_ADMIN'){
                check = 1;
            }
        }
        if(check === 0){
            window.location.replace('index.html')
        }
        if(check === 1){
            window.location.replace('admin/user.html')
        }
    }
}