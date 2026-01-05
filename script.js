async function getWeather() {

    let city = document.getElementById("city").value.trim();

    if (city === "") {
        document.getElementById("result").innerText =
            "Please enter a city name";
        return;
    }

    try {
        // Get latitude & longitude using geocoding API
        let geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
        );
        let geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            document.getElementById("result").innerText =
                "City not found";
            return;
        }

        let lat = geoData.results[0].latitude;
        let lon = geoData.results[0].longitude;

        // Fetch weather data using latitude & longitude
        let weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
        );
        let weatherData = await weatherResponse.json();

        document.getElementById("result").innerHTML =
            `Temperature: ${weatherData.current_weather.temperature} °C <br>
             Wind Speed: ${weatherData.current_weather.windspeed} km/h`;

    } catch (error) {
        document.getElementById("result").innerText =
            "Unable to fetch weather data";
    }
}
