function handleInput(e){

    if(e.target.closest('input[name="video-type"]')){

        if(document.forms.search.querySelector('input[name="video-type"]:checked').value == 'favorite') showFavoriteMovies(e);
        
        document.forms.search.querySelector('.search__radio--before').classList.remove('search__radio--before');

        document.forms.search.querySelector('.search__radio--after').classList.remove('search__radio--after');

        let previosRoundBorderEl = getPreviousBorder(e.target.closest('input[name="video-type"]')),
            nextRoundBorderEl = getNextBorder(e.target.closest('input[name="video-type"]'));

        previosRoundBorderEl.classList.add('search__radio--before');
        nextRoundBorderEl.classList.add('search__radio--after');

        // functions


        function getPreviousBorder(checkedInput){
            let currentElement = checkedInput.previousElementSibling;

            while(currentElement != null){
        
                if(currentElement.matches('.search__radio')){
                    return currentElement;
                }

                currentElement = currentElement.previousElementSibling;
            }

            return document.forms.search.querySelector('.search__stub--left');
        }

        function getNextBorder(checkedInput){
            let currentElement = checkedInput.nextElementSibling.nextElementSibling; //skip current label;

            while(currentElement != null){

                if(currentElement.matches('.search__radio')){
                    return currentElement;
                }

                currentElement = currentElement.nextElementSibling;
            }

            return document.forms.search.querySelector('.search__stub--right');
        }

        if(e.target.closest('input[name="video-type"]').value == 'favorite') {
            setTimeout(showFavoriteMovies, 0);
            return;
        }

    }

    //apikey bcd2d5b4

    document.forms.search.autofill.value = "";
    let urlObject = new URL('https://www.omdbapi.com');

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

    if(document.forms.search.querySelector('input[name="video-type"]:checked').value == 'favorite') return;

    // console.log('submited!');
    document.forms.search.name.select();

    let urlObject = new URL('https://www.omdbapi.com');
    
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


function showResults(results, urlObject){
    // console.log(results);

    if(document.forms.search.querySelector('input[name="video-type"]:checked').value == 'favorite') {
        results = new Object();
        results['Search'] = null;
    }

    removeCurrentTabs();

    let preloadedTabs = [],
        searchResults = results['Search'];

    loadResultsFlag = true;

    window.addEventListener('scroll', preloadNextTab);

    if(document.forms.search.querySelector('input[name="video-type"]:checked').value == 'favorite') {
        window.removeEventListener('scroll', preloadNextTab);
        loadResultsFlag = false;
        return;
    }

    preloadNextTab();


    // functions


    function preloadNextTab(){
        // console.log(loadResultsFlag);

        if(!loadResultsFlag) return;

        showNextTab();
        loadMoreResults();

        if(searchResults.length == 0) return;

        if(preloadedTabs.length > 5) return;

        let tab = defaultArticleTab.cloneNode(true),
            movie = searchResults.shift(),
            img = tab.querySelector('.poster__img');

        if(movie['Poster'] != 'N/A') {
            img.src = movie['Poster'];
        } else {
            img.src = './img/no-cover.png';
        }
        
        img.alt = movie['Title'];

        // console.log(img);
        // console.log(img.src);

        img.addEventListener('load', (e)=>{
            setTimeout(()=>{
                // console.log('+1 preload');
                preloadedTabs.push(tab);

                // Hide Loader
                document.getElementById('tab-loader').style.opacity = 0;
                document.getElementById('tab-loader').addEventListener('transitionend', (e)=>{
                    e.target.style.zIndex = -1;
                }, {once: true});

                preloadNextTab();
            }, 0);
        }, {once: true});

        tab.querySelector('.description__title').innerHTML = `${movie['Title']}`;
        tab.querySelector('.description__subtitle').innerHTML = `Released in ${movie['Year']} year`;

        tab.id = "";
        tab.dataset.imdbID = movie['imdbID'];

        if(favoriteMovies.has(movie['imdbID'])){
            let btn = tab.querySelector('button.description__favorite');
            btn.querySelector('.description__favorite-star').classList.toggle('description__favorite-star--full');
        }

        tab.querySelector('.description__btn').addEventListener('click', showFullMovieInfo, {once: true});
    }


    function showFullMovieInfo(e){
        let tab = e.target.closest('.tabs__tab'),
            btn = e.target.closest('.description__btn'),
            movieID = tab.getAttribute('data-imdb-i-d'),
            urlObject = new URL('https://www.omdbapi.com');
    
        urlObject.searchParams.set('apikey', 'bcd2d5b4');
        urlObject.searchParams.set('i', movieID);

        fetch(urlObject)
        .then(response=>response.json())
        .then(movie=>{
            // console.log(movie);
            tab.querySelector('.description__main').innerHTML = `<p>${movie['Plot'] != "N/A" ? movie['Plot'] : "" }</p>`;
            if(movie['imdbRating'] != 'N/A'){

                tab.querySelector('.rate__amount').innerHTML = movie['imdbRating'];

                setRate(tab);

                setStars(tab);
            }
            

        });

        tab.classList.remove('tabs__tab--small');
        btn.style.opacity = 0;
        btn.addEventListener('transitionend', ()=>{
            btn.remove();
            tab.scrollIntoView();
        }, {once: true});
        tab.querySelectorAll('[class*="--small"]').forEach(el=>{
            el.classList.remove(el.classList[0] + '--small');
        });
    }


    function showNextTab(){

        if(preloadedTabs.length == 0) {

            //Task show Loader
            document.getElementById('tab-loader').style.zIndex = 1;
            document.getElementById('tab-loader').style.opacity = 1;
            
            return;
        }

        // alert(document.body.scrollHeight - (pageYOffset + document.documentElement.clientHeight));

        if(document.body.scrollHeight - (pageYOffset + document.documentElement.clientHeight) > 100) return;

        // alert(document.body.scrollHeight - (pageYOffset + document.documentElement.clientHeight));

        let tab = preloadedTabs.shift();

//Task --->>> animate tab
        tab.classList.add('flipInX');
        
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

            preloadNextTab();

        }).catch(err=>{
            if(err.name != 'AbortError') throw err;
        });
    }
}