function showFavoriteMovies(e){

    if(!e) return;

    showResults();

    if(!favoriteMovies.size){

        noResults();

        return;
    }

    removeCurrentTabs();
    
    favoriteMovies.forEach(id=>showFavoriteMovieTab(id));
}


// functions


function showFavoriteMovieTab(id){

    let urlObject = new URL('https://www.omdbapi.com');

    urlObject.searchParams.set('apikey', 'bcd2d5b4');
    urlObject.searchParams.set('i', id);

    fetch(urlObject)
    .then(response=>response.json())
    .then(movie=>{
        buildTab(movie);
    });
}


function buildTab(movie){
    let tab = defaultArticleTab.cloneNode(true),
        img = tab.querySelector('.poster__img');

    img.addEventListener('load', appendFavoriteMovieTab, {once: true});

    if(movie['Poster'] != 'N/A') {
        img.src = movie['Poster'];
    } else {
        img.src = './img/no-cover.png';
    }
        
    img.alt = movie['Title'];  

    tab.querySelector('.description__title').innerHTML = `${movie['Title']}`;
    tab.querySelector('.description__subtitle').innerHTML = `Released in ${movie['Year']} year`;
    tab.dataset.imdbID = movie['imdbID'];

    let btn = tab.querySelector('button.description__favorite');
    btn.querySelector('.description__favorite-star').classList.toggle('description__favorite-star--full');

    tab.id = "";
    tab.querySelector('.description__main').innerHTML = `<p>${movie['Plot'] != "N/A" ? movie['Plot'] : "" }</p>`;

    if(movie['imdbRating'] != 'N/A'){

        tab.querySelector('.rate__amount').innerHTML = movie['imdbRating'];

        setStars(tab);
    }
    tab.querySelector('.description__btn').remove();
    tab.classList.remove('tabs__tab--small');
    tab.querySelectorAll('[class*="--small"]').forEach(el=>{
        el.classList.remove(el.classList[0] + '--small');
    });
}


function appendFavoriteMovieTab(e){
    // console.log(e.target);
    let tab = e.target.closest('.tabs__tab');
    tabsConatainer.append(tab);
    tab.classList.add('flipInX');
    tab.hidden = false;
    setRate(tab);
}