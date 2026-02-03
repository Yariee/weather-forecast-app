// app.js tests our API calls
 
// waiting for DOM to load in
document.addEventListener('DOMContentLoaded', async () => {

    try {
        // Test current weather
        console.log('Testing API..');
        const weather = await API.getCurrentWeather('Houston');
        console.log('Weather Data:', weather);

        // Can we access the weather?
        console.log('Temperature:', weather.main.temp);
    } catch (error) {
        console.log('Test failed:', error.message);
    }
});