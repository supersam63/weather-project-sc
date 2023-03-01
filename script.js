function formatDate(timestamp) {
  let date = new Date(timestamp);
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
    "Tuesday",
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";

  forecast.forEach(function (forecastDay, index) {
    if (index < 6 && index > 0) {
      forecastHTML =
        forecastHTML +
        `<div class="grid">
      <div class="item forecast-day">${formatDay(forecastDay.time)}</div>
      <div class="item forecast-img">
      <img
      src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
        forecastDay.condition.icon
      }.png" width="75"/>
      </div>
      <div class="item forecast-high">${Math.round(
        forecastDay.temperature.maximum
      )}°</div>
      <div class="item forecast-low">${Math.round(
        forecastDay.temperature.minimum
      )}°</div>
      </div>`;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "4a240de8db217dtodb6166f343d5aa4a";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherCondition(response) {
  let dateElement = document.querySelector("#todays-date");
  let mainIconElement = document.querySelector("#main-icon");
  let windSpeed = document.querySelector("#wind");
  let humidity = document.querySelector("#humidity");
  let conditionDescription = document.querySelector("#condition");
  conditionDescription.innerHTML = response.data.condition.description;
  humidity.innerHTML = response.data.temperature.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#current-location").innerHTML = response.data.city;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.temperature.current
  );

  dateElement.innerHTML = formatDate(response.data.time * 1000);
  mainIconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  fahrenheitTemperature = response.data.temperature.current;

  getForecast(response.data.coordinates);
}
function search(searchInput) {
  let apiKey = "4a240de8db217dtodb6166f343d5aa4a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchInput}&key=${apiKey}&units=imperial`;
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
  let apiKey = "4a240de8db217dtodb6166f343d5aa4a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${latitude}&lon=${longitude}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showGeoPosition);
}

function displayCelciusTemp(event) {
  event.preventDefault();
  let celciusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
  fahrenheitLink.classList.remove("active");
  celciusLink.classList.add("active");
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let currentLocatonButton = document.querySelector("#current-location-button");
currentLocatonButton.addEventListener("click", getCurrentLocation);

let fahrenheitTemperature = null;

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemp);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

search("New York");
