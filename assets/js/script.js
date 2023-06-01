var geocodeBaseURL = "http://api.openweathermap.org/geo/1.0/direct";
var searchInput = document.getElementById("search-input");
var searchForm = document.getElementById("search-form");

var currentForecast = document.getElementById("today-forecast-container");
var todayWeatherEl = document.getElementById("today-forecast");
var fiveDayForecast = document.getElementById("week-forecast-container");

var cityName = document.getElementById("city-name");
var dateTodayEl = document.getElementById("date-today");
dateTodayEl.innerText = dayjs().format(" (M/D/YYYY)");

var cityLat = 41.8755616; //chicago default
var cityLon = -87.6244212; //chicago default
var q = "";    
var appid = "&appid=1f009ad3e6df93960048fd13eb3d2cc2";
var geocodeURL = geocodeBaseURL +"?" + "q=Chicago" + "&limit=1" + appid;

getCoords(geocodeURL);
function getCoords(geocodeURL){
    fetch(geocodeURL)
    .then(function (response) {
        return response.json()
    })
    // returning data as json object/array
    .then(function (data) {
        // attaching lat and lon values to global var and returning the reassigned values
        cityLat = data[0].lat;
        cityLon = data[0].lon;
        todayForecast();
    })
}

function makeGeoURL() {
    // creating modular fetch request url, location city name can be open for user input.
    // if no user input to draw from, will default to chicago
        // if (q !== "") {
            geocodeURL = geocodeBaseURL +"?" + q + "&limit=1" + appid;
        // } else{
        //     cityName.textContent = "Chicago";
        //     geocodeURL = geocodeBaseURL +"?" + "q=Chicago" + "&limit=1" + appid;
        // }      
        getCoords(geocodeURL);
}

// function newSearch(event) {
    

// }
searchForm.addEventListener("submit", function newSearch(event) { 
        event.preventDefault();
        cityName = searchInput.value;
        console.log(cityName);
        q = "q=" + cityName;
        console.log(q);
        makeGeoURL(cityName, q);
 });

function todayForecast(currentWeatherURL) {
    currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + cityLat + "&lon=" + cityLon + "&units=imperial" + appid;
    //fetch request with relevant updated url from getcoords funct
    fetch(currentWeatherURL)
    .then(function (response) {  
       return response.json()
    })
    .then(function (data) {  
        let iconPng = "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";

        let temp = data.main.temp;
        let wind = data.wind.speed;
        let humidity = data.main.humidity;

        document.getElementById("today-icon").src = iconPng;
        todayWeatherEl.innerText = "Temp: " + temp + "ºF" + "\r\n" + "Wind: " + wind + "mph" + "\r\n" + "Humidity: " + humidity + "%";

        getFiveDay();
    })

}


//5 day forecast: dynamically create new div card elements to contain data from five day forecast fetch. pre-selected relevant array indexes of data due to three hour step in api data call (midday-ish time for forecast reading)
function getFiveDay(fiveDayURL) {
    fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + cityLat + "&lon=" + cityLon + "&units=imperial" + appid;

    fetch(fiveDayURL)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) { 
        // turned selected array indexes of data into separate array to draw from, to make it easier to utilize for loop to dynamically create elements
        var weekArray = [data.list[3], data.list[11], data.list[19], data.list[27], data.list[35]];
    
        //gets rid of old card containers
        fiveDayForecast.innerHTML = "";
        for (let index = 0; index < weekArray.length; index++) {

            // div card container to hold info, needed to use bootstrap auto-layout with columns
            var cardDiv = document.createElement("div");
            // adding relevant layout class attributes
            cardDiv.setAttribute("class", "col-2 card-body rounded border border-primary border-2 p-2");
            cardDiv.setAttribute("id", "card" + index);
            // to hold forecast data
            var weekDayEl = document.createElement("div");
            //unique id relating to place in index weekarray
            weekDayEl.setAttribute("id", "week-forecast" + index);

            var dayDate = document.createElement("h5");
            dayDate.setAttribute("id", "card-title" + index);

            var weatherIcon = document.createElement("img");
            weatherIcon.setAttribute("id", "weather-icon" + index);

            // formatting date text with dayjs pulled from data, ignoring time stamp
            dayDate.innerText = dayjs(weekArray[index].dt_txt).format("M/D/YYYY");
            //pulling specific icon from data in week array index
            let icon = "https://openweathermap.org/img/wn/" + weekArray[index].weather[0].icon + ".png";
            //pulling temp, wind, humidity data from data
            let temp = weekArray[index].main.temp;
            let wind = weekArray[index].wind.speed;
            let humidity = weekArray[index].main.humidity;

            weatherIcon.src = icon;
            weekDayEl.innerText = "Temp: " + temp + "ºF" + "\r\n" + "Wind:  " + wind + " mph" + "\r\n" + "Humidity: " + humidity + "%";

            fiveDayForecast.appendChild(cardDiv);
            cardDiv.appendChild(dayDate);
            cardDiv.appendChild(weatherIcon);
            cardDiv.appendChild(weekDayEl);
        }
     })
    
}

//saving past searches to local storage
function searchHistory(event) {
    event.preventDefault();

}