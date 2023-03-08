async function loadAllMV() {
    var url = 'http://localhost:8080/api/public/getAllMv?size=40&page=0';
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
        })
    });
    var listmv = await response.json();
    var main = '';
    for (i = 0; i < listmv.content.length; i++) {
        var urls = 'http://localhost:8080/api/public/musicSingerByMusicId?id='+listmv.content[i].id;
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
                    <img src="${listmv.content[i].imageBanner}" alt="">
                    <div class="album-list__image-overplay">
                        <i class="fas fa-heart" onclick="themYeuThichMv(${listmv.content[i].id})"></i>
                        <span><i class="fas fa-play" onclick="loadAvideo(${listmv.content[i].id})" data-toggle="modal" data-target=".bd-example-modal-lg"></i></span>
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                    </div>
                    <table class="tablemv">
                        <tr>
                            <td rowspan="2"><img class="imgmv" src="${avatars}"></td>
                            <td><div class="album-list__heading">${listmv.content[i].name}</div></td>
                        </tr>
                        <tr>
                            <td><div class="tencsmv">${au}</div></td>
                        </tr>
                    </table>
                </li>`
    }
    document.getElementById("listmv").innerHTML = main
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