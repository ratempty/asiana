//intro------------------------------------------------------
const circle = document.querySelector(".circle");
const intro = document.querySelector("#intro");
const blank = document.querySelector(".blank");
let scrollHeight = intro.offsetHeight;
const scrollF = () => {
  let maxSize = window.innerWidth + 1000;
  let scrollRatio = (window.scrollY / scrollHeight).toFixed(2);
  let boxSize = Math.min(maxSize * scrollRatio + 300, maxSize);
  if (window.scrollY <= scrollHeight) {
    // intro.style.position = 'fixed';
    // intro.style.left = '0px';
    // intro.style.top = '0px';
    circle.style.width = boxSize + "px";
    circle.style.height = boxSize + "px";
    // blank.style.height='200vh';
  } else {
    // blank.style.height='100vh';
    // intro.style.position ='relative';
    circle.style.width = boxSize + "px";
    circle.style.height = boxSize + "px";
  }
};
window.addEventListener("scroll", function () {
  if (window.innerWidth > 768) {
    scrollF();
  }
});
window.addEventListener("resize", function () {
  const sections = document.querySelectorAll("section");
  const mainHeader = document.querySelector("#main_header");
  if (window.innerWidth < 768) {
    circle.style.width = "100%";
    circle.style.height = "105px";
    intro.style.top = 0;
    mainHeader.style.position = "absolute";
    mainHeader.style.top = 0;
    for (let t = 0; t < sections.length; t++) {
      sections[t].style.position = "relative";
      sections[t].style.top = 0;
    }
  } else {
    scrollF();
    for (let g = 0; g < sections.length; g++) {
      sections[g].style.position = "fixed";
    }
    mainHeader.style.position = "fixed";
  }
});

//page1--------------------------------------------------------------------------
let mySwiper1 = new Swiper(".mySwiper", {
  spaceBetween: 0,
  speed: 1000,
  centeredSlides: true,
  loop: true,
  allowTouchMove: false,
  allowTouchMove: false,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: "#next1",
    prevEl: "#prev1",
  },
});
// let mySwiper2 = new Swiper(".mySwiper2", {
//   effect: 'fade',
//   speed:1000,
//   loop:true,
//   fadeEffect:{crossFade:true},
//   touchRatio: 0,
//   allowTouchMove: false,
//   autoplay: {
//     delay: 2500,
//     disableOnInteraction: false,
//   },
//   navigation: {
//     nextEl: '#next1',
//     prevEl: '#prev1',
//   },
// });

const playbtn1 = document.querySelector("#play1");
const pausebtn1 = document.querySelector("#pause1");

playbtn1.addEventListener("click", () => {
  mySwiper1.autoplay.start();
  // mySwiper2.autoplay.start()
});
pausebtn1.addEventListener("click", () => {
  mySwiper1.autoplay.stop();
  // mySwiper2.autoplay.stop();
});

let swiperfind = document.querySelector(".mySwiper");

mySwiper1.on("slideChange", function () {
  let explane = document.querySelectorAll(".explane");
  let nowSwiper = swiperfind.querySelector(".swiper-slide-next");
  let swiperIndex = nowSwiper.dataset.swiperSlideIndex;
  for (let u = 0; u < explane.length; u++) {
    explane[u].style.opacity = 0;
    if (swiperIndex == u) {
      explane[swiperIndex].style.opacity = 1;
    }
  }
});

//--------------------------------------------------------------------

//page1--------------------------------------------------------------

//page2--------------------------------------------------------------------

const prev2 = document.getElementById("prev2");
const next2 = document.getElementById("next2");
const play2 = document.getElementById("play2");
const pause2 = document.getElementById("pause2");

