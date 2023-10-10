const locationInput = document.getElementById('location-input');
const locationSubmit = document.getElementById('submit-location');
const day1ForecastContainer = document.getElementById('day1');
const day2ForecastContainer = document.getElementById('day2');
const day3ForecastContainer = document.getElementById('day3');
const currentWeatherContainer = document.getElementById('current-weather-container');

const getLocationValue = function addSubmitEventListener() {
    locationSubmit.addEventListener('click', event => {
    let location = locationInput.value;
    getForecast(location);
    getCurrentWeather(location);
    })
};

getLocationValue();

const processForecastDate = function processForecastDataArrWithMap(arr) {
    const newArr = arr.map(({date, day}) => ({date, day}));
    return newArr;
}

const printForecast = function printForecastInfoToContainer(obj, container) {
    container.innerHTML = '';
    const date = document.createElement('h4');
    date.innerHTML = obj.date;
    const icon = document.createElement('img');
    icon.src = obj.day.condition.icon;
    const condition = document.createElement('p');
    condition.innerHTML = obj.day.condition.text;
    const avgTempF = document.createElement('p');
    avgTempF.innerHTML = 'Average Temp. ' + obj.day.avgtemp_f + '&deg;F';
    container.append(date, icon, condition, avgTempF);
};

const printCurrentWeather = function printCurrentWeatherToContainer(obj, container) {
    container.innerHTML = '';
    const current = document.createElement('h4');
    current.innerHTML = 'Right Now';
    const icon = document.createElement('img');
    icon.src = obj.condition.icon;
    const condition = document.createElement('p');
    condition.innerHTML = obj.condition.text;
    const feelsLikeF = document.createElement('p');
    feelsLikeF.innerHTML = 'Feels like ' + obj.feelslike_f + '&deg;F';
    container.append(current, icon, condition, feelsLikeF);
};

async function getForecast(location) {
    let url = 'https://api.weatherapi.com/v1/forecast.json?key=6828a402ccd64fe9a2f182325230410&days=3&q=' + String(location);
    const response = await fetch(url, {mode: 'cors'});
    const weather = await response.json();
    const forecastByDay = weather.forecast.forecastday;
    let forecastArr = processForecastDate(forecastByDay);
    console.log(forecastArr);
    printForecast(forecastArr[0], day1ForecastContainer);
    printForecast(forecastArr[1], day2ForecastContainer);
    printForecast(forecastArr[2], day3ForecastContainer);
};

async function getCurrentWeather(location) {
    let url = 'https://api.weatherapi.com/v1/current.json?key=6828a402ccd64fe9a2f182325230410&q=' + String(location);
    const response = await fetch(url, {mode: 'cors'});
    const realTime = await response.json();
    const weather = realTime.current;
    printCurrentWeather(weather, currentWeatherContainer);
}