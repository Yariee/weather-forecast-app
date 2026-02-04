// handling DOM manipulation

const UI = {

    /** displaying current weather data on page
     * @param {object} data - weather data from API
     */

    displayCurrentWeather(data) {

        // container element
        const weatherInfo = document.getElementById('weather-info');

        // extract data from API
        const cityName = data.name;
        const country = data.sys.country;
        const temp = Math.round(data.main.temp);
        const feelsLike = Math.round(data.main.feels_like);
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const description = data.weather[0].description;
        const weatherIcon = data.weather[0].icon;

        // Building HTML using template
        const html = `
            <div class="weather-display">
                <div class="location">
                    <h3>${cityName}, ${country}</h3>
                    <img src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png"
                        alt="${description}">
                </div>

                <p class="description">${this.capitalize(description)}</p>

                <div class="temperature">
                    <span class="temp-value">${temp}</span>
                    <span class="temp-unit">°F</span>
                </div>

                <div class="weather-details">
                    <div class="detail-item">
                        <span class="detail-label">Feels Like</span>
                        <span class="detail-value">${feelsLike}°F</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Humidity</span>
                        <span class="detail-value">${humidity}%</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Wind Speed</span>
                        <span class="detail-value">${windSpeed} mph</span>
                    </div>
                </div>
            </div>
        `;
        weatherInfo.innerHTML = html;
    },
    /** Helper function for capitalzation of each word
     * @param {string} str - string to capitalize
     * @returns {string} Capitalized string
     */
    capitalize(str) {
        return str
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    },

    showError(message) {
        const weatherInfo = document.getElementById('weather-info');
        weatherInfo.innerHTML = `
            <div class="error-message">
                <p>${message}</p>
            </div>
        `;
    },

    showLoading() {
        const weatherInfo = document.getElementById('weather-info');
        weatherInfo.innerHTML = `
            <div class="loading">
                <p>Loading Weather Data...</p>
            </div>
        `;
    }
};