const rolling = (direction) => {
  let udbanner = document.querySelector(".ud_container");
  let firstbox = udbanner.firstElementChild;
  let lastbox = udbanner.lastElementChild; //  console.log(firstbox)
  if (direction == 0) {
    udbanner.appendChild(firstbox);
  } else if (direction == 1) {
    udbanner.insertBefore(lastbox, firstbox);
  }
  for (let i = 0; i < udbanner.length; i++) {
    udbanner
      .getElementsByTagName("div")
      .item(i)
      .setAttribute("class", "city" + (i + 1));
  }
};
window.onload = () => {
  let playState = 0;
  let timer = setInterval("rolling(0)", 5000);
  prev2.addEventListener("click", () => {
    clearInterval(timer);
    rolling(1);
    timer = setInterval("rolling(0)", 5000);
    if (playState == 1) {
      playState = 0;
    }
  });
  next2.addEventListener("click", () => {
    clearInterval(timer);
    rolling(0);
    timer = setInterval("rolling(0)", 5000);
    if (playState == 1) {
      playState = 0;
    }
  });
  pause2.addEventListener("click", () => {
    if (playState == 0) {
      clearInterval(timer);
      playState = 1;
    }
  });
  play2.addEventListener("click", () => {
    if (playState == 1) {
      timer = setInterval("rolling(0)", 5000);
      playState = 0;
    }
  });
};
let city = document.querySelectorAll(".ud_container>div");
const addPrice = () => {
  for (let y = 0; y < city.length; y++) {
    const Arr = city[y].querySelectorAll(".price");
    const area = [];
    for (let p = 0; p < Arr.length; p++) {
      const price = Arr[p].innerText;
      area.push(price);
    }
    for (let o = 0; o < area.length; o++) {
      area[o] = area[o].split(",");
      if (area[o].length == 2) {
        area[o] = area[o][0] + area[o][1];
      } else {
        area[o] = area[o][0] + area[o][1] + area[o][2];
      }
      area[o] = Number(area[o]);
    }
    let lowPrice = Math.min(...area);
    const options = { style: "currency", currency: "KRW" };
    const showNum = lowPrice.toLocaleString("ko-KR", options);

    let cityInfo = city[y].querySelector(".info");
    let numDiv = document.createElement("div");
    cityInfo.appendChild(numDiv);
    numDiv.innerText = " 최저가 : " + showNum + " ~ ";
    let lastDiv = cityInfo.lastElementChild;
    lastDiv.classList.add("m_price");
  }
};
addState = 0;
if (window.innerWidth <= 768 && addState == 0) {
  addPrice();
  addState++;
}
window.addEventListener("resize", () => {
  if (window.innerWidth <= 768 && addState == 0) {
    addPrice();
    addState++;
  }
});

//---------------------------------------------------------------------------

//page4---------------------------------------------

const faqBox = document.querySelector(".question>ul");
let radian = 0;
let roopani;
let isAnimating = false;
let isResize = false;

const roopText = () => {
  radian += 0.005;
  if (radian > Math.PI * 2) {
    radian = 0;
  }

  for (let k = 0; k < 6; k++) {
    let rotateZ = Math.sin(radian + k * 1.0472) * 100;
    let rotateY = Math.cos(radian + k * 1.0472) * 140;
    document.querySelector(".fli" + (k + 1)).style.transform =
      "translateY(" + rotateY + "px) translateZ(" + rotateZ + "px)";
    if (rotateZ < 0) {
      document.querySelector(".fli" + (k + 1)).style.opacity = 0;
    } else {
      document.querySelector(".fli" + (k + 1)).style.opacity = 1;
    }
    let text = document.querySelector(".fli" + (k + 1));
    text.style.fontSize = "1rem";
  }

  roopani = window.requestAnimationFrame(roopText);
  isAnimating = true;
};

const stopAnimation = () => {
  window.cancelAnimationFrame(roopani);
  isAnimating = false;
  isResize = true;
  updateTextStyles();
};

const updateTextStyles = () => {
  const positions = isResize
    ? [
        { display: "none", top: "auto", transform: "none", opacity: 1 },
        { display: "block", top: "70%", transform: "none", opacity: 1 },
        { display: "block", top: "45%", transform: "none", opacity: 1 },
        { display: "none", top: "auto", transform: "none", opacity: 1 },
        { display: "block", top: "20%", transform: "none", opacity: 1 },
        { display: "none", top: "auto", transform: "none", opacity: 1 },
      ]
    : [
        { display: "block", top: "auto", transform: "none", opacity: 1 },
        { display: "block", top: "auto", transform: "none", opacity: 1 },
        { display: "block", top: "auto", transform: "none", opacity: 1 },
        { display: "block", top: "auto", transform: "none", opacity: 1 },
        { display: "block", top: "auto", transform: "none", opacity: 1 },
        { display: "block", top: "auto", transform: "none", opacity: 1 },
      ];

  positions.forEach((position, index) => {
    const text = document.querySelector(".fli" + (index + 1));
    text.style.display = position.display;
    text.style.top = position.top;
    text.style.transform = position.transform;
    text.style.opacity = position.opacity;
  });
};

