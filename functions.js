import {API_KEY} from './config.js'

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

export {test, day}