(function(){
    'use strict';


})();



var mySwiper = new Swiper('.swiper-container', {
    speed: 400,
    slidesPerView: 'auto',
    grabCursor: true,
    // loop: true,
    navigation: {
        nextEl: '.slider__btn--next',
        prevEl: '.slider__btn--prev',
    },
    breakpoints: {
        576: {
            spaceBetween: 10,
            slidesOffsetBefore: 0,
        },
        768: {
            spaceBetween: 20,
            slidesOffsetBefore: 0,
        },
        960: {
            spaceBetween: 30,
            slidesOffsetBefore: 137,
        },
        1140: {
            spaceBetween: 50,
            slidesOffsetBefore: 137,
        }
    }
});