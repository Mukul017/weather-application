
const apiKey = "fc86897acb3e28aaebf1e55991a1206a"; // Your WeatherStack API Key

async function getWeather(city) {
    const url = `https://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.error) {
            document.getElementById("error-message").textContent = `Error: ${data.error.info}`;
            clearWeatherData();
        } else {
            const temp = data.current.temperature;
            const humidity = data.current.humidity;
            const description = data.current.weather_descriptions[0];
            const windSpeed = data.current.wind_speed;
            const cityName = data.location.name;
            const iconUrl = data.current.weather_icons[0]; // WeatherStack provides icon URLs

            document.getElementById("city-name").textContent = `Weather in ${cityName}`;
            document.getElementById("temperature").textContent = `${temp}°C`;
            document.getElementById("humidity").textContent = `Humidity: ${humidity}%`;
            document.getElementById("weather-description").textContent = description;
            document.getElementById("wind-speed").textContent = `Wind Speed: ${windSpeed} km/h`;
            document.getElementById("weather-icon").querySelector("img").src = iconUrl;

            updateTime();
        }
    } catch (error) {
        document.getElementById("error-message").textContent = "Failed to fetch weather data.";
        clearWeatherData();
    }
}

function updateTime() {
    const currentDate = new Date();
    const currentTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
    document.getElementById("current-time").textContent = `Last updated: ${currentTime}`;
}

function clearWeatherData() {
    document.getElementById("city-name").textContent = "";
    document.getElementById("temperature").textContent = "";
    document.getElementById("weather-description").textContent = "";
    document.getElementById("humidity").textContent = "";
    document.getElementById("wind-speed").textContent = "";
}

// Example call to get weather data for Bangalore
getWeather("Kota, Rajasthan, India");
