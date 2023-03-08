var index = 0;
var indexSong = 0;
async function loadAllMusic() {
    var url = 'http://localhost:8080/api/public/getAllMusic?size=100&page=0';
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
        })
    });
    var listmusic = await response.json();
    console.log(listmusic)
    var main = '';
    for (i = 0; i < listmusic.content.length; i++) {
        var urls = 'http://localhost:8080/api/public/musicSingerByMusicId?id='+listmusic.content[i].id;
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
        main += `<li class="song-content__item ${listmusic.content[i].id === index ? "active":""}">
                    <div class="song-content__info">
                    <span class="song-content__info-image">
                        <img src="${listmusic.content[i].imageBanner}" alt="">
                        <div class="song-content__info-overplay ${listmusic.content[i].id === index ? "active":""}" data-index=${indexSong}>
                        <i onclick="calls(${listmusic.content[i].id})" class='bx bxs-right-arrow song-content__info-play'></i>
                        <div class="waveform">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        </div>
                    </span>
                    <div class="song-content__user">
                        <div class="song-content__name">${listmusic.content[i].name}</div>
                        <div class="song-content__author"><a href="#">${au}</a></div>
                    </div>
                    </div>
                    <div class="song-content__icon">
                    <a href="${listmusic.content[i].linkMusic}" download style="color:#fff"><i class="fas fa-download"></i></a>
                    <i class="fas fa-heart song-content__icon-heart" onclick="themYeuThich(${listmusic.content[i].id})"></i>
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