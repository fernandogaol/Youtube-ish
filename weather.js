"use strict";

function getWeatherApiData() {
  if (navigator.geolocation)
    navigator.geolocation.getCurrentPosition(position => {
      let long = position.coords.longitude;
      let lat = position.coords.latitude;

      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&APPID=be6b4e4507b58e4d123a095bed0d45a9`
      )
        .then(response => response.json())
        .then(responseJSON => displayResults(responseJSON));
    });
  // .then(responseJSON => displayResults(responseJSON));
}

function displayResults(data) {
  let icon = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  let temp = Math.floor(data.main.temp);
  let description = data.weather[0].description.toUpperCase();
  let cityName = data.name;
  let countryName = data.sys.country;

  $(".icon").attr("src", icon);
  $(".description").append(description);
  $(".temp").append(temp, "°F");
  $(".city-name").append(cityName, ",");
  $(".country-name").append(countryName);
}

$(getWeatherApiData);

// function watchForm() {
//   $("#js-form").submit(event => {
//     event.preventDefault();

//     let searchTerm = $("js-search-term").val();

//     getWeatherApiData(searchTerm);
//   });
// }
// $(watchForm);
