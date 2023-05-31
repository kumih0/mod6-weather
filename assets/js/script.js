var geocodeURL = "http://api.openweathermap.org/geo/1.0/direct?";
var searchInput = document.getElementById("search-input");
var searchBtn = document.getElementById("btn");
var currentForecast = document.getElementById("today-forecast-container");
var cityName = document.getElementById("city-name");
var dateToday = document.getElementById("date-today");
var cityLat;
var cityLon;
var q;

function getCoords(geocodeURL){
// creating modular fetch request url, location city name can be open for user input.
// if no user input to draw from, will default to chicago
    var appid = "appid=1f009ad3e6df93960048fd13eb3d2cc2";
    if (q !== null) {
        geocodeURL = geocodeURL + q + "&limit=1" + "&" + appid;
    } else{
        geocodeURL = geocodeURL + "q=Chicago" + "&limit=1" + "&"+ appid;
    }
    fetch(geocodeURL)
    .then(function (response) {
        return response.json();
    })
    // returning data as json object/array
    .then(function (data) {
        // attaching lat and lon values to global var and returning the reassigned values
        cityLat = data[0].lat;
        cityLon = data[0].lon;

        return cityLat, cityLon;
    })
}

getCoords(geocodeURL);
console.log(cityLat, cityLon);

function newSearch() {
    q = "q=" + searchInput.textContent;
    getCoords();
}

searchBtn.addEventListener("click", newSearch);
// endpoint https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
