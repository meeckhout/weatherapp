import { API_KEY } from './config.js'

const city = document.getElementById('cityID')
const button = document.querySelector('button')
const temp = document.getElementById('temperature')
const description = document.getElementById('description')
const url = `https://api.openweathermap.org/data/2.5/weather?q=gent&units=metric&appid=${API_KEY}`


// button.addEventListener('click', event => {
//     getWeather()
//     // showWeather()
// })

window.onload = () => {
    getWeather()
}

function getWeather() {
  fetch(url)
  .then((response) => 
  response.json())
  .then((data) => {
        city.innerHTML = data.name
        temp.innerHTML = (data.main.temp).toFixed(0)
        description.innerHTML = data.weather[0][main] 
  })
  .catch(function() {
    
  }) 
}
