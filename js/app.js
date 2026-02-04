// app.js tests our API calls
 
// waiting for DOM to load in
document.addEventListener('DOMContentLoaded', async () => {

    try {

        // loading indicator
        UI.showLoading();

        // Test current weather
        console.log('Testing API..');
        const weather = await API.getCurrentWeather('Houston');
        console.log('Weather Data:', weather);

        // display weather on page
        UI.displayCurrentWeather(weather);

    } catch (error) {
        console.error('Error:', error);
        UI.showError('Failed to load weather data. Please Try again...');
    }
});