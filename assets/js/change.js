var music = JSON.parse(localStorage.getItem("musicnow"));
async function loadInitMusic(){
    var music = JSON.parse(localStorage.getItem("musicnow"));
    if(music == null){
        var url = 'http://localhost:8080/api/public/getFirstMusic'
        const response = await fetch(url, {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer '+token
            })
        });
        var mus = await response.json();
        var urls = 'http://localhost:8080/api/public/musicSingerByMusicId?id='+mus.id;
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
        mus.author = au
        window.localStorage.setItem('musicnow', JSON.stringify(music));
    }
    music = JSON.parse(localStorage.getItem("musicnow"));
    const musicName = document.querySelector(".music-user__name");
    const musicAuthor = document.querySelector(".music-user__author");
    const musicImg = document.querySelector(".music-image img");
    const audio = document.querySelector("#audio");
    const musicDuration = document.querySelector(".music-duration");
    musicName.textContent = music.name
    musicAuthor.textContent = music.author
    musicImg.src = music.imageBanner;
    audio.src = music.linkMusic;
    setTimeout(() => {
      musicDuration.textContent = convertTime(audio.duration);
    }, 600);
    if(localStorage.getItem("dangchay") === "yes"){
        document.querySelector("#audio").src = music.linkMusic+'#t='+localStorage.getItem("times")
        playMusic();
    }
    else{
        pauseMusic();
    }
}


async function nextMusic(){
    var musics = JSON.parse(localStorage.getItem("musicnow"));
    if(musics == null){
        return;
    }
    var token = localStorage.getItem("token");
    var url = 'http://localhost:8080/api/public/nextMusic?id='+musics.id;
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer '+token
        })
    });
    if(response.status > 300){
        swal({ title: "Thông báo", text: "đã hết bài hát!",  type: "warning"},
        function(){  return });
    }
    else{
        var music = await response.json();
        calls(music.id)
    }
}

async function preMusic(){
    var musics = JSON.parse(localStorage.getItem("musicnow"));
    if(musics == null){
        return;
    }
    var token = localStorage.getItem("token");
    var url = 'http://localhost:8080/api/public/preMusic?id='+musics.id;
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer '+token
        })
    });
    if(response.status > 300){
        swal({ title: "Thông báo", text: "đã hết bài hát!",  type: "warning"},
        function(){  return });
    }
    else{
        var music = await response.json();
        calls(music.id)
    }
}


async function calls(id){
    var url = 'http://localhost:8080/api/public/getMusicAndMvById?id='+id;
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
        })
    });
    var music = await response.json();
    var urls = 'http://localhost:8080/api/public/musicSingerByMusicId?id='+id;
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
    music.author = au
    window.localStorage.setItem('musicnow', JSON.stringify(music));

    const musicName = document.querySelector(".music-user__name");
    const musicAuthor = document.querySelector(".music-user__author");
    const musicImg = document.querySelector(".music-image img");
    const audio = document.querySelector("#audio");
    const musicDuration = document.querySelector(".music-duration");
    musicName.textContent = music.name
    musicAuthor.textContent = au
    musicImg.src =  music.imageBanner;
    audio.src = music.linkMusic;
    setTimeout(() => {
      musicDuration.textContent = convertTime(audio.duration);
    }, 600);
    playMusic();
}

function playMusic(){
    const musicImage = document.querySelector(".music-image");
    const audio = document.querySelector("#audio");
    const songContentList = document.querySelector(".container-main__layout .overview .song-content__list");
    audio.play();
    document.getElementById("pausebtn").style.display = 'flex'
    document.getElementById("playbtn").style.display = 'none'
    musicImage.classList.add("active");
    window.localStorage.setItem('dangchay', "yes");
    // songContentList.querySelector(".song-content__item.active .song-content__info-overplay").classList.add("active");
}


function pauseMusic(){
    const audio = document.querySelector("#audio");
    const musicImage = document.querySelector(".music-image");
    const songContentList = document.querySelector(".container-main__layout .overview .song-content__list");
    audio.pause();
    document.getElementById("pausebtn").style.display = 'none'
    document.getElementById("playbtn").style.display = 'flex'
    musicImage.classList.remove("active");
    window.localStorage.setItem('dangchay', "no");
    // songContentList.querySelector(".song-content__item.active .song-content__info-overplay").classList.remove("active");
}

function convertTime(time) {
    let hours, minutes, seconds;
    hours = Math.floor(time / 3600);
    time %= 3600;
    minutes = Math.floor(time / 60);
    time %= 60;
    seconds = Math.floor(time);
    if (hours < 1) {
        return `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    }
}

window.addEventListener("load", function () {

const musicName = document.querySelector(".music-user__name");
const musicAuthor = document.querySelector(".music-user__author");
const musicImage = document.querySelector(".music-image");
const musicImg = document.querySelector(".music-image img");
const musicRandom = document.querySelector(".music-random");
const musicRedo = document.querySelector(".music-redo");
const playBtn = document.querySelector(".music-play");
const prevBtn = document.querySelector(".music-prev");
const nextBtn = document.querySelector(".music-next");
const progressVolume = document.querySelector(".progress-volume");
const audio = document.querySelector("#audio");
const musicCurrent = document.querySelector(".music-current");
const musicDuration = document.querySelector(".music-duration");
const progressContainer = document.querySelector(".progress-container");
const progress = document.querySelector(".progress");
const controlVolume = document.querySelector(".music-control__volume");
const songContentList = document.querySelector(".container-main__layout .overview .song-content__list");
const progressMobile = document.querySelector(".progress-mobile div");
const musicAngleDown = document.querySelector("#music .angle-down");
let playing = 1;

audio.addEventListener("timeupdate", handleUpdateTime);
progressVolume.addEventListener("input", handleChangeVolume);
progressVolume.value = JSON.parse(localStorage.getItem("volume")) * 100 || 100;
audio.volume = JSON.parse(localStorage.getItem("volume")) || 1;


function handleUpdateTime() {
    const { duration, currentTime } = audio;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    progressMobile.style.width = `${progressPercent}%`;
    musicCurrent.textContent = convertTime(currentTime);
    window.localStorage.setItem('times', currentTime);
    if(currentTime == duration){
        nextMusic()
    }
}

function handleChangeVolume(e) {
    const percent =(e.target.value / 100);
    audio.volume = percent;
    localStorage.setItem("volume", JSON.stringify(percent));
}
    

let isReady = false;
progressContainer.addEventListener("mousedown", function () {
    isReady = true;
    progressContainer.classList.add("active");
})
document.addEventListener("mousemove", function (e) {
    const clientX = e.clientX;
    const left = progressContainer.getBoundingClientRect().left;
    const width = progressContainer.getBoundingClientRect().width;
    const min = left;
    const max = width + left;
    if (isReady && clientX >= min && clientX <= max) {
        const percent = (clientX - left) / width;
        progress.style.width = `${percent * 100}%`;
        audio.currentTime = percent * audio.duration;
    }
    })
    document.addEventListener("mouseup", function (e) {
    progressContainer.classList.remove("active");
    isReady = false;
    })
})