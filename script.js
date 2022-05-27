import { API_KEY } from './config.js'

/*TODO: ADD FIVE DAY WEATHER FORECAST*/
const forecastTemp = document.querySelector('forecast-temp')
const forecastDescription = document.querySelector('forecast-description')
// const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']


const input = document.getElementById('cityName')
const button = document.querySelector('.fa-solid')
const temp = document.getElementById('temperature')
const description = document.getElementById('description')
const image = document.getElementById('image')
const url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&units=metric&appid=${API_KEY}`

let city = document.getElementById('cityID')
let lat = []
let lon = []

window.onload = () => {
  getWeather()
}

function getWeather() {
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition((position) =>{
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`

    fetch(api)
    .then((response) => 
    response.json())
    .then((data) => {
          city.innerHTML = data.name
          temp.innerHTML = (data.main.temp).toFixed(0) + '°C'
          description.innerHTML = data.weather[0]['main'] 
          image.innerHTML = data.weather[0]['icon']
    })
    .catch(function() {
    }) 
  })
}}

const inputCity = document.querySelector('.inputCity')
inputCity.addEventListener('keypress', getLocationCoordinates)
button.addEventListener('click', getLocationCoordinates)

function getLocationCoordinates (event) {
  if (event.keyCode == 13) {
  getResults(inputCity.value)
  } else {
      getResults(inputCity.value)
  }
}

function getResults (query) {
  fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&units=metric&appid=${API_KEY}`)
  .then((data) => {
    return data.json()
  })
  .then(displayResults)
}

function displayResults (data) {
  lat = data[0].lat
  lon = data[0].lon
  const urlCoordinate = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`

    fetch(urlCoordinate)
        .then((response) => {
            return response.json()
        })
        .then(data => {
            city.innerHTML = data[0].name
            lat = data[0].lat
            lon = data[0].lon
            reverseLocation(lat, lon)
            // console.log(data)
        })
}

async function reverseLocation(lat, lon) {
    let url = fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
        .then(response => response.json())
        .then (data => {
            temp.innerHTML = (data.main.temp).toFixed(0) + '°c'
            description.innerHTML = data.weather[0]['description']
        })


}


let forecast = `https://api.openweathermap.org/data/2.5/forecast?q=stockholm&units=metric&appid=${API_KEY}`

fetch(forecast)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);

        data.list.forEach(list => {

            const iconId = list.weather[0].id;


            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const d = new Date(data.list[0].dt * 1000);
            const dayName = days[d.getDay()];
            console.log(dayName)

            // Generate and append html elements on the page
            const container = document.querySelector('.five-days');

  /*          const forecastCard = document.querySelectorAll('forecast');
            container.appendChild(forecastCard)
            forecastCard.classList.add('forecast')*/

            const date = document.querySelectorAll('date');
            date.textContent = dayName;
            container.appendChild(date);
            date.classList.add('date');

            const currentTemp = document.querySelectorAll('.forecast-temp')
            currentTemp.textContent = list.main.temp;
            forecastCard.appendChild(currentTemp);
            currentTemp.classList.add('forecast-temp');

            const conditions = document.createElement('p');
            conditions.textContent = list.weather[0]['main']
            forecastCard.appendChild(conditions);
            conditions.classList.add('conditions');

            const icon = document.createElement('img');
            icon.src = `./icons/${list.weather[0].icon}.png`;
            forecastCard.appendChild(icon);
            icon.classList.add('icon');
        })

    });

console.log('hello world!')