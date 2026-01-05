// Function to fetch weather details using Open-Meteo public API
async function getWeather() {

    // Get city name entered by the user
    let city = document.getElementById("city").value.trim();

    // Check if input is empty
    if (city === "") {
        document.getElementById("result").innerText =
            "Please enter a city name";
        return;
    }

    try {
        // Step 1: Get latitude and longitude using Open-Meteo Geocoding API
        let geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
        );
        let geoData = await geoResponse.json();

        // If city is not found
        if (!geoData.results || geoData.results.length === 0) {
            document.getElementById("result").innerText =
                "City not found";
            return;
        }

        // Extract latitude and longitude
        let latitude = geoData.results[0].latitude;
        let longitude = geoData.results[0].longitude;

        // Step 2: Fetch current weather data using latitude and longitude
        let weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        );
        let weatherData = await weatherResponse.json();

        // Display weather information
        document.getElementById("result").innerHTML =
            `Temperature: ${weatherData.current_weather.temperature} °C <br>
             Wind Speed: ${weatherData.current_weather.windspeed} km/h`;

    } catch (error) {
        // Handle any unexpected error
        document.getElementById("result").innerText =
            "Unable to fetch weather data";
    }
}
