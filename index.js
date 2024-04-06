import { getCondition, getLocationData, getWeatherData, getTemperature, getWinds } from "./weatherData.js"
import { returnGifSrc } from "./gif.js"

const headerContainer = document.querySelector("#HeaderContainer")
const weatherDisplay = headerContainer.querySelector(".weatherDisplay")
const mainDisplay = headerContainer.querySelector(".mainDisplay")
const gifDisplay = headerContainer.querySelector(".gifDisplay")
const messages = {
    true: "We SHOULD go fishing today",
    false: "We should NOT go fishing today"
}


async function displayWeather(city, display) {
    
    while (display.firstChild) {
        display.removeChild(display.firstElementChild)
    }
    const loader = document.createElement("div")
    loader.setAttribute("id", "loader")
    display.appendChild(loader)

    const conditionData = await getCondition(city)
    const iconSrc = conditionData.iconSrc
    const condition = conditionData.text
    const temperature = await getTemperature(city)
    const wind = await getWinds(city)
    const LocationData = await getLocationData(city)
    const lastUpdated = await getWeatherData(city)
    
    display.removeChild(loader)
   
    const cityInfo = document.createElement("h1")
    cityInfo.textContent = `${LocationData.name}, ${LocationData.region}`
    const lastUpdatedText = document.createElement("p")
    lastUpdatedText.textContent = `Last updated at: ${lastUpdated.current.last_updated}`
    const img = document.createElement("img")
    img.src = iconSrc
    const ConditionText = document.createElement("h3")
    ConditionText.textContent = condition
    const TemperatureText = document.createElement("p")
    TemperatureText.textContent = `Current Temperature: ${temperature}° C`
    const WindText = document.createElement("p")
    WindText.textContent = `Current Winds: ${wind}km/h`

    display.appendChild(cityInfo)
    display.appendChild(lastUpdatedText)
    display.appendChild(img)
    display.appendChild(ConditionText)
    display.appendChild(TemperatureText)
    display.appendChild(WindText)
    console.log("displayed")
}

async function displayMain(city, display) {
    while (display.firstChild) {
        display.removeChild(display.firstElementChild)
    }
    const loader = document.createElement("div")
    loader.setAttribute("id", "loader")
    display.appendChild(loader)
    const text = document.createElement("h1")
    const result = await decisionLogic(city).
    then(async function(value) {
        text.textContent = messages[value]
        display.appendChild(text)
        const gif = document.createElement("img")
        const gif_prefix = await getCondition(city)
        gif.src = await returnGifSrc(`${gif_prefix.text} fishes`)
        display.removeChild(loader)
        display.appendChild(gif)
    })


}

async function decisionLogic(city) {
    const condition = await getCondition(city)
    const conditionData = condition.text
    // const condition = conditionData.text
    // const temperature = await getTemperature(city)
    // const wind = await getWinds(city)
    // const LocationData = await getLocationData(city)
    console.log(conditionData)
    if (conditionData == "Sunny" || conditionData == "Partly cloudy" ||
    conditionData == "Overcast" || conditionData == "Light rain" || conditionData == "Patchy rain nearby" || conditionData == "Clear"
    ) {
        return true
    }
    else {
        return false
    }


}

const errormsg = document.querySelector("#errormsg")
const button = document.querySelector("button")
const input = document.querySelector("input")
button.addEventListener("click", async (e) => {
    e.preventDefault()
    const msg = await getWeatherData(input.value)
    console.log(msg)
    if ('error' in msg) {
        errormsg.textContent = msg.error.message
        return
    }
    renderHeader(input.value)
    input.value = ""
})


function renderHeader (city) {
    displayWeather(city, weatherDisplay)
    displayMain(city, mainDisplay)
}

renderHeader("brisbane")


