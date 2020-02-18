(function(){
    'use strict';


    hideAllTabs();
    document.getElementById('info').hidden = false;
    setHeightOfCurentTab();
    document.body.querySelector('.tabs__tabs').addEventListener('transitionend', setRate);
    window.addEventListener('resize', resize);

    tabsInOut();


    // functions

    function hideAllTabs(tabs    = document.body.querySelectorAll('.tabs__tab')){
        tabs.forEach(tab => tab.hidden = true);
    }


    function setHeightOfCurentTab(tab , box = document.body.querySelector('.tabs__tabs')){
        if (tab == undefined){
            let tabs = document.body.querySelectorAll('.tabs__tab');

            tabs.forEach(t => {
                if(!t.hidden) 
                tab = t;
            });  
        }

        box.style.height = `${tab.offsetHeight}px`;
    }


    function tabsInOut(){
        let tabBtns = document.body.querySelectorAll('.tabs__btn'),
            box     = document.body.querySelector('.tabs__tabs');

        tabBtns.forEach(tab=>tab.addEventListener('click', (e)=>changeTab(e)));


        function changeTab(event){
            event.preventDefault();
            let clickBtn = event.target.closest('.tabs__btn'),
                clickTab = document.getElementById(`${clickBtn.dataset.name}`);

            if(clickTab.hidden == true){
                tabBtns.forEach(tab=>tab.dataset.state = 'disabled');
                clickBtn.dataset.state = 'active';
                box.style.height = "0px";
                box.addEventListener('transitionend', switchTabs);


                function switchTabs(){
                    if(box.offsetHeight == 0){
                        hideAllTabs();
                        clickTab.hidden = false;
                        box.removeEventListener('transitionend', switchTabs);
                        setHeightOfCurentTab(clickTab, box);
                    }
                }
            }
        }

    }


    function setRate(){

        document.body.querySelector('.tabs__tabs').removeEventListener('transitionend', setRate);
        if(document.getElementById('info').hidden == false){
            let circle = document.querySelector('.rate__current > circle'),
            circleLength = document.querySelector('.rate__maximal').offsetHeight * 3.14,
            rate = +document.querySelector('.rate__amount').textContent,
            offset = ((10 - rate) / 10) * circleLength;
            
            circle.style.strokeDashoffset = offset;
        } else {

            let circle = document.querySelector('.rate__current > circle'),
            circleLength = document.querySelector('.rate__maximal').offsetHeight * 3.14;

            circle.style.strokeDashoffset = circleLength;
        }

        
    }


    function resize(){
        setHeightOfCurentTab();
        if(document.getElementById('info').hidden == false) setRate();
    }
})();
