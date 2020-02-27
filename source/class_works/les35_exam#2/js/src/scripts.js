(function(){
    'use strict';

    sliderHero();

    handleSwipes();

    hideShowLogo();

    window.addEventListener('scroll', documentOnScroll);

    sliderNews();


    // functions

    function sliderNews(){

        let sliderHero = new Swiper('.swiper-container.slider-news', {
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
                  },
            },
            autoplay: {
                delay: 3000,
              },
            navigation: {
              nextEl: '.slider-news__btn--right',
              prevEl: '.slider-news__btn--left',
            },
            pagination: {
              el: '.slider-news__pag',
              clickable: true,
              renderBullet: function (index, className) {
                    return '<span class="slider-news__bullet ' + className + '"><span class="slider__dot"></span></span>';
                }
            },
            mousewheel: false,
            keyboard: true,
        });

        bulletControl(); //doesn't work from css

        // functions

        function bulletControl(){
            let bullets = document.body.querySelectorAll('.slider-news__bullet'),
                slider = document.body.querySelector('.swiper-container.slider-news'),
                bulletsContainer = document.body.querySelector('.slider-news__pag');

            bulletsContainer.style.cssText = `
                display: -webkit-box;
                display: -moz-box;
                display: -webkit-flex;
                display: -ms-flexbox;
                display: flex;
                position: relative;
                width: 100%;
                // left: 50%;
                // transform: translate(-50%, 0);
                -webkit-box-pack: center;
                -moz-box-pack: center;
                -ms-flex-pack: center;
                -webkit-justify-content: center;
                justify-content: center;
                z-index: 10;
            `;
            
            setBullets();

            function setBullets(){
                for (let bullet of bullets){

                    bullet.style.cssText = `
                        width: 50px;
                        height: 50px;
                        display: -webkit-box;
                        display: -ms-flexbox;
                        display: -webkit-flex;
                        display: flex;
                        border-radius: 0;
                        background: none;
                        opacity: 1;
                        margin: 4rem 5px 12rem 5px;
                        background: rgba(255,255,255,0);
                    `;  //only from JS works
                }
            }
        }
    }


    function documentOnScroll(e){
        hideShowLogo();
    }


    function hideShowLogo(){

        // alert(pageYOffset > document.getElementById('home'));
        if(pageYOffset > document.getElementById('home').offsetHeight) {
            document.body.querySelector('.nav>.nav__logo').style.display = "block";
        } else {
            document.body.querySelector('.nav>.nav__logo').style.display = "none"; 
        }
    }


    function handleSwipes(){
        document.addEventListener('touchstart', handleTouchStart, false);        
        document.addEventListener('touchmove', handleTouchMove, false);

        var xDown = null;                                                        
        var yDown = null;

        function getTouches(evt) {
        return evt.touches ||             // browser API
                evt.originalEvent.touches; // jQuery
        }                                                     

        function handleTouchStart(evt) {
            const firstTouch = getTouches(evt)[0];                                      
            xDown = firstTouch.clientX;                                      
            yDown = firstTouch.clientY;                                      
        };                                                

        function handleTouchMove(evt) {
            if ( ! xDown || ! yDown ) {
                return;
            }

            var xUp = evt.touches[0].clientX;                                    
            var yUp = evt.touches[0].clientY;

            var xDiff = xDown - xUp;
            var yDiff = yDown - yUp;

            if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
                if ( xDiff > 0 ) {
                    /* left swipe */
                    document.querySelector('.nav').classList.remove('full-view');
                } else {
                    /* right swipe */
                    document.querySelector('.nav').classList.add('full-view');
                }                       
            } 
            else {
                if ( yDiff > 0 ) {
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
        };


        let links = document.querySelectorAll('.nav__link');

        links.forEach(function (link){
            link.addEventListener('click', function (){
                document.querySelector('.nav').classList.remove('full-view');
            })
        });
    }


    function sliderHero(){
        let sliderHero = new Swiper('.swiper-container.slider--hero', {
            loop: true,
            direction: 'vertical',
            allowTouchMove: false,
            autoplay: {
                delay: 3000,
              },
            navigation: {
              nextEl: '.slider--hero__next',
            },
            pagination: {
              el: '.slider--hero__pag',
              clickable: true,
              renderBullet: function (index, className) {
                    return '<span class="slider--hero__bullet ' + className + '"><span class="slider__dot"></span></span>';
                }
            },
            mousewheel: false,
            keyboard: true,
        });

        bulletControl(); //doesn't work from css

        // functions

        function bulletControl(){
            let bullets = document.body.querySelectorAll('.slider--hero__bullet'),
                slider = document.body.querySelector('.swiper-container.slider--hero'),
                bulletsContainer = document.body.querySelector('.slider--hero__pag');

            bulletsContainer.style.cssText = `
                position: absolute;
                transform: translate(0 , -50%);
                top: 50%;
                right: 2rem;
            `;
            
            setBullets();

            function setBullets(){
                for (let bullet of bullets){

                    bullet.style.cssText = `
                        width: 50px;
                        height: 50px;
                        display: -webkit-box;
                        display: -ms-flexbox;
                        display: -webkit-flex;
                        display: flex;
                        border-radius: 0;
                        background: none;
                        opacity: 1;
                        margin: 10px 0;
                        background: rgba(255,255,255,0);
                    `;  //only from JS works
                }
            }
        }
    }
})();


