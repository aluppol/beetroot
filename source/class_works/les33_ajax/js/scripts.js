//weather key: 3fb7c69432d1ed315a6bca5719b90a72

(async ()=>{
    'use strict';

    let url = `http://api.openweathermap.org/data/2.5/group`,
        key = `3fb7c69432d1ed315a6bca5719b90a72`,
        ids = [
            2267057,
            2968815,
            4957962,
            5202009,
            293397,
            360630,
            5128638,
            1261481,
            1689973,
            1850147,
            4911455
        ],
        queryString = new URLSearchParams();

    let params = {
        id: ids.join(','),
        units: 'metric',
        appid: key
    }

    for (let param in params){
        queryString.append(param, params[param]);
    }

    let   weatherResponce = await fetch(`${url}?${queryString.toString()}`),

        citiesWeather = await weatherResponce.json();

    console.log(citiesWeather);

    // functions


})();