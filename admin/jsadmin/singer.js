var token = localStorage.getItem("token");
async function loadAllSinger() {
    var url = 'http://localhost:8080/api/public/singers';
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
        })
    });
    var listSinger = await response.json();
    var main = '';
    for (i = 0; i < listSinger.length; i++) {
        main += '<tr>'+
                    '<td>#'+listSinger[i].id+'</td>'+
                    '<td><img src="'+listSinger[i].avatar+'" style="width: 100px;"></td>'+
                    '<td>'+listSinger[i].name+'</td>'+
                    '<td>'+listSinger[i].birthYear+'</td>'+
                    '<td><button onclick="deleteSinger('+listSinger[i].id+')" class="btn btn-danger"><i class="fa fa-trash"></i> Xóa</button></td>'+
                    '<td><a href="addsinger.html?id='+listSinger[i].id+'" class="btn btn-success"><i class="fa fa-trash"></i> Sửa</a></td>'+
                '</tr>'
    }
    document.getElementById("listsinger").innerHTML = main
    $('#example').DataTable();
}

async function loadASinger() {
    var id = window.location.search.split('=')[1];
    if(id != null){
        var url = 'http://localhost:8080/api/public/singersById?id='+id;
        const response = await fetch(url, {
            method: 'GET',
            headers: new Headers({
            })
        });
        var singer = await response.json();
        document.getElementById("idsinger").value = singer.id
        document.getElementById("singername").value = singer.name
        document.getElementById("namsinh").value = singer.birthYear
        document.getElementById("anh").src = singer.avatar
        linkimage = singer.avatar
    }
}

var linkimage = "";
async function saveSinger() {
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
        linkimage = await res.text(); 
    }

    var id = window.location.search.split('=')[1];
    var url = 'http://localhost:8080/api/admin/addsinger';
    var singername = document.getElementById("singername").value
    var namsinh = document.getElementById("namsinh").value
    if(singername == "" || namsinh == "" || linkimage == ""){
        alert("không được để trống dữ liệu");
        return;
    }
    var singer = {
        "id": id,
        "name": singername,
        "birthYear":namsinh,
        "avatar":linkimage
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(singer)
    });
    if (response.status < 300) {
        swal({
            title: "Thông báo", 
            text: "thêm/sửa ca sĩ thành công!", 
            type: "success"
          },
        function(){ 
            window.location.replace('singer.html')
        });
    }
    else {
        swal({
            title: "Thông báo", 
            text: "thêm/sửa ca sĩ thất bại", 
            type: "error"
          },
        function(){ 
            window.location.reload();
        });
    }
}

async function deleteSinger(id) {
    var url = 'http://localhost:8080/api/admin/deletesinger?id=' + id;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    if (response.status < 300) {
        swal({
            title: "Thông báo", 
            text: "xóa ca sĩ thành công!", 
            type: "success"
          },
        function(){ 
            window.location.reload();
        });
    }
    else {
        swal({
            title: "Thông báo", 
            text: "không thể xóa, đã có bài hát của ca sĩ này", 
            type: "error"
          },
        function(){ 
            window.location.reload();
        });
    }
}