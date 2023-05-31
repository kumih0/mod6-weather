var geocodeURL = "http://api.openweathermap.org/geo/1.0/direct?";
var currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?"
var searchInput = document.getElementById("search-input");
var searchForm = document.getElementById("search-form");
var currentForecast = document.getElementById("today-forecast-container");
var todayWeatherEl = document.getElementById("today-forecast");
var cityName = document.getElementById("city-name");
var dateToday = document.getElementById("date-today");
var cityLat;
var cityLon;
var q = "";    
var appid = "&appid=1f009ad3e6df93960048fd13eb3d2cc2";
var temp;
var wind;
var humidity;

function getCoords(geocodeURL){
// creating modular fetch request url, location city name can be open for user input.
// if no user input to draw from, will default to chicago
    if (q == "") {
        cityName.textContent = "Chicago";
        geocodeURL = geocodeURL + "q=Chicago" + "&limit=1" + appid;
    } else{
        cityName.textContent = q - "q=";
        geocodeURL = geocodeURL + q + "&limit=1" + appid;
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
        console.log(cityLat, cityLon);
        // return cityLat, cityLon;
        todayForecast();
    })
}

getCoords(geocodeURL);


function newSearch() {
    if (q == "") {
        //add error msg?
        getCoords();
    } else {
        q = "q=" + searchInput.textContent;
        getCoords();
    }
}

searchForm.addEventListener("submit", newSearch);

function todayForecast(currentWeatherURL) {
    currentWeatherURL = currentWeatherURL + "lat=" + cityLat + "&lon=" + cityLon + appid;
    
    console.log(currentWeatherURL);
    fetch(currentWeatherURL)
    .then(function (response) {  
        return response.json;
    })
    .then(function (data) {  
        console.log(data);
        var icon = data[1].icon;
        temp = data[3].temp;
        wind = data[5].speed;
        humidity = data[3].humidity;


    })

}
// endpoint 
