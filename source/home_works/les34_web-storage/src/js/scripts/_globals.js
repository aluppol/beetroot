let initTab             = document.getElementById('search-start'),
    noResultsTab        = document.getElementById('search-no-result'),
    defaultArticleTab   = document.getElementById('article'),
    tabsConatainer      = document.getElementById('tabs-container'),
    fetchController     = new AbortController(),
    submitController    = new AbortController(),
    loadResultsFlag     = false,
    favoriteMovies;