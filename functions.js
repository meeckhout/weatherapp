import {API_KEY} from './config'

const test = () => {
    console.log('ik haat smurfen')
}
test()

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
    let lat
    let lon
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

export {test, day, getLocationCoordinates, getResults, displayResults}