window.addEventListener("resize", () => {
  if (window.innerWidth > 768 && !isAnimating) {
    roopText();
  } else if (window.innerWidth <= 768 && isAnimating) {
    stopAnimation();
  }
});

// 초기 실행
if (window.innerWidth > 768) {
  roopText();
}
//page4---------------------------------------------

//jquery ----------------------------------------------------------------------------

$(function () {
  const fullpage = () => {
    if (window.scrollY >= 700) {
      $("#intro").css({ top: "-100vh" });
    } else {
      $("#intro").css({ top: 0 });
    }
    if (window.scrollY >= 1400) {
      $("#page1").css({ top: "-100vh" });
      $("#main_header").css({ top: "-100vh" });
    } else {
      $("#page1").css({ top: 0 });
      $("#main_header").css({ top: 0 });
    }
    if (window.scrollY >= 2100) {
      $("#page2").css({ top: "-100vh" });
    } else {
      $("#page2").css({ top: 0 });
    }
    if (window.scrollY >= 2800) {
      $("#page3").css({ top: "-100vh" });
    } else {
      $("#page3").css({ top: 0 });
    }
    if (window.scrollY >= 3500) {
      if (window.innerWidth > 1024) {
        $("#page4").css({ top: "-30vh" });
      } else {
        $("#page4").css({ top: "0" });
      }
    } else {
      $("#page4").css({ top: 0 });
    }
  };
  $(window).on("scroll", () => {
    if (window.innerWidth > 768) {
      fullpage();
    }
  });
  if (window.innerWidth < 768) {
  }

  //gnb-------------------------------------------------------------------
  $("#main_header>.gnb>ul").on("mouseenter focusin", function () {
    if ($(window).width() > 1024) {
      $(this).find(".sub1").stop().slideDown(350);
      $(".gnb_bg").stop().slideDown(350);
    }
  });
  $("#main_header>.gnb").on("mouseleave focusout", function () {
    if ($(window).width() > 1024) {
      $(this).find(".sub1").stop().slideUp(350);
      $(".gnb_bg").stop().slideUp(350);
    }
  });
  $(".sub1>li").on("mouseenter", function () {
    if ($(window).width() > 1024) {
      $(this).find(".sub2").stop().slideDown(300);
    }
  });
  $(".sub1>li").on("mouseleave", function () {
    if ($(window).width() > 1024) {
      $(this).find(".sub2").stop().slideUp(300);
    }
  });
  $(".gnb>ul>li>a").on("click", function (e) {
    if ($(window).width() <= 1024 && $(window).width() > 768) {
      e.preventDefault();
      $(".sub1").stop().slideToggle(350);
      $(".gnb_bg").stop().slideToggle(350);
    }
  });
  $(".sub1>li>a").on("click", function (e) {
    if ($(window).width() <= 1024 && $(window).width() > 768) {
      e.preventDefault();
      $(this).parent().siblings().find(".sub2").stop().slideUp(300);
      $(this).next().stop().slideToggle(300);
    }
  });
  let gnb = $("#main_header .gnb");
  let gnbBg = $(".gnb_bg");
  let menuBtn = $("#menubtn");
  let gnbState = 0;
  menuBtn.on("click", function () {
    if ($(window).width() <= 768 && gnbState == 0) {
      gnb.animate({ left: "0" }, 300);
      gnbBg.show();
      gnbBg.addClass("onbg");
      gnbState = 1;
    }
  });
  gnbBg.on("click", function () {
    gnb.animate({ left: "-80vw" }, 300);
    gnbBg.hide();
    gnbBg.removeClass("onbg");
    $(".sub1").stop().slideUp();
    gnbState = 0;
  });
  $(".gnb>ul>li>a").on("click", function () {
    if ($(window).width() <= 768) {
      $(this).parent().siblings().find(".sub1").stop().slideUp();
      $(this).siblings().stop().slideToggle();
    }
  });
  $(window).on("resize", function () {
    if (gnbState == 1) {
      gnb.animate({ left: "-80vw" }, 300);
      gnbBg.hide();
      gnbBg.removeClass("onbg");
      $(".sub1").stop().slideUp();
      gnbState = 0;
    }
    if ($(window).width() <= 768) {
      gnbBg.hide();
      $(".sub2").hide();
      $(".sub1").slideUp();
    }
  });

  //gnb------------------------------------------------------------

  //page1 reservation----------------------------------------------------------
  $(".datepicker").datepicker();

  //page3--------------------------------------------------------------

  // let slickDefault = false;
  // const slickControl = () => {
  //   if (!slickDefault) {
  //     $('.slick').slick({
  //       slidesToShow: 5,
  //       slidesToScroll: 1,
  //       autoplay: true,
  //       autoplaySpeed: 2000,
  //       arrows: false,
  //       infinite: true,
  //       responsive: [
  //         {
  //           breakpoint: 1600,
  //           settings: {
  //             slidesToShow: 4,
  //           }
  //         },
  //         {
  //           breakpoint: 1300,
  //           settings: {
  //             slidesToShow: 3,
  //           }
  //         },
  //         {
  //           breakpoint: 768,
  //           settings: "unslick"
  //         }
  //       ],
  //     });
  //     slickDefault = true;
  //   }
  //   else {
  //     $('.slick').slick('refresh');
  //   }
  // }
  // slickControl();
  // window.addEventListener('resize', () => {
  //   slickControl();
  // });

  let slickDefault = false;
  const slickControl = () => {
    if (!slickDefault) {
      $(".slick").slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        draggable: false,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        infinite: true,
        responsive: [
          {
            breakpoint: 1300,
            settings: {
              slidesToShow: 3,
            },
          },
        ],
      });
      slickDefault = true;
    } else {
      $(".slick").slick("refresh");
    }
  };
  if (window.innerWidth > 768) {
    slickControl();
  } else {
    if (slickDefault == true) {
      $(".slick").slick("unslick");
    }
  }
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      slickControl();
    } else {
      if (slickDefault == true) {
        $(".slick").slick("unslick");
      }
    }
  });

  function enterBg() {
    $(this).find(".black_bg").stop().animate({ height: "320px" }),
      $(this).find("p").stop().animate({ "margin-bottom": "30px" }),
      $(this).find(".date").stop().animate({ opacity: "1", bottom: "50px" });
  }
  function leaveBg() {
    $(this).find(".black_bg").stop().animate({ height: "130px" }),
      $(this).find("p").stop().animate({ "margin-bottom": "0px" }),
      $(this).find(".date").stop().animate({ opacity: "0", bottom: "0px" });
  }
  function eventBg() {
    $(".slick-slide").off("mouseenter", enterBg).off("mouseleave", leaveBg);
    if (window.innerWidth > 768) {
      $(".slick-slide").on("mouseenter", enterBg);
      $(".slick-slide").on("mouseleave", leaveBg);
      $(".black_bg").stop().css({ height: "130px" }),
        $(".black_bg").find("p").stop().css({ "margin-bottom": "0px" }),
        $(".black_bg")
          .find(".date")
          .stop()
          .css({ opacity: "0", bottom: "50px", position: "absolute" });
    } else {
      $(".black_bg").stop().css({ height: "100%" }),
        $(".black_bg").find("p").stop().css({ "margin-bottom": 0 }),
        $(".black_bg")
          .find(".date")
          .stop()
          .css({ opacity: "0.5", position: "static" });
    }
  }
  eventBg();
  $(window).on("resize", () => {
    eventBg();
  });

  //page3--------------------------------------------------------------
  //page4---------------------------------------------------------
  let j = 1;
  $("#nextbtn1").on("click", function () {
    j++;
    if (j > 5) {
      j = 1;
    }
    $(".content_inko>ol>li").hide();
    $(".inko" + j).show();
    $(".inko" + j).css({ display: "grid" });
  });
  $("#prevbtn1").on("click", function () {
    $(".content_inko>ol>li").hide();
    j--;
    if (j < 1) {
      j = 5;
    }
    $(".inko" + j).show();
    $(".inko" + j).css({ display: "grid" });
  });
  $("#nextbtn2").on("click", function () {
    j++;
    if (j > 5) {
      j = 1;
    }
    $(".content_outko>ol>li").hide();
    $(".outko" + j).show();
    $(".outko" + j).css({ display: "grid" });
  });
  $("#prevbtn2").on("click", function () {
    $(".content_outko>ol>li").hide();
    j--;
    if (j < 1) {
      j = 5;
    }
    $(".outko" + j).show();
    $(".outko" + j).css({ display: "grid" });
  });

  //page4---------------------------------------------------------
});
