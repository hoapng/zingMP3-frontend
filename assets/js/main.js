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



  // Focus input history
  const searchInput = document.querySelector("#search");
  const menuHistory = document.querySelector(".container-header__history");
  const menuHistoryItems = document.querySelectorAll(".container-header__history--item");
  const iconTimes = document.querySelector(".icon-times");
  const searchContainer = document.querySelector(".container-header__search");
  searchInput.addEventListener("focus", function() {
    menuHistory.classList.add("show");
    searchContainer.style = `border-radius: 20px 20px 0 0`;
  });
  searchInput.addEventListener("blur", function() {
    menuHistory.classList.remove("show");
    searchContainer.style = `border-radius: 20px`;
  });
  searchInput.addEventListener("input", function(e) {
    const value = e.target.value;
    if(value) {
      iconTimes.classList.add("show");
    }
    else {
      iconTimes.classList.remove("show");
    }
  });
  [...menuHistoryItems].forEach(item => item.addEventListener("click", function(e) {
    const textContent = item.querySelector("p").textContent;
    searchInput.value = textContent;
    iconTimes.classList.add("show");
  }));
  iconTimes.addEventListener("click", function() {
    searchInput.value = "";
    iconTimes.classList.remove("show");
  });
  

  //Modal
  const modalMain = document.querySelector(".modal-main");
  const modal = document.querySelector(".modal");
  const modalClose = document.querySelector(".modal-close");
  modalMain.addEventListener("click", function() {
    modal.classList.add("show");
  });
  modalClose.addEventListener("click", function(e) {
    e.stopPropagation();
    modal.classList.remove("show");
  });

  // Setting
  const settingMain = document.querySelector(".setting-main");
  const setting = document.querySelector(".setting");
  settingMain.addEventListener("click", function() {
    setting.classList.toggle("show");
  })

  //Container main list
  const containerMainListItems = document.querySelectorAll(".container-main__list li");
  const songContentImages = document.querySelector(".container-main__layout .song-content__images");
  const containerMainSong = document.querySelector(".container-main__layout .song");
  const containerMainPlaylist = document.querySelector(".container-main__layout .playlist");
  const containerMainAlbum = document.querySelector(".container-main__layout .album");
  const containerLayoutOverview = document.querySelector(".container-main__layout .overview");
  const containerLayoutArtist = document.querySelector(".container-main__layout .artist-container");
  const containerLayoutMV = document.querySelector(".container-main__layout .mv-container");
  const containerLayoutUpload = document.querySelector(".container-main__layout .upload-container");

  [...containerMainListItems].forEach(item => item.addEventListener("click", function() {
    const active = item.parentElement.querySelector(".active");
    active.classList.remove("active");
    item.classList.add("active");
    const indexItem = parseInt(item.dataset.index);
    if(indexItem === 2) {
      songContentImages.style = `opacity: 0; visibility: hidden; width: 0; margin-right: 0;`;
      songContentList.style.maxHeight = `500px`;
      containerMainPlaylist.style.display = "none";
      containerMainAlbum.style.display = "none";
    }
    else {
      songContentImages.style = `opacity: 1; visibility: visible; width: 245px; margin-right: 20px;`;
      songContentList.style.maxHeight = `245px`;
      containerMainPlaylist.style.display = "block";
      containerMainAlbum.style.display = "block";
    }
    if(indexItem === 3) {
      containerMainSong.style.display = "none";
      containerMainAlbum.style.display = "none";
    }
    else {
      containerMainSong.style.display = "block";
    }
    if(indexItem === 4) {
      containerLayoutArtist.style.display = "block";
      containerLayoutOverview.style.display = "none";
      containerMainSong.style.display = "none";
      containerMainPlaylist.style.display = "none";
      containerMainAlbum.style.display = "none";
    }
    else {
      containerLayoutOverview.style.display = "block";
      containerLayoutArtist.style.display = "none";
    }
    if(indexItem === 5) {
      containerMainSong.style.display = "none";
      containerMainPlaylist.style.display = "none";
    }
    if(indexItem === 6) {
      containerLayoutOverview.style.display = "none";
      containerLayoutMV.style.display = "block";
    }
    else {
      containerLayoutOverview.style.display = "block";
      containerLayoutMV.style.display = "none";
    }
    if(indexItem === 7) {
      containerLayoutUpload.style.display = "block";
      containerLayoutOverview.style.display = "none";
    }
    else {
      containerLayoutUpload.style.display = "none";
    }
  }));


  // Modal create new playlist 
  const navPlaylist = document.querySelector("#nav .nav-playlist");
  const playlistCreate = document.querySelector(".container-main__layout .playlist-create")
  const modalPlaylist = document.querySelector(".modal-create__playlist");
  const modalFormPlaylist = document.querySelector(".modal-form");
  const containerPlaylistList = document.querySelector(".container-main__layout .playlist .playlist-list");
  const inputPlaylist = document.querySelector(".input-playlist");
  const buttonSubmitPlaylist = document.querySelector(".button-submit");

  // navPlaylist.addEventListener("click", handleAddPlaylist);
  // playlistCreate.addEventListener("click", handleAddPlaylist)
  function handleAddPlaylist(e) {
    modalPlaylist.classList.add("show");
    inputPlaylist.focus();
  }
  // modalPlaylist.addEventListener("click", function(e) {
  //   if(e.target.matches(".modal-form__close")) {
  //     modalPlaylist.classList.remove("show");
  //   }
  // });

  modalFormPlaylist.addEventListener("submit", function(e) {
    e.preventDefault();
    const value = this.elements["input-playlist"].value;
    if(value) {
      renderPlaylist(value);
      this.elements["input-playlist"].value = "";
      modalPlaylist.classList.remove("show");
    }
  });
  function renderPlaylist(value) {
    const template = `<li class="playlist-list__item">
    <div class="playlist-list__image">
      <img src="./assets/img/img1.jpg" alt="">
      <div class="playlist-list__image-overplay">
        <i class="fas fa-times"></i>
        <span><i class="fas fa-play"></i></span>
        <i class="fas fa-ellipsis-h"></i>
      </div>
    </div>
    <div class="playlist-list__content">
      <div class="playlist-list__heading">${value}</div>
      <div class="playlist-list__desc">Zing MP3</div>
    </div>
  </li>`;
  containerPlaylistList.insertAdjacentHTML("beforeend", template);
  }

  // Mobile menu
  const mobileBtn = document.querySelector(".mobile-button");
  const nav = document.querySelector("#nav");
  mobileBtn.addEventListener("click", function() {
    mobileBtn.classList.toggle("active");
    nav.classList.toggle("active");
  })

  //Container Body Mixtape carousel
  const mixtape = {
    next: document.querySelectorAll(".container-body__mixtape .child-icon i")[1],
    prev:  document.querySelectorAll(".container-body__mixtape .child-icon i")[0],
    row: document.querySelector(".container-body__mixtape .child-row"),
    item: document.querySelectorAll(".container-body__mixtape .child-row__item"),
    column: 4,
    index: 0,
    position: 0,
  }
  carousel(mixtape);

  //Container Body Suggest carousel  
  const suggest = {
    next: document.querySelectorAll(".container-body__suggest .child-icon i")[1],
    prev:  document.querySelectorAll(".container-body__suggest .child-icon i")[0],
    row: document.querySelector(".container-body__suggest .child-row"),
    item: document.querySelectorAll(".container-body__suggest .child-row__item"),
    column: 4,
    index: 0,
    position: 0,
  }
  carousel(suggest)

  //Container Body Recent carousel  
  const recent = {
    next: document.querySelectorAll(".container-body__recent .child-icon i")[1],
    prev:  document.querySelectorAll(".container-body__recent .child-icon i")[0],
    row: document.querySelector(".container-body__recent .child-row"),
    item: document.querySelectorAll(".container-body__recent .child-row__item"),
    column: 4,
    index: 0,
    position: 0,
  }
  carousel(recent)

  //Container Body Mix carousel  
  const mix = {
    next: document.querySelectorAll(".container-body__mix .child-icon i")[1],
    prev:  document.querySelectorAll(".container-body__mix .child-icon i")[0],
    row: document.querySelector(".container-body__mix .child-row"),
    item: document.querySelectorAll(".container-body__mix .child-row__item"),
    column: 4,
    index: 0,
    position: 0,
  }
  carousel(mix)

  //Container Body Category carousel  
  const category = {
    next: document.querySelectorAll(".container-body__category .child-icon i")[1],
    prev:  document.querySelectorAll(".container-body__category .child-icon i")[0],
    row: document.querySelector(".container-body__category .child-row"),
    item: document.querySelectorAll(".container-body__category .child-row__item"),
    column: 4,
    index: 0,
    position: 0,
  }
  carousel(category)

  //Container Body Discover carousel  
  const discover = {
    next: document.querySelectorAll(".container-body__discover .child-icon i")[1],
    prev:  document.querySelectorAll(".container-body__discover .child-icon i")[0],
    row: document.querySelector(".container-body__discover .child-row"),
    item: document.querySelectorAll(".container-body__discover .child-row__item"),
    column: 4,
    index: 0,
    position: 0,
  }
  carousel(discover);

  //Container Body International carousel  
  const international = {
    next: document.querySelectorAll(".container-body__international .child-icon i")[1],
    prev:  document.querySelectorAll(".container-body__international .child-icon i")[0],
    row: document.querySelector(".container-body__international .child-row"),
    item: document.querySelectorAll(".container-body__international .child-row__item"),
    column: 4,
    index: 0,
    position: 0,
  }
  carousel(international)

  //Container Body Romance carousel  
  const romance = {
    next: document.querySelectorAll(".container-body__romance .child-icon i")[1],
    prev:  document.querySelectorAll(".container-body__romance .child-icon i")[0],
    row: document.querySelector(".container-body__romance .child-row"),
    item: document.querySelectorAll(".container-body__romance .child-row__item"),
    column: 4,
    index: 0,
    position: 0,
  }
  carousel(romance)

  //Container Body Top 100 carousel  
  const top = {
    next: document.querySelectorAll(".container-body__top .child-icon i")[1],
    prev:  document.querySelectorAll(".container-body__top .child-icon i")[0],
    row: document.querySelector(".container-body__top .child-row"),
    item: document.querySelectorAll(".container-body__top .child-row__item"),
    column: 4,
    index: 0,
    position: 0,
  }
  carousel(top)

  //Container Body Concert carousel  
  const concert = {
    next: document.querySelectorAll(".container-body__concert .child-icon i")[1],
    prev:  document.querySelectorAll(".container-body__concert .child-icon i")[0],
    row: document.querySelector(".container-body__concert .child-row"),
    item: document.querySelectorAll(".container-body__concert .child-row__item"),
    column: 4,
    index: 0,
    position: 0,
  }
  carousel(concert)

  //Container Body hits carousel  
  const hits = {
    next: document.querySelectorAll(".container-body__hits .child-icon i")[1],
    prev:  document.querySelectorAll(".container-body__hits .child-icon i")[0],
    row: document.querySelector(".container-body__hits .child-row"),
    item: document.querySelectorAll(".container-body__hits .child-row__item"),
    column: 4,
    index: 0,
    position: 0,
  }
  carousel(hits)

  //Container Body heard carousel  
  const heard = {
    next: document.querySelectorAll(".container-body__heard .child-icon i")[1],
    prev:  document.querySelectorAll(".container-body__heard .child-icon i")[0],
    row: document.querySelector(".container-body__heard .child-row"),
    item: document.querySelectorAll(".container-body__heard .child-row__item"),
    column: 4,
    index: 0,
    position: 0,
  }
  carousel(heard)

  //Container Body release carousel  
  const release = {
    next: document.querySelectorAll(".container-body__release .child-icon i")[1],
    prev:  document.querySelectorAll(".container-body__release .child-icon i")[0],
    row: document.querySelector(".container-body__release .container-body__release-list"),
    item: document.querySelectorAll(".container-body__release .container-body__release-list li"),
    column: 4,
    index: 0,
    position: 0,
  }
  carousel(release)

  //Container Body mv carousel  
  const mv = {
    next: document.querySelectorAll(".container-body__mv .child-icon i")[1],
    prev:  document.querySelectorAll(".container-body__mv .child-icon i")[0],
    row: document.querySelector(".container-body__mv .mv-list"),
    item: document.querySelectorAll(".container-body__mv .mv-list li"),
    column: 3,
    index: 0,
    position: 0,
  }
  carousel(mv)

  //Container Body live carousel  
  const live = {
    next: document.querySelector("#main .container-body .container-body__live .icon-arrow-right"),
    prev:  document.querySelector("#main .container-body .container-body__live .icon-arrow-left"),
    row: document.querySelector("#main .container-body .container-body__live .live-list"),
    item: document.querySelectorAll("#main .container-body .container-body__live .live-list li"),
    column: 6,
    index: 0,
    position: 0,
  }
  carousel(live)




  //Container Body Event carousel  
  const event = {
    next: document.querySelectorAll(".container-body__upcoming .child-icon i")[1],
    prev:  document.querySelectorAll(".container-body__upcoming .child-icon i")[0],
    row: document.querySelector(".container-body__upcoming .child-row"),
    item: document.querySelectorAll(".container-body__upcoming .child-row__item"),
    column: 3,
    index: 0,
    position: 0,
  }
  carousel(event)
  

  // Container body singer 
  const singer = {
    next: document.querySelector("#main .container-body__singer .icon-arrow-right"),
    prev:  document.querySelector("#main .container-body__singer .icon-arrow-left"),
    row: document.querySelector("#main .container-body__singer .singer-list"),
    item: document.querySelectorAll("#main .container-body__singer .singer-list li"),
    column: 4,
    index: 0,
    position: 0,
  }
  carousel(singer, 4000)


  function carousel({next, prev, row, item, column, index, position}, timer = 0) {
    const length = item.length;
    next.addEventListener("click", function() {
      handleChangeSlide(1);
    })
    prev.addEventListener("click", function() {
      handleChangeSlide(-1);
    })
    if(timer !== 0) {
      setInterval(() => {
        if(index >= Math.ceil(length / column) - 1) {
          index = -1;
        }
        index ++;
        position = -1 * 100 * index;
        row.style.transform = `translateX(${position}%)`;
      }, timer);
    }
    function handleChangeSlide(num) {
      if(num === 1){
        if(index >= Math.ceil(length / column) - 1) {
          return;
        }
        index ++;
      }
      else if(num === -1) {
        if(index <= 0) {
          return;
        }
        index --;
      }
      position = -1 * 100 * index;
      row.style.transform = `translateX(${position}%)`;
    }
  }
   

  // Container tab
  const containerTab = document.querySelectorAll("#main .container-tab");
  const containerIconArrow = document.querySelectorAll("#main .container-header .container-header__btn span");
  let indexTab = 0;
  containerIconArrow[0].classList.add("hiddenIcon");
  containerIconArrow[1].addEventListener("click", function(e) {
    if(indexTab >= containerTab.length - 1) {
      return;
    }
    indexTab ++;
    if(indexTab >= containerTab.length - 1) {
      e.target.classList.add("hiddenIcon");
    }
    containerIconArrow[0].classList.remove("hiddenIcon");
    [...containerTab].forEach(item => item.classList.remove('active-tab'));
    containerTab[indexTab].classList.add("active-tab");
  })
  containerIconArrow[0].addEventListener("click", function(e) {
    if(indexTab <= 0) {
      return;
    }
    indexTab --;
    if(indexTab <= 0) {
      e.target.classList.add("hiddenIcon");
    }
    containerIconArrow[1].classList.remove("hiddenIcon");
    [...containerTab].forEach(item => item.classList.remove('active-tab'));
    containerTab[indexTab].classList.add("active-tab");
  })


})