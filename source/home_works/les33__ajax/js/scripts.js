"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

(function () {
  'use strict';

  var initTab = document.getElementById('search-start'),
      noResultsTab = document.getElementById('search-no-result'),
      defaultArticleTab = document.getElementById('article'),
      tabsConatainer = document.getElementById('tabs-container'),
      fetchController = new AbortController(),
      submitController = new AbortController(),
      loadResultsFlag = false; // remove the Flag >> handelld by listener

  initSearch(); // functions

  function initSearch() {
    document.forms.search.name.focus();
    setInitialTab();
  }

  function setInitialTab() {
    document.body.querySelector('.tabs__tabs').append(initTab);
    initTab.hidden = false;
    document.forms.search.addEventListener('input', handleInput);
    document.forms.search.addEventListener('submit', handleSubmit);
    document.forms.search.addEventListener('keydown', handleKeys);
    document.forms.search.addEventListener('touchstart', handleTouches);
  }

  function handleTouches(e) {
    if (e.target.closest('input[name="name"].search__name') && document.forms.search.autofill.value) {
      document.forms.search.addEventListener('touchend', handleTouchend, {
        once: true
      });
      setTimeout(function () {
        document.forms.search.removeEventListener('touchend', handleTouchend, {
          once: true
        });
      }, 1000);
    }

    function handleTouchend() {
      document.forms.search.name.value = document.forms.search.autofill.value;
      document.forms.search.autofill.value = "";
    }
  }

  function handleKeys(e) {
    if (e.code == 'ArrowRight') {
      document.forms.search.name.value = document.forms.search.autofill.value;
      document.forms.search.autofill.value = "";
    }
  }

  function handleInput(e) {
    if (e.target.closest('input[name="video-type"]')) {
      var getPreviousBorder = function getPreviousBorder(checkedInput) {
        var currentElement = checkedInput.previousElementSibling;

        while (currentElement != null) {
          if (currentElement.matches('.search__radio')) {
            return currentElement;
          }

          currentElement = currentElement.previousElementSibling;
        }

        return document.forms.search.querySelector('.search__stub--left');
      };

      var getNextBorder = function getNextBorder(checkedInput) {
        var currentElement = checkedInput.nextElementSibling.nextElementSibling; //skip current label;

        while (currentElement != null) {
          if (currentElement.matches('.search__radio')) {
            return currentElement;
          }

          currentElement = currentElement.nextElementSibling;
        }

        return document.forms.search.querySelector('.search__stub--right');
      };

      document.forms.search.querySelector('.search__radio--before').classList.remove('search__radio--before');
      document.forms.search.querySelector('.search__radio--after').classList.remove('search__radio--after');
      var previosRoundBorderEl = getPreviousBorder(e.target.closest('input[name="video-type"]')),
          nextRoundBorderEl = getNextBorder(e.target.closest('input[name="video-type"]'));
      previosRoundBorderEl.classList.add('search__radio--before');
      nextRoundBorderEl.classList.add('search__radio--after');
    } //apikey bcd2d5b4


    document.forms.search.autofill.value = "";
    var urlObject = new URL('https://www.omdbapi.com');
    urlObject.searchParams.set('apikey', 'bcd2d5b4');
    urlObject.searchParams.set('type', "".concat(document.forms.search.querySelector('input[name="video-type"]:checked').value));
    urlObject.searchParams.set('t', "".concat(document.forms.search.name.value));
    fetchController.abort();
    fetchController = new AbortController();
    fetch(urlObject, {
      signal: fetchController.signal
    }).then(function (response) {
      return response.json();
    }).then(function (movies) {
      if (movies['Response'] != 'True') return; // console.log(movies);

      var title = movies['Title'];

      if (document.forms.search.name.value.toLowerCase() == title.slice(0, document.forms.search.name.value.length).toLowerCase()) {
        document.forms.search.autofill.value = document.forms.search.name.value + title.slice(document.forms.search.name.value.length);
      }
    }).catch(function (err) {
      if (err.name != 'AbortError') throw err;
    });
  }

  function handleSubmit(e) {
    e.preventDefault(); // console.log('submited!');

    document.forms.search.name.select();
    var urlObject = new URL('https://www.omdbapi.com');
    urlObject.searchParams.set('apikey', 'bcd2d5b4');
    urlObject.searchParams.set('type', "".concat(document.forms.search.querySelector('input[name="video-type"]:checked').value));
    urlObject.searchParams.set('s', "".concat(document.forms.search.name.value));
    urlObject.searchParams.set('page', 1);
    fetchController.abort();
    submitController.abort();
    submitController = new AbortController();
    fetch(urlObject, {
      signal: submitController.signal
    }).then(function (response) {
      return response.json();
    }).then(function (movies) {
      // console.log(movies);
      if (movies['Response'] != 'True') {
        noResults();
        return;
      }

      urlObject.searchParams.set('page', +urlObject.searchParams.get('page') + 1);
      showResults(movies, urlObject);
    }).catch(function (err) {
      if (err.name != 'AbortError') throw err;
    });
  }

  function noResults() {
    // console.log('No such movie!');
    removeCurrentTabs();
    var tab = noResultsTab.cloneNode(true);
    tab.id = '';
    tab.hidden = false;
    tabsConatainer.append(tab);
  }

  function showResults(results, urlObject) {
    // console.log(results);
    removeCurrentTabs();
    var preloadedTabs = [],
        searchResults = results['Search'];
    loadResultsFlag = true;
    window.addEventListener('scroll', preloadNextTab);
    preloadNextTab(); // functions

    function preloadNextTab() {
      // console.log(loadResultsFlag);
      if (!loadResultsFlag) return;
      showNextTab();
      loadMoreResults();
      if (searchResults.length == 0) return;
      if (preloadedTabs.length > 5) return;
      var tab = defaultArticleTab.cloneNode(true),
          movie = searchResults.shift(),
          img = tab.querySelector('.poster__img');

      if (movie['Poster'] != 'N/A') {
        img.src = movie['Poster'];
      } else {
        img.src = './img/no-cover.png';
      }

      img.alt = movie['Title']; // console.log(img);
      // console.log(img.src);

      img.addEventListener('load', function (e) {
        setTimeout(function () {
          // console.log('+1 preload');
          preloadedTabs.push(tab); // Hide Loader

          document.getElementById('tab-loader').style.opacity = 0;
          preloadNextTab();
        }, 0);
      }, {
        once: true
      });
      tab.querySelector('.description__title').innerHTML = "".concat(movie['Title']);
      tab.querySelector('.description__subtitle').innerHTML = "Released in ".concat(movie['Year'], " year");
      tab.id = "";
      tab.dataset.imdbID = movie['imdbID'];
      tab.querySelector('.description__btn').addEventListener('click', showFullMovieInfo, {
        once: true
      });
    }

    function showFullMovieInfo(e) {
      var tab = e.target.closest('.tabs__tab'),
          btn = e.target.closest('.description__btn'),
          movieID = tab.getAttribute('data-imdb-i-d'),
          urlObject = new URL('https://www.omdbapi.com');
      urlObject.searchParams.set('apikey', 'bcd2d5b4');
      urlObject.searchParams.set('i', movieID);
      fetch(urlObject).then(function (response) {
        return response.json();
      }).then(function (movie) {
        // console.log(movie);
        tab.querySelector('.description__main').innerHTML = "<p>".concat(movie['Plot'] != "N/A" ? movie['Plot'] : "", "</p>");

        if (movie['imdbRating'] != 'N/A') {
          tab.querySelector('.rate__amount').innerHTML = movie['imdbRating'];
          setRate(tab);
          setStars(tab);
        }
      });
      tab.classList.remove('tabs__tab--small');
      btn.style.opacity = 0;
      btn.addEventListener('transitionend', function () {
        btn.remove();
        tab.scrollIntoView();
      }, {
        once: true
      });
      tab.querySelectorAll('[class*="--small"]').forEach(function (el) {
        el.classList.remove(el.classList[0] + '--small');
      });
    }

    function setStars(tab) {
      var starsAmount = Math.round(tab.querySelector('.rate__amount').innerHTML / 2),
          stars = tab.querySelectorAll('.poster__star');

      while (starsAmount) {
        starsAmount--;
        stars[starsAmount].classList.add('poster__star--full');
      }
    }

    function showNextTab() {
      if (preloadedTabs.length == 0) {
        //Task show Loader
        document.getElementById('tab-loader').style.opacity = 1;
        return;
      } // alert(document.body.scrollHeight - (pageYOffset + document.documentElement.clientHeight));


      if (document.body.scrollHeight - (pageYOffset + document.documentElement.clientHeight) > 100) return; // alert(document.body.scrollHeight - (pageYOffset + document.documentElement.clientHeight));

      var tab = preloadedTabs.shift(); //Task --->>> animate tab

      tab.classList.add('flipInX');
      tab.hidden = false;
      tabsConatainer.append(tab);
    }

    function loadMoreResults() {
      if (searchResults.length > 5) return;
      submitController = new AbortController();
      fetch(urlObject, {
        signal: submitController.signal
      }).then(function (response) {
        return response.json();
      }).then(function (movies) {
        // console.log(movies);
        if (movies['Response'] != 'True') {
          loadResultsFlag = false;
          window.removeEventListener('scroll', preloadNextTab);
          return;
        }

        urlObject.searchParams.set('page', +urlObject.searchParams.get('page') + 1);
        searchResults.push.apply(searchResults, _toConsumableArray(movies['Search']));
        preloadNextTab();
      }).catch(function (err) {
        if (err.name != 'AbortError') throw err;
      });
    }
  }

  function removeCurrentTabs() {
    var tabs = tabsConatainer.querySelectorAll('.tabs__tab');
    tabs.forEach(function (tab) {
      tab.remove();
    });
  }

  function setRate(tab) {
    var circle = tab.querySelector('.rate__current > circle'),
        circleLength = tab.querySelector('.rate__maximal').offsetHeight * 3.14,
        rate = +tab.querySelector('.rate__amount').textContent,
        offset = (10 - rate) / 10 * circleLength;
    circle.style.strokeDashoffset = offset;
  }
})();
//# sourceMappingURL=scripts.js.map
