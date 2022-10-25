function formattedDate(date) {
  let dayNumber = date.getDate();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tueday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];

  return `${day} ${dayNumber} ${month} ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#todays-date");
let now = new Date();
dateElement.innerHTML = formattedDate(now);

//function celToFar(event) {
//  event.preventDefault();
// currentTemperature.innerHTML = `14`;
//}
//function farToCel(event) {
// event.preventDefault();
//currentTemperature.innerHTML = `58`;
//}

//let currentTemperature = document.querySelector("#current-temperature");
//let celcius = document.querySelector("#celcius-link");
//celcius.addEventListener("click", celToFar);
//let farenheit = document.querySelector("#farenheit-link");
////farenheit.addEventListener("click", farToCel);
//
function displayWeatherCondition(response) {
  document.querySelector("#current-location").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
}
function search(searchInput) {
  let apiKey = "e6ab16c32b334c5dee03bb9b67c3cb55";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-search-input").value;
  search(searchInput);
}

function showGeoPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "e6ab16c32b334c5dee03bb9b67c3cb55";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showGeoPosition);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let currentLocatonButton = document.querySelector("#current-location-button");
currentLocatonButton.addEventListener("click", getCurrentLocation);

search("New York");
