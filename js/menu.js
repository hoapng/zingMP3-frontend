async function loadMenu(){
  var token = localStorage.getItem("token");
  if(token === null){
      window.location.replace("login.html")
  }
    var menu = '<div class="nav-main">'+
    '<div class="nav-logo">'+
      '<a href="#"><img src="./assets/img/logo-mp3.svg" alt=""></a>'+
    '</div>'+
    '<ul class="nav-top">'+
      '<li class="nav-top__item active"><a href="index.html"><i class="fab fa-itunes"></i><span>Cá nhân</span></a></li>'+
    '</ul>'+
    '<div class="nav-bottom">'+
      '<ul class="nav-bottom__list">'+
        '<li class="nav-bottom__item"><a href="nhacmoi.html"><i class="fas fa-music"></i><span>Nhạc mới</span></a></li>'+
        '<li class="nav-bottom__item">'+
            '<div class="dropdown">'+
                '<a href="#"><i class="fas fa-icons"></i><span>Thể loại</span></a>'+
                '<div class="dropdown-content" id="listcategory">'+
                    '<a href="#">Link 1</a>'+
                    '<a href="#">Link 2</a>'+
                '</div>'+
            '</div>'+
        '</li>'+
        '<li class="nav-bottom__item">'+
          '<a href="#"><i class="fas fa-star"></i><span>Top</span></a>'+
        '</li>'+
       ' <li class="nav-bottom__item"><a href="video.html"><i class="fas fa-caret-square-right"></i><span>Music Video</span></a></li>'+
      '</ul>'+
      '<div class="nav-library">'+
        '<div class="nav-library__header">'+
          '<h2 class="nav-library__title">Thư viện</h2>'+
          '<span class="nav-library__pencil">'+
            '<i class="bx bxs-pencil"></i>'+
          '</span>'+
        '</div>'+
        '<div class="nav-library__content">'+
          '<div class="nav-library__item"><img src="image/mysong.svg" alt=""><span>Bài hát</span></div>'+
          '<div class="nav-library__item"><img src="image/history.svg"alt=""><span>Gần đây</span></div>'+
        '</div>'+
      '</div>'+
    '</div>'+
  '</div>'
  document.getElementById("nav").innerHTML = menu

  var url = 'http://localhost:8080/api/public/categories';
    const response = await fetch(url, {
      method: 'GET',
      headers: new Headers({
      })
  });
  var category = await response.json();
  var catemain = ''
  for(i=0; i<category.length; i++){
    catemain+= '<a class="catea" href="search.html?id='+category[i].id+'">'+category[i].name+'</a>'
  }
  document.getElementById("listcategory").innerHTML = catemain
}

async function searchHeader(){
    var search = '<div class="container-header__btn"><span class="icon-arrow-left"><i class="fas fa-arrow-left"></i></span><span class="icon-arrow-right"><i class="fas fa-arrow-right"></i></span></div>'+
                '<div class="mobile-button"><div></div></div>'+
                '<div class="container-header__search">'+
                '<div class="container-header__search--content">'+
                    '<label for="search"><i class="fas fa-search"></i></label>'+
                    '<form action="search.html" style="width:100%"><input type="text" name="search" id="search" placeholder="Nhập tên bài hát, Nghệ sĩ hoặc MV" autocomplete="off"></form>'+
                    '<span class="icon-times"><i class="fas fa-times"></i></span>'+
                '</div>'+
                // '<ul class="container-header__history">'+
                    // '<li class="container-header__history--item"><span><i class="fas fa-search"></i></span>'+
                    //   '<p>Sơn Tùng MTP1</p>'+
                    // '</li>'+
                // '</ul>'+
                '</div>'+
                '<ul class="container-header__menu">'+
                '<li class="container-header__item modal-main">'+
                '<a href="login.html"><span style="color: #3460F5;" class="modal-icon"><i class="fa fa-sign-in"></i></span></a>'+
                '<div class="modal">'+
                '<div class="modal-header">'+
                '<h2>Giao diện</h2>'+
                '<span class="modal-close"><i class="fas fa-times"></i></span>'+
                '</div>'+
                '<div class="modal-content">'+
                '<h3 class="modal-caption">Chủ đề</h2>'+
                '</div>'+
                '</div>'+
                '</li>'+
                '<li style="display: none;" class="container-header__item setting-main" id="lisetting"><span><i class="fas fa-cog"></i></span>'+
                

                '</li>'+
                '<li class="container-header__item">'+
                    '<a href="#"><img src="image/icon-avatar.png" alt=""></a>'+
                '</li>'+
                '</ul>'+
                '<div class="container-main__layout">'+
                '<div class="overview">'+
                    '<ul class="song-content__list"></ul>'+
                '</div>'+
              '</div>'
    document.getElementById("container-header-id").innerHTML = search
}

function openSetting(){
  document.getElementById("setting").style.display = 'flex'
}
function closeSetting(){
  document.getElementById("setting").style.display = 'none'
}