"use strict";

(function () {
  'use strict';

  sliderHero();
  handleSwipes();
  hideShowLogo();
  window.addEventListener('scroll', documentOnScroll);
  sliderNews(); // functions

  function sliderNews() {
    var sliderHero = new Swiper('.swiper-container.slider-news', {
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
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = bullets[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var bullet = _step.value;
            bullet.style.cssText = "\n                        width: 50px;\n                        height: 50px;\n                        display: -webkit-box;\n                        display: -ms-flexbox;\n                        display: -webkit-flex;\n                        display: flex;\n                        border-radius: 0;\n                        background: none;\n                        opacity: 1;\n                        margin: 4rem 5px 12rem 5px;\n                        background: rgba(255,255,255,0);\n                    "; //only from JS works
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
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
      return evt.touches || // browser API
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
      navigation: {
        nextEl: '.slider--hero__next'
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
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = bullets[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var bullet = _step2.value;
            bullet.style.cssText = "\n                        width: 50px;\n                        height: 50px;\n                        display: -webkit-box;\n                        display: -ms-flexbox;\n                        display: -webkit-flex;\n                        display: flex;\n                        border-radius: 0;\n                        background: none;\n                        opacity: 1;\n                        margin: 10px 0;\n                        background: rgba(255,255,255,0);\n                    "; //only from JS works
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
    }
  }
})();