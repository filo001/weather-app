const WEATHER_API_KEY = "264fe9d6de7446fd9bb50457240104"

export async function getWeatherData(city) {
    const weatherJsonData = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${city}`, {
        mode: 'cors'
    })
    const weatherData = await weatherJsonData.json()
    return weatherData
}

export async function getTemperature(city) {
    const weatherData = await getWeatherData(city)
    const temperature = weatherData.current.temp_c
    return temperature
    
}


export async function getWinds(city) {
    const weatherData = await getWeatherData(city)
    const winds = weatherData.current.wind_kph
    return winds
}


export async function getCondition(city) {
    const weatherData = await getWeatherData(city)
    const conditionText = weatherData.current.condition.text
    const conditionIcon = weatherData.current.condition.icon

    const condition = {
        text: conditionText,
        iconSrc: conditionIcon
    }
    return condition
}

export async function getLocationData(city) {
    const weatherData = await getWeatherData(city)
    return weatherData.location
}
