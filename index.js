let dateElement = document.querySelector("#date");
dateElement.innerHTML = "tuesday 20:00";
let now = new Date();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let dayIndex = now.getDay();

dateElement.innerHTML = `${day[dayIndex]} ${hours}:${minutes}`;

function displayTemperature(response) {
  console.log(response);
  document.querySelector("#country").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#cloud").innerHTML = response.data.weather[0].main;
}

function search(city) {
  let apiKey = "6facd8500c739611af19eceacad09e8d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();

  let city = document.querySelector("#city-input").value;
  search(city);
}

let searchForm = document.querySelector("#search-form");

searchForm.addEventListener("submit", handleSubmit);

search();

function currentWeather() {
  navigator.geolocation.getCurrentPosition((position) => {
    search(position.coords.latitude, position.coords.longitude);
  });
}

let currentButton = document.querySelector("#current-button");

currentButton.addEventListener("click", currentWeather);
