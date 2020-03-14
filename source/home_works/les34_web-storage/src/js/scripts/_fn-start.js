initSearch();


// start functions --> run once - onload


function initSearch(){
    document.forms.search.name.focus();

    setInitialTab();
    setFavoriteMovies();
}


function setFavoriteMovies(){

    window.addEventListener('beforeunload', handleUnload);

    if(localStorage.getItem('favoriteMovies')){

        favoriteMovies = new Set(localStorage.getItem('favoriteMovies').trim().split(' '));
        return;

    } 

    favoriteMovies = new Set();

}


function setInitialTab(){
    document.body.querySelector('.tabs__tabs').append(initTab);
    initTab.hidden = false;

    document.forms.search.addEventListener('input', handleInput);

    document.forms.search.addEventListener('submit', handleSubmit);

    document.forms.search.addEventListener('keydown', handleKeys);

    document.forms.search.addEventListener('touchstart', handleTouches);

    document.body.addEventListener('click', handleClicks);


}
