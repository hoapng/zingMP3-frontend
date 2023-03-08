var token = localStorage.getItem("token");

async function loadInforuser() {
    var url = 'http://localhost:8080/api/userlogged';
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer '+token
        })
    });
    var user = await response.json();
    console.log(user)
    document.getElementById("myavatar").src = user.avatar
    document.getElementById("myavatars").src = user.avatar
    document.getElementById("tendangnhap").innerText = user.fullname
}


async function loadNhacCaNhan() {
    var url = 'http://localhost:8080/api/user/myfavorite';
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer '+token
        })
    });
    var listfavorite = await response.json();
    console.log(listfavorite)
    var main = '';
    for (i = 0; i < listfavorite.length; i++) {
        var urls = 'http://localhost:8080/api/public/musicSingerByMusicId?id='+listfavorite[i].musicAndMv.id;
        const res = await fetch(urls, {
            method: 'GET',
            headers: new Headers({
            })
        });
        var author = await res.json();
        var au = '';
        for(j=0; j<author.length; j++){
            au += author[j].singer.name
            if(j != author.length -1){
                au += ','
            }
        }
        main += `<li id="listN${i}" class="song-content__item ${listfavorite[i].musicAndMv.id === index ? "active":""}">
                    <div class="song-content__info">
                    <span class="song-content__info-image">
                        <img src="${listfavorite[i].musicAndMv.imageBanner}" alt="">
                        <div class="song-content__info-overplay ${listfavorite[i].musicAndMv.id === index ? "active":""}" data-index=${indexSong}>
                        <i onclick="calls(${listfavorite[i].musicAndMv.id})" class='bx bxs-right-arrow song-content__info-play'></i>
                        <div class="waveform">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        </div>
                    </span>
                    <div class="song-content__user">
                        <div class="song-content__name">${listfavorite[i].musicAndMv.name}</div>
                        <div class="song-content__author"><a href="#">${au}</a></div>
                    </div>
                    </div>
                    <div class="song-content__icon">
                    <a href="${listfavorite[i].musicAndMv.linkMusic}" download style="color:#fff"><i class="fas fa-download"></i></a>
                    <i class="fas fa-trash song-content__icon-heart" onclick="xoaNhacYeuThich(${listfavorite[i].id},${i})"></i>
                    <i class="fas fa-ellipsis-h song-content__icon-ellipsis"></i>
                    <span class="song-content__icon-duration">...</span>
                    </div>
                </li>`
    }
    document.getElementById("myfavorite").innerHTML = main
}

var token = localStorage.getItem("token");
async function xoaNhacYeuThich(id, index) {
    if(token == null){
        swal({ title: "Thông báo", text: "hãy đăng nhập để sử dụng chức năng này!",  type: "warning"},
        function(){  return });
    }
    document.getElementById("listN"+index).remove()
    var url = 'http://localhost:8080/api/user/deletefavorite?id='+id
    const response = await fetch(url, {
        method: 'DELETE',
        headers: new Headers({
            'Authorization': 'Bearer '+token
        })
    });
    if(response.status < 300){
        swal({ title: "Thông báo", text: "đã xóa nhạc cá nhân!",  type: "success"},
        function(){  return });
    }
    else{
        swal({ title: "Thông báo", text: "không thể xóa, đã có lỗi sảy ra!",  type: "error"},
        function(){  return });
    }
}


async function loadAllMVCaNhan() {
    var url = 'http://localhost:8080/api/user/myfavoriteMv';
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer '+token
        })
    });
    var listmv = await response.json();
    if(listmv.length < 1){
        document.getElementById("kocomv").style.display = 'block'
    }
    console.log(listmv)
    var main = '';
    for (i = 0; i < listmv.length; i++) {
        var urls = 'http://localhost:8080/api/public/musicSingerByMusicId?id='+listmv[i].musicAndMv.id;
        const res = await fetch(urls, {
            method: 'GET',
            headers: new Headers({
            })
        });
        var author = await res.json();
        var au = '';
        var avatars = ''
        for(j=0; j<author.length; j++){
            au += author[j].singer.name
            if(j != author.length -1){
                au += ','
            }
            avatars = author[j].singer.avatar
        }
        main += `<li class="album-list__item" id="mvs${i}">
                    <div class="album-list__image">
                    <img src="${listmv[i].musicAndMv.imageBanner}" alt="">
                    <div class="album-list__image-overplay" onclick="loadAvideo(${listmv[i].musicAndMv.id})">
                        <i class="fas fa-trash" onclick="xoaMvYeuThich(${listmv[i].id},${i})"></i>
                        <span><i class="fas fa-play" data-toggle="modal" data-target=".bd-example-modal-lg"></i></span>
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                    </div>
                    <table class="tablemv">
                        <tr>
                            <td rowspan="2"><img class="imgmv" src="${avatars}"></td>
                            <td><div class="album-list__heading">${listmv[i].musicAndMv.name}</div></td>
                        </tr>
                        <tr>
                            <td><div class="tencsmv">${au}</div></td>
                        </tr>
                    </table>
                </li>`
    }
    document.getElementById("listmva").innerHTML = main
}

async function xoaMvYeuThich(id, index) {
    if(token == null){
        swal({ title: "Thông báo", text: "hãy đăng nhập để sử dụng chức năng này!",  type: "warning"},
        function(){  return });
    }
    document.getElementById("mvs"+index).remove()
    var url = 'http://localhost:8080/api/user/deletefavorite?id='+id
    const response = await fetch(url, {
        method: 'DELETE',
        headers: new Headers({
            'Authorization': 'Bearer '+token
        })
    });
    if(response.status < 300){
        swal({ title: "Thông báo", text: "đã xóa mv cá nhân!",  type: "success"},
        function(){  return });
    }
    else{
        swal({ title: "Thông báo", text: "không thể xóa, đã có lỗi sảy ra!",  type: "error"},
        function(){  return });
    }
}

async function loadAvideo(id){
    var url = 'http://localhost:8080/api/public/getMusicAndMvById?id='+id;
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
        })
    });
    var mv = await response.json();
    document.getElementById("tenvideo").innerHTML = mv.name
    document.getElementById("ngaydangvideo").innerHTML = mv.createdDate
    document.getElementById("linkdownload").href = mv.linkMusic
    document.getElementById("sourcevideo").innerHTML = `<video width="100%;height:90%" controls>
                                                            <source src="${mv.linkMusic}#t=1" type="video/mp4">
                                                            Your browser does not support HTML video.
                                                        </video>`
}