var geocodeBaseURL = "http://api.openweathermap.org/geo/1.0/direct";
var currentWeatherBaseURL = "https://api.openweathermap.org/data/2.5/weather"
var searchInput = document.getElementById("search-input");
var searchForm = document.getElementById("search-form");
var currentForecast = document.getElementById("today-forecast-container");
var todayWeatherEl = document.getElementById("today-forecast");
var cityName = document.getElementById("city-name");
var dateToday = dayjs().format(" (M/D/YYYY)");
var dateTodayEl = document.getElementById("date-today");
var cityLat;
var cityLon;
var q = "";    
var appid = "&appid=1f009ad3e6df93960048fd13eb3d2cc2";
var temp;
var wind;
var humidity;
var geocodeURL = geocodeBaseURL +"?" + "q=Chicago" + "&limit=1" + appid;
var currentWeatherURL = "";
function setDate() {
    dateTodayEl.innerText = dateToday;
    return
}
setDate();

function getCoords(geocodeURL){
    console.log(geocodeURL);
    fetch(geocodeURL)
    .then(function (response) {
        return response.json()
    })
    // returning data as json object/array
    .then(function (data) {
        // attaching lat and lon values to global var and returning the reassigned values
        cityLat = data[0].lat;
        cityLon = data[0].lon;
        console.log(cityLat, cityLon);
        //return cityLat, cityLon;
        todayForecast();
    })
}

function makeGeoURL() {
    // creating modular fetch request url, location city name can be open for user input.
    // if no user input to draw from, will default to chicago
        if (q == "") {
            cityName.textContent = "Chicago";
            geocodeURL = geocodeBaseURL +"?" + "q=Chicago" + "&limit=1" + appid;
        } else{
            cityName.textContent = q - "q=";
            geocodeURL = geocodeBaseURL +"?" + q + "&limit=1" + appid;
        }
    return geocodeURL;
}

getCoords(geocodeURL);


function newSearch() {
    if (q == "") {
        //add error msg?
        makeGeoURL();
        getCoords();
    } else {
        q = "q=" + searchInput.textContent;
        makeGeoURL();
        getCoords();
    }
}

searchForm.addEventListener("submit", newSearch);

function todayForecast(currentWeatherURL) {
    currentWeatherURL = currentWeatherBaseURL +"?lat=" + cityLat + "&lon=" + cityLon + "&units=imperial" + appid;
    
    console.log(currentWeatherURL);
    fetch(currentWeatherURL)
    .then(function (response) {  
       return response.json()
    })
    .then(function (data) {  
        console.log(data);

        let iconPng = "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
        console.log(iconPng);
        temp = data.main.temp;
        wind = data.wind.speed;
        humidity = data.main.humidity;

        console.log(temp, wind, humidity);

        document.getElementById("today-icon").src = iconPng;
        todayWeatherEl.innerText = "Temp: " + temp + "ºF" + "\r\n" + "Wind: " + wind + "mph" + "\r\n" + "Humidity: " + humidity + "%";

        return;
    })

}

