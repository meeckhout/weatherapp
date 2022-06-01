/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"API_KEY\": () => (/* binding */ API_KEY)\n/* harmony export */ });\nconst API_KEY = 'be031fc682515aa4a038992ca5e4ec7f'\n\n\n\n//# sourceURL=webpack://the-weather/./src/config.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config.js */ \"./src/config.js\");\n\n\nconst input = document.getElementById('cityName')\nconst button = document.querySelector('.fa-solid')\nconst temp = document.getElementById('temperature')\nconst description = document.getElementById('description')\nconst refresh = document.getElementsByClassName('refresh')\nconst url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&units=metric&appid=${_config_js__WEBPACK_IMPORTED_MODULE_0__.API_KEY}`\n\nlet city = document.getElementById('cityID')\nlet lat = []\nlet lon = []\nlet dayOfTheWeek\n\nwindow.onload = () => {\n    getWeather()\n    document.getElementById('cityName').value = '';\n}\n\nbutton.addEventListener('click', event => {\n    window.location.reload();\n})\n\ndocument.body.addEventListener('click', event => {\n    document.getElementById('cityName').value = '';\n})\n\nconst inputCity = document.querySelector('.inputCity')\ninputCity.addEventListener('keypress', getLocationCoordinates)\nbutton.addEventListener('click', getLocationCoordinates)\n\n\n// Get user's location and show current weather at current location\nfunction getWeather() {\n    if (navigator.geolocation) {\n        navigator.geolocation.getCurrentPosition((position) => {\n            lat = position.coords.latitude;\n            lon = position.coords.longitude;\n            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${_config_js__WEBPACK_IMPORTED_MODULE_0__.API_KEY}`\n\n            fetch(api)\n                .then((response) =>\n                    response.json())\n                .then((data) => {\n                    city.innerHTML = data.name\n                    temp.innerHTML = (data.main.temp).toFixed(0) + '°C'\n                    description.innerHTML = data.weather[0]['main']\n                    image.innerHTML = data.weather[0]['icon']\n                })\n                .catch(function () {\n                })\n        })\n    }\n}\n\n// Get location coordinates\nfunction getLocationCoordinates(event) {\n    getResults(inputCity.value)\n}\n\n// Enter city name\nfunction getResults(query) {\n    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&units=metric&appid=${_config_js__WEBPACK_IMPORTED_MODULE_0__.API_KEY}`)\n        .then((data) => {\n            return data.json()\n        })\n        .then(displayResults)\n}\n\n// Reverse geolocation turns coordinates into a city name\nfunction displayResults(data) {\n       lat = data[0].lat\n       lon = data[0].lon\n    const urlCoordinate = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&units=metric&appid=${_config_js__WEBPACK_IMPORTED_MODULE_0__.API_KEY}`\n\n    fetch(urlCoordinate)\n        .then((response) => {\n            return response.json()\n        })\n        .then(data => {\n            city.innerHTML = data[0].name\n            lat = data[0].lat\n            lon = data[0].lon\n            reverseLocation(lat, lon)\n            // console.log(data)\n        })\n}\n\n// Loops through weekdays for the forecast\nfunction day() {\n    let day = new Date();\n    let weekDays = [\n        \"Sunday\",\n        \"Monday\",\n        \"Tuesday\",\n        \"Wednesday\",\n        \"Thursday\",\n        \"Friday\",\n        \"Saturday\"\n    ]\n\n    for (let i = 0; i < 5; i++) {\n        let dayOfTheWeek = weekDays[(day.getDay() + 1 + i) % 7]\n    }\n}\n\n// Five day forecast\ninputCity.addEventListener('keyup', (event) => {\n    if (event.key === \"Enter\") {\n        let forecast = `https://api.openweathermap.org/data/2.5/forecast?q=gent&cnt=5&units=metric&appid=${_config_js__WEBPACK_IMPORTED_MODULE_0__.API_KEY}`\n        fetch(forecast)\n            .then(response => {\n                return response.json()\n            })\n            .then(data => {\n                console.log(data)\n                data.list.forEach(list => {\n\n                    const container = document.querySelector('.five-days')\n\n                    const forecastCard = document.createElement('div')\n                    container.appendChild(forecastCard)\n                    forecastCard.classList.add('forecast-card')\n\n                    const date = document.createElement('h2')\n                    date.textContent = dayOfTheWeek\n                    forecastCard.appendChild(date)\n                    date.classList.add('date')\n\n                    const currentTemp = document.createElement('p')\n                    currentTemp.textContent = (list.main.temp).toFixed(0) + '°C'\n                    forecastCard.appendChild(currentTemp)\n                    currentTemp.classList.add('current-temp')\n\n                    const conditions = document.createElement('p')\n                    conditions.textContent = list.weather[0]['main']\n                    forecastCard.appendChild(conditions)\n                    conditions.classList.add('conditions')\n\n                    const icon = document.createElement('img')\n                    icon.src = `http://openweathermap.org/img/w/${list.weather[0].icon}.png`\n                    forecastCard.appendChild(icon)\n                    icon.classList.add('icon')\n                    day()\n                })\n            })\n            .catch(error => {\n                console.log(error)\n            })\n    }\n})\n\n// Geolocation\nasync function reverseLocation(lat, lon) {\n    let url = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${_config_js__WEBPACK_IMPORTED_MODULE_0__.API_KEY}`)\n        .then(response => response.json())\n        .then(data => {\n            temp.innerHTML = (data.main.temp).toFixed(0) + '°c'\n            description.innerHTML = data.weather[0]['description']\n        })\n}\n\n//# sourceURL=webpack://the-weather/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;