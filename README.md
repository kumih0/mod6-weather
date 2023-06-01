j# mod6-weather
Module 6 Challenge Assignment - Weather Dashboard

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

The weather app includes a search option, a list of cities, and a five-day forecast and current weather conditions for Atlanta.

## Pseudo-code
    HTML:
    - layout html skeleton:
        header
        sidebar
            -form, text input 
                search button
            -search history div
        main body
            -top container
                -name of city
                -date (today/current)
                -relevant icon relating to weather
                -weather forecast> temp, humidity, wind
            -bottom container
                -5 day forecast heading
                -5 days out forecast, separate div cards
                -date, icon, headers
                -body text: temp, humidity, wind
    
    js:
    - set default city to load
    - fetch weather forecast data thru api call to openweather api
        -set variables for location inputs as default location
        -create separate functions to call w global var:
            -take input of city name, geocode 
                -geocoded object as retrieved coordinates
            -take coordinates and fetch current weather
            -take coordinates and fetch 5day forecast
    -set click event on search button, form submit
        -call on function to geocode city name
            -use global var to store input from user
            -SAVE input city name to local storage
            -retrieve coordinates of user input city
                if city name not entered, set default
        -plug user input coordinates into fetch current weather funct
            -append to element in today-forecast div
        -plug user input coordinates into 5day forecast funct
            -display 5day forecast, append to div element week-forecast
    -load and display previous searched cities from local storage
        -convert saved city name into obj
        -create fetch request of weather from saved location (reuse same functions as current weather and 5day fetch)
        -display only city name as click-able button
        -append to div container
        -for/while loop to repeat funct for more than one previous searched city
        -display each as a separate button
        
## Description
```
    To try and simplify the overall flow, I created a default setting to plug in Chicago to make sure my code was working and have something on the display page. I organized the layout with bootstrap accordingly and had little custom css. I practiced both hard coded elements and dynamically creating elements through javascript in the current weather functions and five day forecast, respectively. API calls for relevant information and ignoring extraneous data.
```

## Screenshot
<img width="1499" alt="Screen Shot 2023-06-01 at 12 50 29 AM" src="https://github.com/kumih0/mod6-weather/assets/132851569/6d01ecde-3085-4901-9bcd-f0367410aaf3">

# Live Link
https://kumih0.github.io/mod6-weather/

for some reason the livee link is not using the correct links? https vs http (changed links and it works just fine on devtools/vs code/open in browser
sorry it is late i have work as well as class and the bills are relentless and unforgiving wenches
