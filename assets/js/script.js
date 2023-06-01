var geocodeBaseURL = "http://api.openweathermap.org/geo/1.0/direct";
// var currentWeatherBaseURL = "https://api.openweathermap.org/data/2.5/weather"

var searchInput = document.getElementById("search-input");
var searchForm = document.getElementById("search-form");

var currentForecast = document.getElementById("today-forecast-container");
var todayWeatherEl = document.getElementById("today-forecast");
var fiveDayForecast = document.getElementById("week-forecast-container");
// var fiveDayEl = document.getElementById("week-forecast");

var cityName = document.getElementById("city-name");
// var dateToday = dayjs().format(" (M/D/YYYY)");
var dateTodayEl = document.getElementById("date-today");
dateTodayEl.innerText = dayjs().format(" (M/D/YYYY)");

var cityLat = 41.8755616;
var cityLon = -87.6244212;
var q = "";    
var appid = "&appid=1f009ad3e6df93960048fd13eb3d2cc2";

// var temp;
// var wind;
// var humidity;
var geocodeURL = geocodeBaseURL +"?" + "q=Chicago" + "&limit=1" + appid;

// function setDate() {
//     dateTodayEl.innerText = dateToday;
//     return
// }
// setDate();

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
    currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + cityLat + "&lon=" + cityLon + "&units=imperial" + appid;

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


//5 day forecast
function getFiveDay(fiveDayURL) {
    fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + cityLat + "&lon=" + cityLon + "&units=imperial" + appid;

    fetch(fiveDayURL)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) { 
        console.log(data);
        let date1 = dayjs(data.list[3].dt_txt).format("M/D/YYYY");

        console.log(date1);
        // let day1 = data.list[3];
        // let day2 = data.list[11];
        // let day3 = data.list[19];
        // let day4 = data.list[27];
        // let day5 = data.list[35];
        var weekArray = [data.list[3], data.list[11], data.list[19], data.list[27], data.list[35]];

        for (let index = 0; index < weekArray.length; index++) {
            console.log(weekArray[index]);
            var cardDiv = document.createElement("div");
            cardDiv.setAttribute("class", "col-3 card-body rounded border border-primary border-2 p-2");

            var weekDayEl = document.createElement("div");
            weekDayEl.setAttribute("id", "week-forecast" + index);

            var dayDate = document.createElement("h5");
            dayDate.setAttribute("id", "card-title" + index);

            var weatherIcon = document.createElement("img");
            weatherIcon.setAttribute("class", "card-body");
            weatherIcon.setAttribute("id", "weather-icon" + index);

            console.log(weekDayEl);
            dayDate.innerText = dayjs(weekArray[index].dt_txt).format("M/D/YYYY");

            console.log(dayDate.innerText);
            console.log(weatherIcon);

            let icon = "https://openweathermap.org/img/wn/" + weekArray[index].weather[0].icon + ".png";

            let temp = weekArray[index].main.temp;
            let wind = weekArray[index].wind.speed;
            let humidity = weekArray[index].main.humidity;

            weatherIcon.src = icon;
            weekDayEl.innerText = "Temp: " + temp + "ºF" + "\r\n" + "Wind: " + wind + "mph" + "\r\n" + "Humidity: " + humidity + "%";

            fiveDayForecast.appendChild(cardDiv);
            cardDiv.appendChild(dayDate);
            cardDiv.appendChild(weatherIcon);
            cardDiv.appendChild(weekDayEl);
        }
        // weekArray.forEach(index => {
        //     console.log(weekArray[index]);
        //     var weekDayEl = document.createElement("div");
        //     weekDayEl.setAttribute("id", "week-forecast" + index);
        //     var dayDate = document.createElement("h5");
        //     dayDate.setAttribute("id", "card-title" + index);
        //     var weatherIcon = document.createElement("img");
        //     weatherIcon.setAttribute("id", "weather-icon" + index)

        //     // var weekDayEl = document.getElementById("week-forecast");
        //     // weekDayEl.setAttribute("id", "week-forecast" + [index]);
        //     console.log(weekDayEl);

        //     // var dayDate = document.getElementsByClassName("card-title");
        //     // console.log(dayDate);
        //     // dayDate[0].setAttribute("className", "card-title" + [index])
        //     dayDate[0].innerText = dayjs(weekArray[index].dt_txt).format("M/D/YYYY");
        //     console.log(dayDate.innerText);

        //     // var weatherIcon = document.getElementById("weather-icon");
        //     // weatherIcon.setAttribute("id", "weather-icon" + [index]);
        //     console.log(weatherIcon);
        //     let icon = "https://openweathermap.org/img/wn/" + weekArray[index].weather[0].icon + ".png";

        //     let temp = weekArray[index].main.temp;
        //     let wind = weekArray[index].wind.speed;
        //     let humidity = weekArray[index].main.humidity;

        //     weatherIcon.src = icon;
        //     weekDayEl.innerText = "Temp: " + temp + "ºF" + "\r\n" + "Wind: " + wind + "mph" + "\r\n" + "Humidity: " + humidity + "%";

        //     fiveDayForecast.appendChild(dayDate);
        //     fiveDayForecast.appendChild(weatherIcon);
        //     fiveDayForecast.appendChild(weekDayEl);
        // });

     })
    
}
