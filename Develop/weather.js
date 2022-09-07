var popularCities = [
    'Paris',
    'NYC',
    'London',
    'Bangkok',
    'Hong Kong'
]

// sidebar
const searchFormElement = document.querySelector('#citySearchForm');
const cityInputValues = document.querySelector('#cityInput');
const searchBtn = document.querySelector('#citySearch');
const userCityElements = document.querySelector('.list-group-1');
const popularCityElements = document.querySelector('.list-group-2');

// main
const weatherContent = document.querySelector('#weatherContent');
const forcastIcon = document.querySelector('#forecastIcon');
const uvIndex = document.querySelector('#uvIndex');
const cardElement = document.querySelector('.card');
const cardTitle = document.querySelector('.card-title');

const storeSearch = function () {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}

const formSubmitHandler = function (e) {
    e.preventDefault();

    const cityName = cityInputElem.value.trim();
    if (cityName) {
        searchHistory.push(cityName);
        cityInputElem.value = "";

        storeSearch();
        renderHistory();
        getWeather(cityName);
    } else {
        alert("invalid: please enter a city name")
    }
};

searchBtn.addEventListener('click', formSubmitHandler);

//weather api &  keys + url
const getWeather = function (cityName) {
    const apiKey = "f7e05673fd7e6ad3ca1950f24dc69f53";
    const apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=" + apiKey;

    fetch(apiUrl)
        .then(function (res) {
            console.log(res);
            res.json().then(function (data) {
                console.log(data);
                var lat = data[0].lat;
                var lon = data[0].lon;

                const secondApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial";

                fetch(secondApi)
                    .then(function (res) {
                        console.log(res);
                        return res.json()
                    }).then(function (data) {
                        console.log(data);
                        displayWeather(data);
                    })
                })
            })
        }

const displayWeather = function(weatherData) {
    let date = moment.unix(weatherData.current.dt).format("LL")
    let dateEl = document.createElement("p");
    dateEl.innerText = date;
    document.getElementById("dailyDate").prepend(dateEl)

    document.querySelector(".dailyTemp").innerText = weatherData.current.temp;
    document.querySelector(".dailyWind").innerText = weatherData.current.wind_speed;
    document.querySelector(".dailyHumid").innerText = weatherData.current.humidity;
    document.querySelector(".dailyIndex").innerText = weatherData.current.uvi;
        for(i = 1; i < 6; i++){
            let card = document.querySelector(".card" + (i))
            let iconUrl = "https://openweathermap.org/img/wn" + weatherData.current.weather[0].icon + "png";
    let icon = document.createElement("img")
    icon.setAttribute("src", iconUrl)
    document.getElementById("dailyDate").append(icon)

    let temp = document.createElement("p")
    temp.innerText = weatherData.daily[i].temp.day;
    card.appendChild(temp);

    let wind = document.createElement("p")
    wind.innerText = weatherData.daily[i].wind_speed;
    card.appendChild(wind);

    let humid = document.createElement("p")
    humid.innerText = weatherData.daily[i].humidity;
    card.appendChild(humid);
    }
};



