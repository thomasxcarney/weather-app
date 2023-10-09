const locationInput = document.getElementById('location-input');
const locationSubmit = document.getElementById('submit-location');

const getLocationValue = locationSubmit.addEventListener('click', event => {
    let location = locationInput.value;
    getWeather(location);
})

async function getWeather(location) {
    let url = 'https://api.weatherapi.com/v1/forecast.json?key=6828a402ccd64fe9a2f182325230410&days=3&q=' + String(location);
    const response = await fetch(url, {mode: 'cors'})
    const weather = await response.json();
    console.log(weather.forecast.forecastday)
};