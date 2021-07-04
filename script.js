$(document).ready(function () {
  $("#get-weather-form").submit(fetchWeatherInfo);
  
  function fetchWeatherInfo(e) {
    e.preventDefault();
    const API_KEY = "e3317d99839f28cae3e45874131d91f2";
    const CITY_NAME = $("#city-name-input").val();
    console.log(CITY_NAME)
    const URL = `http://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME.replace(/\s/g, "").trim()}&appid=${API_KEY}&units=metric`

    fetch(URL)
      .then(res => res.json())
      .then(data => {
        console.log(data);

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
        console.log(cityName, temperature, weather, humidity)

        $("#city-name").html(`<span>${cityName}</span>`);
        $("#weather").html(`<img src="${weatherIconImg}"><span>${weather}</span>`);
        $("#temperature").html(`<span>${temperature}</span>`);
        $("#humidity").html(`<span>${humidity}</span>`);
      }) 
  }
  
  function uppercaseFirstLetter(string) {
    return string.replace(string[0], string[0].toUpperCase());
  }
});
