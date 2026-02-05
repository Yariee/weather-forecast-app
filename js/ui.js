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
    },

    /**
     * Processes forecast data and groups by day
     * @param {object} forecastData - Raw forecast data from API
     * @returns {array} Array of daily forecast
     */
    processForecastData(forecastData) {
        const dailyData = {};

        // Group forecasts by date
        forecastData.list.forEach(item => {
            // extract date (ignoring the time that's in the data)
            const date = item.dt_txt.split(' ')[0];
            
            // if date doesn't exist, create it. Includes collecting all data 
            if (!dailyData[date]) {
                dailyData[date] = {
                    date: date,
                    temps: [], 
                    weather: [],
                    icons: [],
                    humidity: [],
                    feelsLike: [],
                    windSpeed: []
                };
            }
            
            // pushing entry data to the date
            dailyData[date].temps.push(item.main.temp);
            dailyData[date].weather.push(item.weather[0].main);
            dailyData[date].icons.push(item.weather[0].icon);
            dailyData[date].humidity.push(item.main.humidity);
            dailyData[date].feelsLike.push(item.main.feels_like);
            dailyData[date].windSpeed.push(item.wind.speed);

        });
        
        // convert object into an array and calculate max/min for each day.
        const dailyForecast = Object.keys(dailyData).map(date => {
            const day = dailyData[date];

            // helper function to calculate average
            const average = arr => Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);

            return {
                date: date, 
                tempMin: Math.round(Math.min(...day.temps)),
                tempMax: Math.round(Math.max(...day.temps)),
                weather: day.weather[0],
                icon: day.icons[0],
                humidity: average(day.humidity),
                feelsLike: average(day.feelsLike), 
                windSpeed: average(day.windSpeed)
            };
        });

        // returning only first 5 days
        return dailyForecast.slice(0, 5);
    },

    /**
     * Displays 5-day forecast
     * @param {object} forecastData - raw forecast data from API
     */
    displayForecast(forecastData) {
        const forecastContainer = document.getElementById('forecast-container');

        // processing raw data into summaries
        const dailyForecast = this.processForecastData(forecastData);

        // HTML for 5 day forecast
        const html = dailyForecast.map(day =>  {
            // formatting
            const date = new Date(day.date);
            const dayName = date.toLocaleDateString('en-US', {weekday: 'short' });
            const monthDay = date.toLocaleDateString('en-US', {month: 'short', day: 'numeric' });

            return `
                <div class="forecast-card">
                    <h4>${dayName}</h4>
                    <p class="forecast-date">${monthDay}</p>
                    <img src="https://openweathermap.org/img/wn/${day.icon}@2x.png"
                        alt="${day.weather}">
                    <p class="forecast-weather">${day.weather}</p>
                    <div class="forecast-temps">
                        <span class="temp-high">${day.tempMax}°</span>
                        <span class="temp-low">${day.tempMin}°</span>
                    </div>
                    <div class="forecast-details">
                        <p><small>Feels Like: ${day.feelsLike}°F</small></p>
                        <p><small>Humditiy: ${day.humidity}%</small></p>
                        <p><small>Wind: ${day.windSpeed} mph</small></p>
                    </div>
                </div>
            `;
        }).join('');

        forecastContainer.innerHTML = html;
    }
};