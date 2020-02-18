(()=>{
    'use strict';

    $(document).ready(() => {
        $('.slider').slick({
            dots: true,
            dotsClass: 'slider__dots',
            prevArrow: `<button class="slider__arrow slider__arrow--left"><i class="fas fa-chevron-left"></i></button>`,
            nextArrow: `<button class="slider__arrow slider__arrow--right"><i class="fas fa-chevron-right"></i></button>`
        });  
    });
})();