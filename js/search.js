var index = 0;
var indexSong = 0;
async function loadSearch(){
    var search = window.location.search.split('search=')[1];
    var url = 'http://localhost:8080/api/public/searchAllMusic?search='+search;
    var id = window.location.search.split('id=')[1];
    if(id != null){
        url = 'http://localhost:8080/api/public/searchAllMusicByCate?id='+id;
    }
    const response = await fetch(url, {
        method: 'GET', headers: new Headers({ })
    });
    var list = await response.json()
    console.log(list)
    var listmv = []
    var listmusic = []
    for(i=0; i< list.length; i++){
        if(list[i].type == 0){
            listmv.push(list[i])
        }
        else{
            listmusic.push(list[i])
        }
    }


    var main = '';
    if(listmv.length <1){
        document.getElementById("kocoms").style.display = 'flex'
    }
    for (i = 0; i < listmv.length; i++) {
        var urls = 'http://localhost:8080/api/public/musicSingerByMusicId?id='+listmv[i].id;
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
        main += `<li class="album-list__item">
                    <div class="album-list__image">
                    <img src="${listmv[i].imageBanner}" alt="">
                    <div class="album-list__image-overplay">
                        <i class="fas fa-heart" onclick="themYeuThichMv(${listmv[i].id})"></i>
                        <span><i class="fas fa-play" onclick="loadAvideo(${listmv[i].id})" data-toggle="modal" data-target=".bd-example-modal-lg"></i></span>
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                    </div>
                    <table class="tablemv">
                        <tr>
                            <td rowspan="2"><img class="imgmv" src="${avatars}"></td>
                            <td><div class="album-list__heading">${listmv[i].name}</div></td>
                        </tr>
                        <tr>
                            <td><div class="tencsmv">${au}</div></td>
                        </tr>
                    </table>
                </li>`
    }
    document.getElementById("listmv").innerHTML = main



    var main = '';
    if(listmusic.length < 1){
        document.getElementById("kocomv").style.display = 'flex'
    }
    for (i = 0; i < listmusic.length; i++) {
        var urls = 'http://localhost:8080/api/public/musicSingerByMusicId?id='+listmusic[i].id;
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
        main += `<li class="song-content__item ${listmusic[i].id === index ? "active":""}">
                    <div class="song-content__info">
                    <span onclick="calls(${listmusic[i].id})" class="song-content__info-image">
                        <img onclick="calls(${listmusic[i].id})" src="${listmusic[i].imageBanner}" alt="">
                        <div class="song-content__info-overplay ${listmusic[i].id === index ? "active":""}" data-index=${indexSong}>
                        <i onclick="calls(${listmusic[i].id})" class='bx bxs-right-arrow song-content__info-play'></i>
                        <div class="waveform">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        </div>
                    </span>
                    <div class="song-content__user">
                        <div class="song-content__name">${listmusic[i].name}</div>
                        <div class="song-content__author"><a href="#">${au}</a></div>
                    </div>
                    </div>
                    <div class="song-content__icon">
                    <a href="${listmusic[i].linkMusic}" download style="color:#fff"><i class="fas fa-download"></i></a>
                    <i class="fas fa-heart song-content__icon-heart" onclick="themYeuThich(${listmusic[i].id})"></i>
                    <i class="fas fa-ellipsis-h song-content__icon-ellipsis"></i>
                    <span class="song-content__icon-duration">...</span>
                    </div>
                </li>`
    }
    document.getElementById("songcontent__list").innerHTML = main
}
var token = localStorage.getItem("token");
async function themYeuThich(id) {
    if(token == null){
        swal({ title: "Thông báo", text: "hãy đăng nhập để sử dụng chức năng này!",  type: "warning"},
        function(){  return });
    }
    var url = 'http://localhost:8080/api/user/addFavosites'
    var favorite = {
        "musicAndMv":{
            "id":id
        }
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer '+token, 
            'Content-Type': 'application/json'
        }),
        body:JSON.stringify(favorite)
    });
    if(response.status < 300){
        swal({ title: "Thông báo", text: "đã thêm vào nhạc cá nhân!",  type: "success"},
        function(){  return });
    }
    else{
        swal({ title: "Thông báo", text: "bài hát đã được thêm!",  type: "warning"},
        function(){  return });
    }
}

var token = localStorage.getItem("token");
async function themYeuThichMv(id) {
    if(token == null){
        swal({ title: "Thông báo", text: "hãy đăng nhập để sử dụng chức năng này!",  type: "warning"},
        function(){  return });
    }
    var url = 'http://localhost:8080/api/user/addFavosites'
    var favorite = {
        "musicAndMv":{
            "id":id
        }
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer '+token, 
            'Content-Type': 'application/json'
        }),
        body:JSON.stringify(favorite)
    });
    if(response.status < 300){
        swal({ title: "Thông báo", text: "đã thêm vào nhạc cá nhân!",  type: "success"},
        function(){  return });
    }
    else{
        swal({ title: "Thông báo", text: "bài hát đã được thêm!",  type: "warning"},
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
    $('body').on('hidden.bs.modal', '.modal', async function () {
        document.getElementById("sourcevideo").innerHTML = `<video width="100%;height:90%" controls>
        <source src="" type="video/mp4">
        Your browser does not support HTML video.
        </video>`
    });
}