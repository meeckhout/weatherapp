import { API_KEY } from './config.js'
const input = document.getElementById('cityName')
const city = document.getElementById('cityID')
const button = document.querySelector('button')
const temp = document.getElementById('temperature')
const description = document.getElementById('description')
const image = document.getElementById('image')
let lat = []
let long = []
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${API_KEY}`
const btnUrl = `https://api.openweathermap.org/data/2.5/weather?q='+inputval.value+'&units=metric&appid=${API_KEY}`



// const errorCallback = (error) => {console.error(error)}
// const successCallback = (position) => {
//     lat.push(position.coords.latitude)
//     lon.push(position.coords.longitude)}

// navigator.geolocation.getCurrentPosition(successCallback, errorCallback)

window.onload = () => {
  getWeather()
  // weather()
}

button.addEventListener('click', event => {
    fetch(url)
    .then(response => response.json())
    .then(data => {
      const nameValue = data.name
      const descriptionValue = data.weather['0']['description']
      const temperatureValue = (data.main.temp).toFixed(0) + '°C'

      city.innerHTML = `You're in ${nameValue}`
      temp.innerHTML = `It is ${temperatureValue}`
      description.innerHTML = `Feels a bit ${descriptionValue}`
    })
    .catch(err => 
      alert('Enter valid city'))
})


function getWeather() {
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition((position) =>{
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${API_KEY}`

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