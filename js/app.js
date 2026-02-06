// app.js tests our API calls
 
// waiting for DOM to load in
document.addEventListener('DOMContentLoaded', async () => {

    // DOM Elements
    const searchBtn = document.getElementById('search-btn');
    const cityInput = document.getElementById('city-input');
    const locationBtn = document.getElementById('location-btn');
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

    locationBtn.addEventListener('click', getUserLocation);
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

/**
 * Get user's location and load weather
 */
async function getUserLocation() {
    if (!navigator.geolocation) {
        UI.showError('Geolocation is not supported by your browser');
        return;
    }
    
    UI.showLoading();
    
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            
            console.log('User coordinates:', lat, lon);
            
            try {
                // Use reverse geocoding to get detailed location info
                const geoResponse = await fetch(
                    `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${CONFIG.API_KEY}`
                );
                const geoData = await geoResponse.json();
                
                console.log('Geocoding data:', geoData);
                
                // Get actual city name (might be Rosenberg instead of Houston!)
                const actualCity = geoData[0].name;
                const state = geoData[0].state || geoData[0].country;
                
                console.log('Detected location:', actualCity, state);
                
                // Fetch weather using coordinates (most accurate)
                const [weather, forecast] = await Promise.all([
                    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${CONFIG.API_KEY}&units=metric`)
                        .then(res => res.json()),
                    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${CONFIG.API_KEY}&units=metric`)
                        .then(res => res.json())
                ]);
                
                console.log('Weather data received:', weather);
                
                // Display weather
                UI.displayCurrentWeather(weather);
                UI.displayForecast(forecast);
                
                // Show detected location in input
                document.getElementById('city-input').value = `${actualCity}, ${state}`;
                
            } catch (error) {
                console.error('Error getting location weather:', error);
                UI.showError('Could not load weather for your location. Please search manually.');
            }
        },
        (error) => {
            console.error('Geolocation error:', error);
            
            let errorMessage = 'Could not get your location. ';
            
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage += 'Please enable location permissions.';
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage += 'Location information unavailable.';
                    break;
                case error.TIMEOUT:
                    errorMessage += 'Location request timed out.';
                    break;
                default:
                    errorMessage += 'Please search manually.';
            }
            
            UI.showError(errorMessage);
        }
    );
}