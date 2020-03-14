function handleClicks(e){
    if(e.target.closest('button.description__favorite')){
        let btn = e.target.closest('button.description__favorite');


        btn.querySelector('.description__favorite-star').classList.toggle('description__favorite-star--full');

        if(btn.querySelector('.description__favorite-star--full')){
            favoriteMovies.add(btn.closest('article.tabs__tab').getAttribute('data-imdb-i-d'));
        } else{
            favoriteMovies.delete(btn.closest('article.tabs__tab').getAttribute('data-imdb-i-d'));
        }
    }
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


function handleUnload(){
    let favoriteMoviesString = "";

    favoriteMovies.forEach(id=>favoriteMoviesString += id + " ");

    localStorage.setItem('favoriteMovies', favoriteMoviesString);
}
