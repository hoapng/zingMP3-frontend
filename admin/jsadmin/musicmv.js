
var token = localStorage.getItem("token");
async function loadAllMusic() {
    var url = 'http://localhost:8080/api/public/getAllMusicAdmin';
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
        })
    });
    var listMusic = await response.json();
    console.log(linkmusic)
    var main = '';
    var loainhac = "nhạc"
    for (i = 0; i < listMusic.length; i++) {
        loainhac = "nhạc"
        if(listMusic[i].type == 0){
            loainhac = "MV"
        }
        main += '<tr>'+
                    '<td>#'+listMusic[i].id+'</td>'+
                    '<td><img src="'+listMusic[i].imageBanner+'" style="width: 100px;"></td>'+
                    '<td>'+listMusic[i].name+'</td>'+
                    '<td>'+listMusic[i].createdDate+'</td>'+
                    '<td>'+listMusic[i].numViews+'</td>'+
                    '<td>'+loainhac+'</td>'+
                    '<td>'+listMusic[i].country.name+'</td>'+
                    '<td>'+listMusic[i].category.name+'</td>'+
                    '<td><button onclick="deleteMusic('+listMusic[i].id+')" class="btn btn-danger"><i class="fa fa-trash"></i> Xóa</button></td>'+
                    '<td><a href="addMusicMv.html?id='+listMusic[i].id+'" class="btn btn-success"><i class="fa fa-trash"></i> Sửa</a></td>'+
                '</tr>'
    }
    document.getElementById("listmusic").innerHTML = main
    $('#example').DataTable();
}

async function loadAmusic() {
    var id = window.location.search.split('=')[1];
    if(id != null){
        var url = 'http://localhost:8080/api/public/getMusicAndMvById?id='+id;
        const response = await fetch(url, {
            method: 'GET',
            headers: new Headers({
            })
        });
        var musicmv = await response.json();
        document.getElementById("idmusic").value = musicmv.id
        document.getElementById("muname").value = musicmv.name
        document.getElementById("loai").value = musicmv.type
        document.getElementById("anh").src = musicmv.imageBanner
        document.getElementById("category").value = musicmv.category.id
        document.getElementById("quocgia").value = musicmv.country.id
        linkbanner = musicmv.imageBanner
        linkmusic = musicmv.linkMusic

        var url = 'http://localhost:8080/api/public/musicSingerByMusicId?id='+id;
        const res = await fetch(url, {
            method: 'GET',
            headers: new Headers({
            })
        });
        var lists = await res.json();
        console.log(lists)
        $.each(lists, function(i,e){
            $("#nghesi option[value='" + e.singer.id + "']").prop("selected", true);
        });
    }
}






var linkbanner = ""
var linkmusic = ""
async function saveMusic() {
    document.getElementById("loadimg").style.display = 'block'
    var uploadimg = 'http://localhost:8080/api/public/upload';
    const filePath = document.getElementById('file')
    const formData = new FormData()
    formData.append("file", filePath.files[0])
    const res = await fetch(uploadimg, {
        method: 'POST',
        headers: new Headers({
        }),
        body: formData
    });
    if(res.status < 300){
        linkbanner = await res.text(); 
    }

    const filePaths = document.getElementById('filenhac')
    const formDatas = new FormData()
    formDatas.append("file", filePaths.files[0])
    const resp = await fetch(uploadimg, {
        method: 'POST',
        headers: new Headers({
        }),
        body: formDatas
    });

    if(resp.status < 300){
        linkmusic = await resp.text(); 
    }
    var id = window.location.search.split('=')[1];
    var ngesi = $('#nghesi').val();
    var muname =  document.getElementById("muname").value
    var loai =  document.getElementById("loai").value
    var quocgia =  document.getElementById("quocgia").value
    var category =  document.getElementById("category").value

    var musicMv = {
        "id":id,
        "name":muname,
        "linkMusic":linkmusic,
        "imageBanner":linkbanner,
        "type":loai,
        "country":{
            "id":quocgia
        },
        "category":{
            "id":category
        }
    }
    var urladd = 'http://localhost:8080/api/admin/addMusicAndMv';
    const response = await fetch(urladd, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(musicMv)
    });

    var music = await response.json();
    var urlmsNgheSi = 'http://localhost:8080/api/admin/addMusicSinger';
    for(i=0; i<ngesi.length; i++){
        var ms = {
            "singer":{
                "id":ngesi[i]
            },
            "musicAndMv":{
                "id":music.id
            }
        }
        const response = await fetch(urlmsNgheSi, {
            method: 'POST',
            headers: new Headers({
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(ms)
        });
    }
    if(response.status < 300){
        swal({
            title: "Thông báo", 
            text: "thêm/sửa bài hát/MV thành công!", 
            type: "success"
          },
        function(){ 
            window.location.replace('musicmv.html')
        });
    }
    else{
        swal({
            title: "Thông báo", 
            text: "thêm/sửa bài hát/MV  thất bại", 
            type: "error"
            },
        function(){ 
            window.location.reload();
        });
    }
    document.getElementById("loadimg").style.display = 'none'
}

async function loadAllSingerSelect() {
    var url = 'http://localhost:8080/api/public/singers';
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
        })
    });
    var listSinger = await response.json();
    var main = '';
    for (i = 0; i < listSinger.length; i++) {
        main += '<option value="'+listSinger[i].id+'">'+listSinger[i].name+'</option>'
    }
    document.getElementById("nghesi").innerHTML = main
}

async function loadAllCountrySelect() {
    var url = 'http://localhost:8080/api/public/country';
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
        })
    });
    var listCountry = await response.json();
    var main = '';
    for (i = 0; i < listCountry.length; i++) {
        main += '<option value="'+listCountry[i].id+'">'+listCountry[i].name+'</option>'
    }
    document.getElementById("quocgia").innerHTML = main
}

async function loadAllCategorySelect() {
    var url = 'http://localhost:8080/api/public/categories';
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
        })
    });
    var listCategory = await response.json();
    var main = '';
    for (i = 0; i < listCategory.length; i++) {
        main += '<option value="'+listCategory[i].id+'">'+listCategory[i].name+'</option>'
    }
    document.getElementById("category").innerHTML = main
}

async function deleteMusic(id) {
    var url = 'http://localhost:8080/api/admin/deleteMusicAndMv?id=' + id;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    if (response.status < 300) {
        swal({
            title: "Thông báo", 
            text: "xóa Nhạc/Mv thành công!", 
            type: "success"
          },
        function(){ 
            window.location.reload();
        });
    }
    else {
        swal({
            title: "Thông báo", 
            text: "không thể xóa", 
            type: "error"
          },
        function(){ 
            window.location.reload();
        });
    }
}