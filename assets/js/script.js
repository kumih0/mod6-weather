var geocodeURL = "http://api.openweathermap.org/geo/1.0/direct?q=Chicago&limit=1&appid=1f009ad3e6df93960048fd13eb3d2cc2";
var searchInput = document.getElementById("search-input");
var currentForecast = document.getElementById("today-forecast-container");
var cityName = document.getElementById("city-name");
var dateToday = document.getElementById("date-today");
var cityLat;
var cityLon;

function getCoords(geocodeURL){

    fetch(geocodeURL)
    .then(function (response) {
        console.log(response);

        return response.json();
    })
    .then(function (data) {
        console.log(data);
        
        cityLat = data[0].lat;
        cityLon = data[0].lon;

        return cityLat, cityLon;
    })
}

getCoords(geocodeURL);
console.log(cityLat, cityLon);

// endpoint https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
