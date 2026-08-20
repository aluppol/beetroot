"use strict";

function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
(function () {
  'use strict';

  sliderHero();
  handleSwipes();
  hideShowLogo();
  window.addEventListener('scroll', documentOnScroll);
  sliderNews();
  preloadGalleryImg();

  // functions

  function preloadGalleryImg() {
    var imgs = document.body.querySelectorAll('img.preload');
    imgs.forEach(function (img) {
      if (img.complete) return;
      var loader = document.createElement('img');
      loader.src = './img/loader.svg';
      loader.style.cssText = "\n                position: absolute;\n                top: 50%;\n                left: 50%;\n                transform: translate(-50%, -50%);\n                min-width: 100%;\n                min-height: 100%;\n                opacity: 1;\n                transition: all 0.5s ease-in-out;\n                z-index: 100;\n            ";
      img.insertAdjacentElement('beforebegin', loader);
      img.onload = img.onerror = function (e) {
        loader.style.cssText = "\n                    position: absolute;\n                    top: 50%;\n                    left: 50%;\n                    transform: translate(-50%, -50%);\n                    min-width: 100%;\n                    min-height: 100%;\n                    opacity: 0;\n                    transition: all 0.5s ease-in-out;\n                    z-index: 100;\n                ";
        loader.ontransitionend = function () {
          loader.remove();
          // alert('done');
        };
      };
    });
  }
  function sliderNews() {
    var sliderNews = new Swiper('.swiper-container.slider-news', {
      loop: true,
      allowTouchMove: false,
      // centeredSlides: true,
      setWrapperSize: 1180,
      // slidesOffsetBefore: 100,
      // slidesOffsetAfter: 100,
      breakpoints: {
        350: {
          slidesPerView: 1,
          spaceBetween: 10
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 30
        },
        960: {
          slidesPerView: 3,
          spaceBetween: 30
        },
        1600: {
          slidesPerView: 4,
          spaceBetween: 30
        }
      },
      autoplay: {
        delay: 3000
      },
      navigation: {
        nextEl: '.slider-news__btn--right',
        prevEl: '.slider-news__btn--left'
      },
      pagination: {
        el: '.slider-news__pag',
        clickable: true,
        renderBullet: function renderBullet(index, className) {
          return '<span class="slider-news__bullet ' + className + '"><span class="slider__dot"></span></span>';
        }
      },
      mousewheel: false,
      keyboard: true
    });
    bulletControl(); //doesn't work from css

    // functions

    function bulletControl() {
      var bullets = document.body.querySelectorAll('.slider-news__bullet'),
        slider = document.body.querySelector('.swiper-container.slider-news'),
        bulletsContainer = document.body.querySelector('.slider-news__pag');
      bulletsContainer.style.cssText = "\n                display: -webkit-box;\n                display: -moz-box;\n                display: -webkit-flex;\n                display: -ms-flexbox;\n                display: flex;\n                position: relative;\n                width: 100%;\n                // left: 50%;\n                // transform: translate(-50%, 0);\n                -webkit-box-pack: center;\n                -moz-box-pack: center;\n                -ms-flex-pack: center;\n                -webkit-justify-content: center;\n                justify-content: center;\n                z-index: 10;\n            ";
      setBullets();
      function setBullets() {
        var _iterator = _createForOfIteratorHelper(bullets),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var bullet = _step.value;
            bullet.style.cssText = "\n                        width: 50px;\n                        height: 50px;\n                        display: -webkit-box;\n                        display: -ms-flexbox;\n                        display: -webkit-flex;\n                        display: flex;\n                        border-radius: 0;\n                        background: none;\n                        opacity: 1;\n                        margin: 4rem 5px 12rem 5px;\n                        background: rgba(255,255,255,0);\n                    "; //only from JS works
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }
  }
  function documentOnScroll(e) {
    hideShowLogo();
  }
  function hideShowLogo() {
    // alert(pageYOffset > document.getElementById('home'));
    if (pageYOffset > document.getElementById('home').offsetHeight) {
      document.body.querySelector('.nav>.nav__logo').style.display = "block";
    } else {
      document.body.querySelector('.nav>.nav__logo').style.display = "none";
    }
  }
  function handleSwipes() {
    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);
    var xDown = null;
    var yDown = null;
    function getTouches(evt) {
      return evt.touches ||
      // browser API
      evt.originalEvent.touches; // jQuery
    }
    function handleTouchStart(evt) {
      var firstTouch = getTouches(evt)[0];
      xDown = firstTouch.clientX;
      yDown = firstTouch.clientY;
    }
    ;
    function handleTouchMove(evt) {
      if (!xDown || !yDown) {
        return;
      }
      var xUp = evt.touches[0].clientX;
      var yUp = evt.touches[0].clientY;
      var xDiff = xDown - xUp;
      var yDiff = yDown - yUp;
      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        /*most significant*/
        if (xDiff > 0) {
          /* left swipe */
          document.querySelector('.nav').classList.remove('full-view');
        } else {
          /* right swipe */
          document.querySelector('.nav').classList.add('full-view');
        }
      } else {
        if (yDiff > 0) {
          /* up swipe */
          document.querySelector('.nav').classList.remove('full-view');
        } else {
          /* down swipe */
          document.querySelector('.nav').classList.remove('full-view');
        }
      }
      /* reset values */
      xDown = null;
      yDown = null;
    }
    ;
    var links = document.querySelectorAll('.nav__link');
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        document.querySelector('.nav').classList.remove('full-view');
      });
    });
  }
  function sliderHero() {
    var sliderHero = new Swiper('.swiper-container.slider--hero', {
      loop: true,
      direction: 'vertical',
      allowTouchMove: false,
      autoplay: {
        delay: 3000
      },
      pagination: {
        el: '.slider--hero__pag',
        clickable: true,
        renderBullet: function renderBullet(index, className) {
          return '<span class="slider--hero__bullet ' + className + '"><span class="slider__dot"></span></span>';
        }
      },
      mousewheel: false,
      keyboard: true
    });
    bulletControl(); //doesn't work from css

    // functions

    function bulletControl() {
      var bullets = document.body.querySelectorAll('.slider--hero__bullet'),
        slider = document.body.querySelector('.swiper-container.slider--hero'),
        bulletsContainer = document.body.querySelector('.slider--hero__pag');
      bulletsContainer.style.cssText = "\n                position: absolute;\n                transform: translate(0 , -50%);\n                top: 50%;\n                right: 2rem;\n            ";
      setBullets();
      function setBullets() {
        var _iterator2 = _createForOfIteratorHelper(bullets),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var bullet = _step2.value;
            bullet.style.cssText = "\n                        width: 50px;\n                        height: 50px;\n                        display: -webkit-box;\n                        display: -ms-flexbox;\n                        display: -webkit-flex;\n                        display: flex;\n                        border-radius: 0;\n                        background: none;\n                        opacity: 1;\n                        margin: 10px 0;\n                        background: rgba(255,255,255,0);\n                    "; //only from JS works
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    }
  }
})();
var map, marker, geocoder;
document.addEventListener('click', clickDOMListener);
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 40.680090,
      lng: -73.901845
    },
    zoom: 14,
    styles: mapStyle,
    disableDefaultUI: true
  });
  marker = new google.maps.Marker({
    position: {
      lat: 40.680090,
      lng: -73.901845
    },
    map: map,
    icon: {
      url: './img/marker.png',
      scaledSize: new google.maps.Size(100, 100)
    }
  });
  geocoder = new google.maps.Geocoder();
  setMapWith("Brooklyn, NY 11207 USA");
}
function setMapWith(address) {
  geocoder.geocode({
    'address': address
  }, function (results, status) {
    // console.log(JSON.stringify(results) + " : " + status);
    // console.log(results);
    if (status == 'OK') {
      var latLng = results[0].geometry.location;
      map.setCenter(latLng);
      marker.setPosition(latLng);
      map.panBy(0, document.documentElement.clientHeight / 4);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
function clickDOMListener(e) {
  if (!e.target) return;
  if (e.target.closest('a[data-address]')) {
    setMapWith(e.target.closest('a[data-address]').dataset.address);
    return;
  }
  if (e.target == document.getElementById('contact-form-submit')) {
    e.preventDefault();
    if (document.forms[0].name.matches('*:valid') && document.forms[0].email.matches('*:valid')) {
      //send form to server

      document.forms[0].name.value = "";
      document.forms[0].email.value = '';
      var modal = document.createElement('div');
      modal.style.cssText = "\n                width: 320px;\n                height: 150px;\n                position: fixed;\n                top: 50%;\n                left: 50%;\n                border-radius: 20px;\n                background: #fff;\n                line-height: 50px;\n                text-align: center;\n                z-index: 9999;\n                transition: all .4s ease-in-out;\n                transform: translate(-50%, -50%);\n                box-shadow: 0 0 5px 0 rgba(0,0,0,.5);\n                overflow: hidden;\n                font-size: 16px;\n                padding: 25px 10px;\n                opacity: 0;\n            ";
      modal.innerHTML = "Thank You! <br> We will contact you as soon as possible!";
      document.body.append(modal);
      setTimeout(function () {
        modal.style.opacity = 1;
      }, 0);
      setTimeout(function () {
        modal.addEventListener('transitionend', function (e) {
          e.target.remove();
        }, {
          once: true
        });
        modal.style.opacity = 0;
      }, 2000);
    } else {
      if (document.forms[0].name.matches('*:valid')) {
        document.forms[0].email.focus();
      } else {
        document.forms[0].name.focus();
      }
    }
    return;
  }
  if (e.target.closest('#contact') && e.target.tabIndex < 0) {
    if (!document.forms[0].name.value) {
      document.forms[0].name.focus();
    } else if (document.forms[0].querySelector('input:invalid')) {
      document.forms[0].querySelector('input:invalid').focus();
    } else {
      document.getElementById('contact-form-submit').focus();
    }
    return;
  }
  if (e.target.closest('#contact-link-time') && !e.target.closest('#contact-link-time').querySelector('span')) {
    showTimeTo();
    setInterval(showTimeTo, 10000);
    return;
  }
}
var message = document.createElement('span');
message.style.cssText = "\n        position: absolute;\n        transform: translate(0, 100%);\n        left: 0;\n        bottom: 0;\n        color: green;\n        z-index: 100;\n    ";
function showTimeTo() {
  var time = getTimeTo(),
    box = document.getElementById('contact-link-time');
  message.innerHTML = "".concat(time.openState ? 'Open. We will wait for you within ' : 'Close. We will be ready to serve you in ').concat(time.h, " hours and ").concat(time.min, " minutes!");
  if (!time.openState) message.style.color = "red";
  box.append(message);

  // functions

  function getTimeTo() {
    var text = document.getElementById('contact-link-time').innerText,
      openAt = {
        min: +text.split('AM')[0].slice(-2),
        h: +text.split('AM')[0].slice(-5, -3)
      },
      closeAt = {
        min: +text.split('PM')[0].slice(-2),
        h: +text.split('PM')[0].slice(-5, -3)
      },
      timeNow = new Date().toLocaleString("en-US", {
        timeZone: "America/New_York"
      }),
      openState;
    if (timeNow.includes('AM')) {
      timeNow = extractTime(timeNow);
      var diff = openAt.h * 60 + openAt.min - timeNow.h * 60 - timeNow.min;
      if (diff > 0) {
        openState = false;
        return {
          min: diff % 60,
          h: (diff - diff % 60) / 60,
          openState: openState
        };
      } else {
        openState = true;
        diff = 12 * 60 - timeNow.h * 60 - timeNow.min + closeAt.h * 60 + closeAt.min;
        return {
          min: diff % 60,
          h: (diff - diff % 60) / 60,
          openState: openState
        };
      }
    } else {
      timeNow = extractTime(timeNow);
      var _diff = closeAt.h * 60 + closeAt.min - timeNow.h * 60 - timeNow.min;
      if (_diff > 0) {
        openState = true;
        return {
          min: _diff % 60,
          h: (_diff - _diff % 60) / 60,
          openState: openState
        };
      } else {
        openState = false;
        _diff = 12 * 60 - timeNow.h * 60 - timeNow.min + openAt.h * 60 + openAt.min;
        return {
          min: _diff % 60,
          h: (_diff - _diff % 60) / 60,
          openState: openState
        };
      }
    }
  }
  function extractTime(timeNow) {
    timeNow = timeNow.slice(-11, -6);
    timeNow = timeNow.split(':');
    timeNow = {
      min: +timeNow[1],
      h: +timeNow[0]
    };
    return timeNow;
  }
}