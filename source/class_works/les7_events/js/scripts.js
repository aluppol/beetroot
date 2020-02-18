
    var cowerSwiper = new Swiper('.swiper-container', {
        scrollbar: {
          el: '.swiper-scrollbar',
        //   hide: true,
        },
        speed: 600,
    });

    var personsSwiper = new Swiper('.persons-swiper', {
      slidesPerView: 1,
      spaceBetween: 10,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      // speed: 200,
      // navigation: {
      //   nextEl: '.swiper-button-next',
      //   prevEl: '.swiper-button-prev',
      // },
      // Responsive breakpoints
      breakpoints: {
        // when window width is >= 320px
        576: {
          slidesPerView: 1,
          spaceBetween: 10
        },
        // when window width is >= 480px
        758: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        // when window width is >= 640px
        1000: {
          slidesPerView: 3,
          spaceBetween: 30
        }
      }
    });