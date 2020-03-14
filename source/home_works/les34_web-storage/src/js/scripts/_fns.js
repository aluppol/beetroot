function noResults(){
    // console.log('No such movie!');

    removeCurrentTabs();

    let tab = noResultsTab.cloneNode(true);
    tab.id = '';
    tab.classList.add('flipInX');
    tab.hidden = false; 

    tabsConatainer.append(tab);
}


function removeCurrentTabs(){

    let  tabs = tabsConatainer.querySelectorAll('.tabs__tab');

    tabs.forEach(tab=>{
        tab.remove();
    });
}


function setRate(tab){

    let circle = tab.querySelector('.rate__current > circle'),
        circleLength = tab.querySelector('.rate__maximal').offsetHeight * 3.14,
        rate = +tab.querySelector('.rate__amount').textContent,
        offset = ((10 - rate) / 10) * circleLength;
        
    circle.style.strokeDashoffset = offset;
   
}


function setStars(tab){
    let starsAmount = Math.round(tab.querySelector('.rate__amount').innerHTML / 2),
        stars = tab.querySelectorAll('.poster__star');

    while(starsAmount){
        starsAmount--;
        stars[starsAmount].classList.add('poster__star--full');
    }
}