import { API_KEY } from './config.js'

/*TODO: ADD FIVE DAY WEATHER FORECAST*/
const forecastTemp = document.querySelector('forecast-temp')
const forecastDescription = document.querySelector('forecast-description')


const input = document.getElementById('cityName')
const button = document.querySelector('.fa-solid')
const temp = document.getElementById('temperature')
const description = document.getElementById('description')
const image = document.getElementById('image')
const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&units=metric&appid=${API_KEY}`

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
            // console.log(data)
            temp.innerHTML = (data.main.temp).toFixed(0) + '°c'
            description.innerHTML = data.weather[0]['description']
        })
}

function getWeatherForecast() {


    return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`, {

    })
        .then(data => {
            return data.json()
        })
}