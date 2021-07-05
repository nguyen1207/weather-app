$(document).ready(function () {
  $("#get-weather-form").submit(fetchWeatherInfo);
  $("input")
    .focus(function() {
      $(this).attr("placeHolder", "");
    })
    .blur(function() {
      $(this).attr("placeHolder", "Your location");
    })
    .click(function() {
      $(this).select()
    });

  function fetchWeatherInfo(e) {
    e.preventDefault();
    const API_KEY = "e3317d99839f28cae3e45874131d91f2";
    const CITY_NAME = $("#city-name-input").val();
    const URL = `http://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME.replace(/\s/g, "").trim()}&appid=${API_KEY}&units=metric`

    fetch(URL)
      .then(res => res.json())
      .then(data => {

        // If not found city
        if(data.message) {
          let error = uppercaseFirstLetter(data.message); 
          $("#error").html(`<span>${error}</span>`);

          $("#city-name").html("");
          $("#weather").html("");
          $("#temperature").html("");
          $("#humidity").html("");
          return;
        }

        $("#error").html("");

        let cityName = data.name;
        let temperature = Math.round(data.main.temp);
        let weather = uppercaseFirstLetter(data.weather[0].description);
        let weatherIconId = data.weather[0].icon;
        let weatherIconImg = `http://openweathermap.org/img/wn/${weatherIconId}@2x.png`
        let humidity = data.main.humidity;

        $("#city-name").html(`<span>${cityName}</span>`);
        $("#weather").html(`<div id="weather-icon"><img src="${weatherIconImg}"></div><div id="weather-description"><span>${weather}</span></div>`);
        $("#temperature").html(`<i class="fas fa-thermometer-half"></i><span>${temperature}°C</span>`);
        $("#humidity").html(`<i class="fas fa-tint"></i><span>${humidity}%</span>`);
        $("input").val("").blur();

        changeBackgroundColorByTemperature(temperature);
      }) 
  }
  
  function uppercaseFirstLetter(string) {
    return string.replace(string[0], string[0].toUpperCase());
  }

  function changeBackgroundColorByTemperature(temperature) {
    if(temperature > 35) changeBackgroundColor("rgba(253,83,6,255)");
    else if(temperature > 27) changeBackgroundColor("rgba(249,188,1,255)");
    else if(temperature > 20) changeBackgroundColor("rgba(104,176,51,255)")
    else if(temperature > 10) changeBackgroundColor("rgba(104,176,51,255)");
    else changeBackgroundColor("rgba(60,2,166,255)");
  }

  function changeBackgroundColor(color) {
    $("html").css({backgroundColor: color});
  }
});
