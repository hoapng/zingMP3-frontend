async function loadMenuAdmin(){
    var main = '<nav class="nav nav-dark ">'+
    '<div> '+
        '<a href="#" class="nav_logo"> '+
            '<i class="bx bx-layer nav_logo-icon"></i> <span class="nav_logo-name">Quản trị</span> '+
        '</a>'+
        '<div class="nav_list"> '+
            '<a href="user.html" class="nav_link"> '+
                '<i class="bx bx-user nav_icon"></i> <span class="nav_name">Người dùng</span> '+
            '</a> '+
            '<a href="category.html" class="nav_link"> '+
                '<i class="fas fa-tshirt"></i> <span class="nav_name">Danh mục nhạc</span> '+
            '</a> '+
            '<a href="singer.html" class="nav_link"> '+
                '<i class="bx bx-bar-chart-alt-2 nav_icon"></i> <span class="nav_name">Ca sỹ</span> '+
            '</a> '+
            '<a href="musicmv.html" class="nav_link"> '+
                '<i class="bx bx-bar-chart-alt-2 nav_icon"></i> <span class="nav_name">Nhạc/ Mv</span> '+
            '</a> '+
        '</div>'+
    '</div> '+
    '<a onclick="logout()" style="cursor: pointer;" class="nav_link"> '+
        '<i class="bx bx-log-out nav_icon"></i> <span class="nav_name">SignOut</span> '+
    '</a>'+
'</nav>'

document.getElementById("nav-bar").innerHTML = main;
document.getElementById("img-login").src = '../image/icon-avatar.png'

var token = localStorage.getItem("token");
if(token === null){
    window.location.replace("../login.html")
}
else{
    const res = await fetch('http://localhost:8080/api/userlogged', { 
         method: 'POST', 
         headers: new Headers({ 
             'Authorization': 'Bearer '+token, 
            'Content-Type': 'application/json',
         })
        })
    var user = await res.json();
    var check = 0;
    for(i=0; i<user.authorities.length; i++){
        if(user.authorities[i].name === 'ROLE_ADMIN'){
            check = 1;
        }
    }
    if(check === 1){
        
    }
    else{
        window.location.replace("../login.html")
    }
}
}

function logout(){
    localStorage.removeItem("token");
    window.location.replace("../login.html")
}









document.addEventListener("DOMContentLoaded", function(event) {
   
    const showNavbar = (toggleId, navId, bodyId, headerId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId),
    bodypd = document.getElementById(bodyId),
    headerpd = document.getElementById(headerId)
    nav.classList.toggle('show')
    // change icon
    toggle.classList.toggle('bx-x')
    // add padding to body
    bodypd.classList.toggle('body-pd')
    // add padding to header
    headerpd.classList.toggle('body-pd')
    // Validate that all variables exist
    if(toggle && nav && bodypd && headerpd){
    toggle.addEventListener('click', ()=>{
        // show navbar
        nav.classList.toggle('show')
        // change icon
        toggle.classList.toggle('bx-x')
        // add padding to body
        bodypd.classList.toggle('body-pd')
        // add padding to header
        headerpd.classList.toggle('body-pd')
    })
    }
    }
    
    showNavbar('header-toggle','nav-bar','body-pd','header')
    
    /*===== LINK ACTIVE =====*/
    const linkColor = document.querySelectorAll('.nav_link')
    
    function colorLink(){
    if(linkColor){
    linkColor.forEach(l=> l.classList.remove('active'))
    this.classList.add('active')
    }
    }
    linkColor.forEach(l=> l.addEventListener('click', colorLink))
    
     // Your code to run since DOM is loaded and ready
     
    });

