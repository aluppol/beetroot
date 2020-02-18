( function () {
    'use strict';

    let resizer = document.querySelector('.resizer'),
        corners = document.querySelectorAll('.resizer__corner'),
        motionX = null,
        motionY = null,
        windowArea = window.innerWidth * window.innerHeight;

    // corners.forEach((corner) => {
        document.body.addEventListener('mousedown', (e)=>{
            console.log('1');
            motionX = e.x;
            motionY = e.y;
        });
        document.body.addEventListener('mouseup', (e)=>{
            console.log('1');
            motionX = null;
            motionY = null;
        });
    // });

    corners.forEach((corner) => {
        corner.addEventListener('mousemove', (e)=>{
            console.log('1');
            resize(e);
        });
    });

    function resize(e){
        if(e.which != 1) return;
        console.log('2');
        let rect    = e.target.getBoundingClientRect(),
            signX   = 1,
            signY   = 1,
            classes = e.target.classList;

            
        console.log(rect);


        //throw external moves
        if(motionX < rect.left || motionX > rect.right) return; 
        if(motionY < rect.top || motionY > rect.bottom) return;

        //get corners
        if(classes.contains('left-top')) {
            signY = -1; 
            signX = -1; 
        } 

        if(classes.contains('left-bottom')) {
            signY = 1; 
            signX = -1; 
        } 

        if(classes.contains('right-top')) {
            signY = -1; 
            signX = 1; 
        } 

        if(classes.contains('right-bottom')) {
            signY = 1; 
            signX = 1; 
        } 


        let deltaX = signX * (-motionX + e.x),
            deltaY = signY * (-motionY + e.y),
            resizerRect = resizer.getBoundingClientRect(),
            newWidth = resizerRect.width + deltaX * 2,
            newHeight = resizerRect.height + deltaY * 2,
            percent = (newWidth * newHeight) * 100 / windowArea;
        
        console.log(newWidth + ' - ' + newHeight);

        if(percent > 70){
            resizer.style.backgroundColor = "red";
        } else if (percent < 30) {
            resizer.style.backgroundColor = "blue";
        }else {
            resizer.style.backgroundColor = "green";
        }

        if( newWidth > 60 &&
            newHeight > 60 &&
            (newWidth < window.innerWidth - 60) &&
            (newHeight < window.innerHeight - 60)) {
            
            resizer.style.width = newWidth + 'px';
            resizer.style.height = newHeight + 'px';
        }

        motionX = e.x;
        motionY = e.y;

    }

} )();