(function(){
    'use strict';

    let box = document.body.querySelector('.products').querySelector('.carousel-inner');

    setUpProducts();

    window.addEventListener('resize', setUpProducts);

    // functions


    function setUpProducts(){
        let prods = box.querySelectorAll('.product');

        for (let i = 0; i < prods.length; i++){
            if(prods[i].dataset.temp){
                prods[i].remove();
            }
        }

        prods = box.querySelectorAll('.product');

        let products = [];

        for (let i = 0; i < prods.length; i++){
            products.push(prods[i]);
        }

        box.innerHTML = "";

        let slides = [];
        
        switch(true){

            case (window.innerWidth < 768):
                
                

                while(products.length){
                    let slide = createSlideWithContainer();

                    slide.querySelector('.row').append(products.shift());

                    slides.push(slide);
                }
            
            break;

            case (window.innerWidth < 1200):

                for(let i = 0; products.length % 2 != 0; i++){
                    let clone = products[i].cloneNode(true);
                        clone.dataset.temp = true;
                    products.push(clone);
                }

                while(products.length){
                    let slide = createSlideWithoutContainer();

                    for(let i = 0; i < 2; i++){
                        slide.querySelector('.row').append(products.shift());
                    }

                    slides.push(slide);
                }

            break;

            default: //window.innerWidth > 1200

                for(let i = 0; products.length % 3 != 0; i++){
                    let clone = products[i].cloneNode(true);
                        clone.dataset.temp = true;
                    products.push(clone);
                }

                while(products.length){
                    let slide = createSlideWithoutContainer();

                    for(let i = 0; i < 3; i++){
                        slide.querySelector('.row').append(products.shift());
                    }

                    slides.push(slide);
                }
            break; //for beauty.
        }

        if(slides.length == 1){
            slides.push(slides[0].cloneNode(true));
        }

        slides[0].classList.add('active');

        slides.forEach(function(slide){
            box.append(slide);
        });
    }


    function createSlideWithoutContainer(){
        let slide = document.createElement('div'),
            row = document.createElement('div');

        slide.classList.add('carousel-item');
        row.classList.add('row');

        slide.append(row);

        return slide;
    }


    function createSlideWithContainer(){
        let slide = document.createElement('div'),
            row = document.createElement('div'),
            container = document.createElement('div');

        slide.classList.add('carousel-item');
        row.classList.add('row');
        container.classList.add('container');

        container.append(row);
        slide.append(container);

        return slide;
    }
})();