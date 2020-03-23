(function(){
    'use strict';

    let submitBtn = document.forms.nav.querySelector('button'),
        searchInput = document.forms.nav.querySelector('input'),
        spanWidth;


    document.addEventListener('click', function(e){

        if(e.target.closest('button.navbar-toggler')){
            toggleControls();
            return;
        }

        if(e.target.closest('button') != submitBtn && e.target != searchInput) {
            if(document.forms.nav.dataset.opened == "true"){
                toggleSearchBar();
            }
            return;
        } else{
            if(!searchInput.value || document.forms.nav.dataset.opened == "false"){
                e.preventDefault();
                
                toggleSearchBar();
            }
        }

    });

    handleControls();

    window.addEventListener('resize', handleControls);

    // functions

    function toggleControls(){
        if(window.innerWidth > 576) return;
        if(document.querySelector('.nav-controls .custom-hide')) {
            showControls();
        } else {
            hideControls();
        }
    }


    function showControls(){
        document.querySelectorAll('.nav-controls>.contros-btns-container>li').forEach(function(li){
            li.classList.remove('custom-hide');
        });
        // document.querySelector('.nav-controls').style.height = "";
    }

    function hideControls(){
        document.querySelectorAll('.nav-controls>.contros-btns-container>li').forEach(function(li){
            if(!li.querySelector('form')){
                li.classList.add('custom-hide');
            }
        });
        // document.querySelector('.nav-controls').style.height = "8rem";
    }


    function handleControls(){
        if(window.innerWidth > 576) {
            showControls();
        } else{

            if(document.querySelector('.nav-menu').querySelector('.navbar-collapse.show')) {
                showControls();
            } else {
                hideControls();
            }
        }
    }


    function toggleSearchBar(){
        
        if(document.forms.nav.dataset.opened == "false"){
            document.forms.nav.dataset.opened = "true";
            openSearchPanel();
        }else{
            document.forms.nav.dataset.opened = "false";
            closeSearchPanel();
        }
    }


    function openSearchPanel(){
       
        let span = submitBtn.querySelector('span');

        span.style.transition = "width 0.5s";
        spanWidth = span.getBoundingClientRect().width;
        span.style.width = spanWidth + 'px';

        span.addEventListener('transitionend', function(e){

            searchInput.style.width = '110px';
            span.hidden = true;
            searchInput.hidden = false;
            searchInput.focus();

            span.style.transition = "";
            span.style.width = "";

        }, {once: true});

        // confirm("Set width 105?");
        
        setTimeout(function(){span.style.width = '105px'}, 0);
    }


    function closeSearchPanel(){
        let span = submitBtn.querySelector('span');


        searchInput.style.transition = "width 0.5s";
        searchInput.addEventListener('transitionend', function(e){

            searchInput.hidden = true;
            span.hidden = false;

            searchInput.style.transition = "";
            searchInput.style.width = "";

        }, {once: true});
        
        searchInput.style.width = spanWidth + 5 + 'px';        
    }
})();