async function getWeather() {
    let city = document.getElementById("city").value.trim();
    let result = document.getElementById("result");

    if (city === "") {
        result.innerText = "Please enter a city name";
        return;
    }

    result.innerText = "Loading...";

    try {
        let geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
        );
        let geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            result.innerText = "City not found";
            return;
        }

        let latitude = geoData.results[0].latitude;
        let longitude = geoData.results[0].longitude;

        let weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        );
        let weatherData = await weatherResponse.json();

        if (!weatherData.current_weather) {
            result.innerText = "Weather data not available";
            return;
        }

        result.innerHTML =
            `Temperature: ${weatherData.current_weather.temperature} °C <br>
             Wind Speed: ${weatherData.current_weather.windspeed} km/h`;

    } catch (error) {
        result.innerText = "Unable to fetch weather data";
    }
}
