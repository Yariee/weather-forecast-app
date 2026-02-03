// API.JS will be handling all the API calls to OpenWeatherMap

const API = {
    BASE_URL: 'https://api.openweathermap.org/2.5',

    /**
     * fetch current weather data for a city
     * @param {string} city
     * @returns {Promise<object>} Weather Data
     */

     async getCurrentWeather(city) {
        try {
            // Construct URL and make API request
            const url = `${this.BASE_URL}/weather?q=${city}&appid=${CONFIG.API_KEY}&units=metric`;

            const response = await fetch(url)   // fetch deals specifically with network errors

            // Checking reponse is ok
            if (!response.ok) {
                throw new Error(`City not found: ${city}`);    // HTTP Errors
            }

            // parsing JSON response
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching weather:', error);
            throw error;
        }
     },

     /**
      * Fetches 5-day forecast data for city
      * @param {string} city
      * @returns {Promise<object>} Weather data
      */

     async getForecast(city) {
        try {
            const url = `${this.BASE_URL}/forecast?q=${city}&appid=${CONFIG.API_KEY}&units=metric`;

            const reponse = await fetch(url);

            if (!reponse.ok) {
                throw new Error(`Forefast not available for: ${city}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching forecast:', error);
            throw error;
        }
     }
};