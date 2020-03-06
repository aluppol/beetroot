(function (){
    'use strict';

    let initTab = document.getElementById('search-start'),
        noResultsTab = document.getElementById('search-no-result'),
        defaultArticleTab = document.getElementById('article'),
        tabsConatainer = document.getElementById('tabs-container'),
        fetchController = new AbortController(),
        submitController = new AbortController(),
        loadResultsFlag = false; // remove the Flag >> handelld by listener
    initSearch();


    // functions


    function initSearch(){
        document.forms.search.name.focus();

        setInitialTab();
    }


    function setInitialTab(){
        document.body.querySelector('.tabs__tabs').append(initTab);
        initTab.hidden = false;

        document.forms.search.addEventListener('input', handleInput);

        document.forms.search.addEventListener('submit', handleSubmit);

        document.forms.search.addEventListener('keydown', handleKeys);

        document.forms.search.addEventListener('touchstart', handleTouches);


    }

    function handleTouches(e){
        if (e.target.closest('input[name="name"].search__name') && document.forms.search.autofill.value){
            document.forms.search.addEventListener('touchend', handleTouchend, {once: true});
            
            setTimeout(()=>{
                document.forms.search.removeEventListener('touchend', handleTouchend, {once: true});
            }, 1000);
        }
        

        function handleTouchend(){
            document.forms.search.name.value = document.forms.search.autofill.value;
            document.forms.search.autofill.value = "";
        }
    }



    function handleKeys(e){
        if(e.code == 'ArrowRight'){
           
            document.forms.search.name.value = document.forms.search.autofill.value;
            document.forms.search.autofill.value = "";

        }
    }


    function handleInput(e){
        //apikey bcd2d5b4
        document.forms.search.autofill.value = "";
        let urlObject = new URL('http://www.omdbapi.com');

        urlObject.searchParams.set('apikey', 'bcd2d5b4');
        urlObject.searchParams.set('type', `${document.forms.search.querySelector('input[name="video-type"]:checked').value}`);
        urlObject.searchParams.set('t', `${document.forms.search.name.value}`);
        fetchController.abort();
        fetchController = new AbortController();
       
        fetch(urlObject, {
            signal: fetchController.signal
        }).then(response=>response.json())
        .then(movies=>{
            if(movies['Response'] != 'True') return;
            // console.log(movies);
            let title = movies['Title'];
            if(document.forms.search.name.value.toLowerCase() == title.slice(0, document.forms.search.name.value.length).toLowerCase()){
                document.forms.search.autofill.value = document.forms.search.name.value + title.slice(document.forms.search.name.value.length);
            }
        }).catch(err=>{
            if(err.name != 'AbortError') throw err;
        });

    }


    function handleSubmit(e){
        e.preventDefault();

        // console.log('submited!');
        document.forms.search.name.select();

        let urlObject = new URL('http://www.omdbapi.com');
        
        urlObject.searchParams.set('apikey', 'bcd2d5b4');
        urlObject.searchParams.set('type', `${document.forms.search.querySelector('input[name="video-type"]:checked').value}`);
        urlObject.searchParams.set('s', `${document.forms.search.name.value}`);
        urlObject.searchParams.set('page', 1);
        fetchController.abort();
        submitController.abort();
        submitController = new AbortController();
       
        fetch(urlObject, {
            signal: submitController.signal
        }).then(response=>response.json())
        .then(movies=>{
            // console.log(movies);
            if(movies['Response'] != 'True') {
                noResults();
                return;
            }
            
            urlObject.searchParams.set('page', +urlObject.searchParams.get('page') + 1);

            showResults(movies, urlObject);

        }).catch(err=>{
            if(err.name != 'AbortError') throw err;
        });

    }


    function noResults(){
        // console.log('No such movie!');

        removeCurrentTabs();

        let tab = noResultsTab.cloneNode(true);
        tab.id = '';
        tab.hidden = false; 

        tabsConatainer.append(tab);
    }


    function showResults(results, urlObject){
        // console.log(results);

        removeCurrentTabs();

        let preloadedTabs = [],
            searchResults = results['Search'];

        loadResultsFlag = true;

        window.addEventListener('scroll', preloadNextTab);

        preloadNextTab();


        // functions


        function preloadNextTab(){
            // console.log(loadResultsFlag);

            if(!loadResultsFlag) return;

            showNextTab();
            loadMoreResults();

            if(preloadedTabs.length > 5) return;

            let tab = defaultArticleTab.cloneNode(true),
                movie = searchResults.shift(),
                img = tab.querySelector('.poster__img');

            img.src = movie['Poster'];
            img.alt = movie['Title'];

            // console.log(img);
            // console.log(img.src);

            img.addEventListener('load', (e)=>{
                setTimeout(()=>{
                    // console.log('+1 preload');
                    preloadedTabs.push(tab);

    //Task --->>>  Hide Loader

                    preloadNextTab();
                }, 0);
            }, {once: true});

            tab.querySelector('.description__title').innerHTML = `Release in <b>${movie['Year']}</b> `;

            tab.id = "";
            tab.dataset.imdbID = movie['imdbID'];
        }


        function showNextTab(){

            if(preloadedTabs.length == 0) {

    //Task --->>> show Loader

                return;
            }

            // alert(document.body.scrollHeight - (pageYOffset + document.documentElement.clientHeight));
            if(document.body.scrollHeight - (pageYOffset + document.documentElement.clientHeight) > 0) return;

            let tab = preloadedTabs.shift();

    //Task --->>> animate tab
            
            tab.hidden = false;

            tabsConatainer.append(tab);
        }


        function loadMoreResults(){
            if(searchResults.length > 5) return;

            submitController = new AbortController();

            fetch(urlObject, {
                signal: submitController.signal
            }).then(response=>response.json())
            .then(movies=>{
                // console.log(movies);
                if(movies['Response'] != 'True') {
                    loadResultsFlag = false;

                    window.removeEventListener('scroll', preloadNextTab);

                    return;
                }
                
                urlObject.searchParams.set('page', +urlObject.searchParams.get('page') + 1);
    
                searchResults.push(...movies['Search']);
    
            }).catch(err=>{
                if(err.name != 'AbortError') throw err;
            });
        }
    }


    function removeCurrentTabs(){

        let  tabs = tabsConatainer.querySelectorAll('.tabs__tab');

        tabs.forEach(tab=>{
            tab.remove();
        });
    }













    // hideAllTabs();
    // document.getElementById('search-start').hidden = false;
    // setHeightOfCurentTab();
    // document.body.querySelector('.tabs__tabs').addEventListener('transitionend', setRate);
    // window.addEventListener('resize', resize);

    // tabsInOut();


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
    }
})();

//# sourceMappingURL=scripts.js.map
