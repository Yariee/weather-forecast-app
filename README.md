# weather-forecast-app
A responsive, real-time weather application built with Javascript that provides current weather conditions, 5-day forecasts and automatic location detection.

**[Live Demo](https://weather-forecast-app-eight-steel.vercel.app/)**

![Weather App Screenshots](screenshots/Weather%20Report.jpeg)

---

## Features
- **Current Weather Display**: Real-time temperature with humditiy and wind speed.
- **5-Day Forecast**: Detailed daily forecasts with high/low temperature metrics.
- **Location Detection**: Automatic geolocation using browser GPS
- **Interactive UI**: Smooth animations and hover effects.
- **Error Handling**: User-friendly error messages and loading states.

## Technologies being Used (update if anything new changes if not, FIXME and delete)

- **HTML5** - Semantic markup
- **CSS3** - Flexbox, Grid, gradients, animations
- **JavaScript (ES6+)** - Async/await, Fetch API, Gelocation API
- **OpenWeatherMap API** - Weather data and geocoding
- **Vercel** - Deployment and Hosting

--- 

### Prerequisites 
- OpenWeatherMap API Key ([Get one free here])(https://openweathermap.org/api)

## Installation

1. Close the repository:
```bash
git clone git@github.com:Yariee/weather-forecast-app.git
cd weather-forecast-app
```
2. Add your API Key

Create `js/config.js`:
```javascript
const config = {
    API_KEY: 'your-api-key-here',
    BASE_URL: 'https://api.openweathermap.org/data/2.5'
};
```

3. **Run Locally**
Open `index.html` in your browser or use a local server:
```bash
# using Node.js
npx http-server
```

4. **Visit** `http://localhost:8000`

---

## How it works

### API Integration
- Fetches current weather and 5-day forecast from OpenWeatherMap API
- Using reverse geocoding, we convert coordinates to city names
- Handles rate limiting and error reponses

### Data Processing
- Groups 40 forecast entries into 5 daily summaries.
- Calculate min/max temperatures and averages for humditiy and wind speed.
- Formats dates and times for user-friendly interface.

### Gelocation
- Uses browser's Geolocation API to detect the users coordinates
- Implements error handling for permission denied, timetout, etc.
- Falls back to manually searching a city if geolocation fails.

--- 

## License 

MIT License - feel free to clone this project for learning!

--- 

## Author

**Yair Ballinas**
- Github: [@Yariee](https://github.com/Yariee)
- Linkedin: [Yair Ballinas](https://www.linkedin.com/in/yair-ballinas/) 

--- 

## Acknowledgements

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Weather icons from OpenWeatherMap
- Deployed on [Vercel](https://vercel.com)

--- 

**This project was built as part of my software engineering portfolio**