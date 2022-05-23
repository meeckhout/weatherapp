// import { api } from "config.js";
const lat = '59.334591'
const lon = '18.063240'
const city = document.getElementById('city')
let temp = document.getElementById('temperature')
const description = document.getElementById('description')
const date = document.getElementById('date')
const url = 'https://api.openweathermap.org/data/2.5/weather?id=lat=59.3293&lon=18.0686&appid=0aedbe0e2b61bf889a956fc2b9a1ca9d'

  fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    temperature = data;
  })
  .catch(function(error) {
    console.log(error);
  });