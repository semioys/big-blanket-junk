"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol") { _typeof = function (_typeof2) { function _typeof(_x) { return _typeof2.apply(this, arguments); } _typeof.toString = function () { return _typeof2.toString(); }; return _typeof; }(function (obj) { return typeof obj === "undefined" ? "undefined" : _typeof(obj); }); } else { _typeof = function (_typeof3) { function _typeof(_x2) { return _typeof3.apply(this, arguments); } _typeof.toString = function () { return _typeof3.toString(); }; return _typeof; }(function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj); }); } return _typeof(obj); }

!function (e) {
  var t = {};

  function n(i) {
    if (t[i]) return t[i].exports;
    var o = t[i] = {
      i: i,
      l: !1,
      exports: {}
    };
    return e[i].call(o.exports, o, o.exports, n), o.l = !0, o.exports;
  }

  n.m = e, n.c = t, n.d = function (e, t, i) {
    n.o(e, t) || Object.defineProperty(e, t, {
      enumerable: !0,
      get: i
    });
  }, n.r = function (e) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(e, "__esModule", {
      value: !0
    });
  }, n.t = function (e, t) {
    if (1 & t && (e = n(e)), 8 & t) return e;
    if (4 & t && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && e && e.__esModule) return e;
    var i = Object.create(null);
    if (n.r(i), Object.defineProperty(i, "default", {
      enumerable: !0,
      value: e
    }), 2 & t && "string" != typeof e) for (var o in e) {
      n.d(i, o, function (t) {
        return e[t];
      }.bind(null, o));
    }
    return i;
  }, n.n = function (e) {
    var t = e && e.__esModule ? function () {
      return e.default;
    } : function () {
      return e;
    };
    return n.d(t, "a", t), t;
  }, n.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }, n.p = "", n(n.s = 0);
}([function (e, t) {
  $(function () {
    var e = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    $("body").css("padding-top", $(".header").outerHeight(!0));
    var t = $(".top-block").outerHeight(!0);
    $('<div class="top-block--clone"></div>').insertBefore(".top-block").css({
      height: t
    }).hide(), $(window).on("resize load", function (n) {
      e = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, $(".template-index").length && $(window).height() >= 620 && e > 576 || $(".template-index").length && $(window).height() >= 515 && e < 576 ? (t = $(".top-block").outerHeight(!0), $(".top-block--clone").css("height", t), $(".top-block--clone").show(), $(".top-block").css("top", $(".header").outerHeight(!0))) : ($(".top-block--clone").hide(), $(".top-block").css("top", 0));
    }), $(".cart__list-count-controll").on("click", function (e) {
      var t = $(this),
          n = t.parents("form"),
          i = t.parents(".cart__list-count").find("input").val();
      "+" == $(this).text().trim() ? isNaN(i) || (i++, t.parents(".cart__list-count").find("input").val(i)) : i > 1 && (i--, t.parents(".cart__list-count").find("input").val(i)), n.submit();
    }), $(".menu-title").on("click", function (e) {
      $(this).toggleClass("active"), $(this).parent().find(".menu-list").stop(!0, !0).slideToggle();
    }), $(".insta-block__sl").slick({
      centerMode: !0,
      centerPadding: "250px",
      slidesToShow: 2,
      slidesToScroll: 2,
      responsive: [{
        breakpoint: 1200,
        settings: {
          centerPadding: "160px"
        }
      }, {
        breakpoint: 992,
        settings: {
          centerPadding: "80px"
        }
      }, {
        breakpoint: 720,
        settings: {
          centerPadding: "40px"
        }
      }, {
        breakpoint: 576,
        settings: {
          infinite: !1,
          centerMode: !1,
          slidesToShow: 1.2,
          slidesToScroll: 1,
          arrows: !0,
          prevArrow: '<div class="sl-btn sl-btn--prev"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 132.596 240.822"><path d="M 57.633,129.007 165.93,237.268 c 4.752,4.74 12.451,4.74 17.215,0 4.752,-4.74 4.752,-12.439 0,-17.179 L 83.438,120.418 183.133,20.747 c 4.752,-4.74 4.752,-12.439 0,-17.191 -4.752,-4.74 -12.463,-4.74 -17.215,0 L 57.621,111.816 c -4.679,4.691 -4.679,12.511 0.012,17.191 z" transform="translate(-54.113 -.001)"/></svg></div>',
          nextArrow: '<div class="sl-btn sl-btn--next"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 132.596 240.822"><path d="M 183.189,111.816 74.892,3.555 c -4.752,-4.74 -12.451,-4.74 -17.215,0 -4.752,4.74 -4.752,12.439 0,17.179 l 99.707,99.671 -99.695,99.671 c -4.752,4.74 -4.752,12.439 0,17.191 4.752,4.74 12.463,4.74 17.215,0 L 183.201,129.006 c 4.68,-4.691 4.68,-12.511 -0.012,-17.19 z" transform="translate(-54.113)"/></svg></div>'
        }
      }]
    }), $(".main-menu a:not(.active)").hover(function () {
      e = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, "#mmenu!" == $(this).attr("href") && e > 1024 && ($(this).addClass("active"), $(".header__mmenu").addClass("active").stop(!0, !0).slideDown());
    }, function () {}), $(".header__mmenu").hover(function () {}, function () {
      (e = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) > 1024 && (setTimeout(function () {
        $('.main-menu a[href="#mmenu!"]').removeClass("active");
      }, 800), $(".header__mmenu").removeClass("active").stop(!0).slideUp());
    }), $(".main-menu a").each(function (t, n) {
      $(n).on("click", function (t) {
        e = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, "#mmenu!" == $(this).attr("href") && e < 1024 && ($(this).toggleClass("active"), $(".header__mmenu").toggleClass("active").stop(!0, !0).slideToggle());
      });
    }), $(".hamburger--js").on("click", function (e) {
      $(this).toggleClass("open"), $(".header__mmenu").toggleClass("active").stop(!0, !0).slideToggle();
    });
    var n = document.createElement("div");
    n.style.overflowY = "scroll", n.style.width = "50px", n.style.height = "50px", document.body.append(n);
    var i = n.offsetWidth - n.clientWidth;
    n.remove(), console.log("scrollWidth", i);
  });
  new Swiper(".curtain-sl__box", {
    loop: !0,
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
        centeredSlides: !1,
        initialSlide: 0,
        loop: !0,
        pagination: {
          el: ".curtain-sl__box-dots",
          clickable: !0
        }
      },
      375: {
        slidesPerView: 1.2,
        spaceBetween: 10,
        centeredSlides: !0,
        initialSlide: 1,
        loop: !0,
        pagination: {
          el: ".curtain-sl__box-dots",
          clickable: !0
        }
      },
      576: {
        slidesPerView: 2,
        spaceBetween: 10,
        centeredSlides: !0,
        initialSlide: 1,
        loop: !0
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 10,
        centeredSlides: !0,
        initialSlide: 2,
        loop: !0
      }
    }
  });
}]);