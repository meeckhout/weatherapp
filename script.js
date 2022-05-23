import { API_KEY } from './config.js'

const city = document.getElementById('cityID')
const button = document.querySelector('button')
const temp = document.getElementById('temperature')
const description = document.getElementById('description')
const date = document.getElementById('date')
const url = `https://api.openweathermap.org/data/2.5/weather?q=gent&appid=${API_KEY}`

button.addEventListener('click', event => {
    getWeather()
})

function getWeather() {
  fetch(url)
  .then((response) => 
  response.json())
  .then((data) => {
    console.log(data)
  })
  .catch(() => {
    alert('Search for valid city')
  }) 
}

