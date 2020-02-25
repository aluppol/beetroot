"use strict";

(function () {
  'use strict';

  sliderHero();
  handleSwipes(); // functions

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
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = bullets[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var bullet = _step.value;
            bullet.style.cssText = "\n                        width: 50px;\n                        height: 50px;\n                        display: -webkit-box;\n                        display: -ms-flexbox;\n                        display: -webkit-flex;\n                        display: flex;\n                        border-radius: 0;\n                        background: none;\n                        opacity: 1;\n                        margin: 10px 0;\n                        background: rgba(255,255,255,0);\n                    "; //only from JS works
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
})();