import { API_KEY } from './config.js'

const input = document.getElementById('cityName')
const button = document.querySelector('button')
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

// input.addEventListener("submit", event => {
//   event.preventDefault();
//   const inputVal = input.value;
// });


// button.addEventListener('click', event => {
//     fetch(url)
//     .then(response => response.json())
//     .then(data => {
//       const nameValue = data.name
//       const descriptionValue = data.weather['0']['description']
//       const temperatureValue = (data.main.temp).toFixed(0) + '°C'

//       city.innerHTML = `You're in ${nameValue}`
//       temp.innerHTML = `It is ${temperatureValue}`
//       description.innerHTML = `Feels a bit ${descriptionValue}`
//     })
//     .catch(err => 
//       alert('Enter valid city'))
// })


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
}
}

const inputCity = document.querySelector('.inputCity')
inputCity.addEventListener('keypress', getLocationCoordinates)

function getLocationCoordinates (event) {
  if (event.keyCode == 13) {
  getResults(inputCity.value)
  console.log(inputCity.value);
  }
}

function getResults (query) {
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&units=metric&appid=${API_KEY}`)
  .then((data) => {
    return data.json()
  })
  .then(displayResults)
}

function displayResults (data) {
  
  lat = data[0].lat
  lon = data[0].lon
  city.innerHTML = data[0].name
  const urlCoordinate = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}` 

  console.log(urlCoordinate);
}