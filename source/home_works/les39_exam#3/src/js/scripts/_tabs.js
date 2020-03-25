(function (){
    'use strict';

    swapContent();

    window.addEventListener('resize', swapContent);


    // functions


    function swapContent(){
        if(window.innerWidth < 576){
            appendImgIntoText();
        } else{
            if(document.body.querySelector('.tabs__content').querySelector('img')){
                extractImgFromText();
            }
        }
    }


    function appendImgIntoText(){
        let imgs = document.body.querySelectorAll('.tabs__img'),
            ps = document.body.querySelector('.tabs__content').querySelectorAll('p');

        imgs.forEach(function(img, i){
            ps[i].after(img);
        });
    }


    function extractImgFromText(){
        let imgs = document.body.querySelectorAll('.tabs__img'),
            box = document.body.querySelector('.tabs__imgs');

        imgs.forEach(function(img){
            box.append(img);
        });
    }
})();