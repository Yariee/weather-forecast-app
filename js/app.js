// app.js tests our API calls
 
// waiting for DOM to load in
document.addEventListener('DOMContentLoaded', async () => {

    // DOM Elements
    const searchBtn = document.getElementById('search-btn');
    const cityInput = document.getElementById('city-input');

    // default city on page load
    loadWeather('Houston');

    // event listener for search button click
    searchBtn.addEventListener('click', () =>  {
        const city = cityInput.value.trim();    // trim() removes white space 
        if (city) {
            loadWeather(city);
        } else {
            UI.showError('Please enter a valid city');
        }
    });

    // event listener for 'Enter' key in input 
    cityInput.addEventListener('keypress', (e) => {
        if (e.key == 'Enter') {
            const city = cityInput.value.trim();

            if (city) {
                loadWeather(city);
            } else {
                UI.showError('Please enter a valid city');
            }
        }
    });
});

/** 
 * Fetches and displays weather based on input
 * @param {string} city - city name to search
 */

async function loadWeather(city) {
    try {
        // loading indicator
        UI.showLoading();

        // fetch weather data and forecast. Promise helps fetch multiple things at once instead of one by one
        // pretty much doing it in parallel
        console.log(`Fetching weather for ${city}...`);
        const [weather, forecast] = await Promise.all([
            API.getCurrentWeather(city),
            API.getForecast(city)
        ]);

        console.log('Weather data received:', weather);
        console.log('Forecast data received:', forecast);

        // Display weather and forecast on page
        UI.displayCurrentWeather(weather);
        UI.displayForecast(forecast);
    } catch (error) {
        console.log('Error:', error);
        UI.showError(`Could not find weather data for ${city}. Please check the city name and try again.`);
    }
}
