import { api } from "config.js";
const lat = '59.334591'
const lon = '18.063240'
const cityID = document.getElementById('cityID')
const temp = document.getElementById('temperature')
const description = document.getElementById('description')
const date = document.getElementById('date')


function weatherBalloon() {
    const key = '{api}'

    fetch('https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={api}')  
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
      console.log(data);
    })
    .catch(function() {
      // catch any errors
    });
  }
  
  window.onload = function() {
    weatherBalloon();
  }
