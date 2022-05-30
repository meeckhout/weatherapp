import {API_KEY} from './config.js'
// import {  } from './functions.js'

const input = document.getElementById('cityName')
const button = document.querySelector('.fa-solid')
const temp = document.getElementById('temperature')
const description = document.getElementById('description')
const url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&units=metric&appid=${API_KEY}`

let city = document.getElementById('cityID')
let lat = []
let lon = []
let dayOfTheWeek

window.onload = () => {
    getWeather()
    document.getElementById('cityName').value = '';
}

document.body.addEventListener('click', event => {
    document.getElementById('cityName').value = '';
})

const inputCity = document.querySelector('.inputCity')
inputCity.addEventListener('keypress', getLocationCoordinates)
button.addEventListener('click', getLocationCoordinates)

export const getWeather = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
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
                .catch(function () {
                })
        })
    }
}

function getLocationCoordinates(event) {
    if (event.keyCode == 13) {
        getResults(inputCity.value)
    } else {
        getResults(inputCity.value)
    }
}

function getResults(query) {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&units=metric&appid=${API_KEY}`)
        .then((data) => {
            return data.json()
        })
        .then(displayResults)
}

function displayResults(data) {
    /*   lat = data[0].lat
       lon = data[0].lon*/
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

function day() {
    let day = new Date();
    let weekDays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ]

    for (let i = 0; i < 5; i++) {
        let dayOfTheWeek = weekDays[(day.getDay() + i) % 7]
    }
    console.log(day)
}

let forecast = `https://api.openweathermap.org/data/2.5/forecast?q=gent&cnt=5&units=metric&appid=${API_KEY}`

inputCity.addEventListener('keyup', (event) => {
    if (event.key === "Enter") {
        const thisCity = event.currentTarget.value.toLowerCase();
        const apiUrl = "https://api.openweathermap.org/data/2.5/forecast/?q=" + thisCity + "&appid=" + API_KEY
        event.currentTarget.value = ''

        fetch(forecast)
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data)
                data.list.forEach(list => {

                    const container = document.querySelector('.five-days')

                    const forecastCard = document.createElement('div')
                    container.appendChild(forecastCard)
                    forecastCard.classList.add('forecast-card')

                    const date = document.createElement('h2')
                    date.textContent = dayOfTheWeek
                    forecastCard.appendChild(date)
                    date.classList.add('date')

                    const currentTemp = document.createElement('p')
                    currentTemp.textContent = (list.main.temp).toFixed(0) + '°C'
                    forecastCard.appendChild(currentTemp)
                    currentTemp.classList.add('current-temp')

                    const conditions = document.createElement('p')
                    conditions.textContent = list.weather[0]['main']
                    forecastCard.appendChild(conditions)
                    conditions.classList.add('conditions')

                    const icon = document.createElement('img')
                    icon.src = `http://openweathermap.org/img/w/${list.weather[0].icon}.png`
                    forecastCard.appendChild(icon)
                    icon.classList.add('icon')
                    day()
                })
            })
            .catch(error => {
                console.log(error)
            })
    }
})

async function reverseLocation(lat, lon) {
    let url = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            temp.innerHTML = (data.main.temp).toFixed(0) + '°c'
            description.innerHTML = data.weather[0]['description']
        })
}