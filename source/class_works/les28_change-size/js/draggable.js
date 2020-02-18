(function () {
    'use strict';   
    let inners  = document.querySelectorAll('.box__inner'),
        boxes   = document.querySelectorAll('.box'),
        from    = null,
        current = null;

        displayCount();

    inners.forEach(inner => {
        addEvents(inner);
    });

    boxes.forEach(box => {
        box.addEventListener('dragenter', e => {
            let target = e.target;
            if (target.classList.contains('box--right') &&
            from && !from.classList.contains('box--right')) {
                
                setWidth(target, '10px');
            }
            if (target.classList.contains('box--left') &&
            from && !from.classList.contains('box--left')) {
                setWidth(target, '10px');
            }
        })

        box.addEventListener('dragleave', e => {
            setWidth(e.target, '5px');
        });

        box.addEventListener('dragover', e => {
            e.preventDefault();
        })

        box.addEventListener('drop', e => {
            e.preventDefault();

            current.hidden = false;

            let 
                // html   = current.outerHTML,
                target = e.target;

            if (target.classList.contains('box--right') &&
            from && from.classList.contains('box--right')) {
                return false
            }

            if (target.classList.contains('box--left') &&
            from && from.classList.contains('box--left')) {
                return false
            }

            let newEl = document.importNode(current, true);
            target.appendChild(newEl);
            addEvents(newEl);

            // target.insertAdjacentHTML('beforeend',html);
            
            // if (target.classList.contains('box--right') &&
            // from && !from.classList.contains('box--right')) {
                
            //     // console.log('to right from left');
            //     newEl.style.backgroundColor = 'orange';
            // }
            // if (target.classList.contains('box--left') &&
            // from && !from.classList.contains('box--left')) {
                
            //     // console.log('to left from right');
            //     newEl.style.backgroundColor = 'indigo';
            // }

            current.remove();
            current = null;
            from    = null;
            displayCount();
            
        })
    })

    function setWidth(el, value) {
        el.style.borderWidth = value;
    };

    function setCurrent(e) {
        current = e.target;
        from = current.parentNode;

        current.hidden = true;
    }

    function addEvents(el){
        el.addEventListener('dragstart', e => {
            setCurrent(e);
        });

        el.addEventListener('dragend', e => {
            el.hidden = false;
            boxes.forEach(box => {
                setWidth(box, '5px');
            })
        });
    }

    function displayCount(){
        boxes.forEach(box => {
            let child = box.querySelectorAll('.box__inner');
            box.querySelector('.box__count').innerText = child.length;
        });
    }

    

})();