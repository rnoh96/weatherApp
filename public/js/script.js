const apiKey = "99f6e0bb452aa9cc30a809a88ab70465";

const City = document.querySelector("[data-city-name]")
const temp = document.querySelector("[data-temp]")
const icon = document.querySelector("[data-icon]")
const desc = document.querySelector("[data-desc]")
const humidity = document.querySelector("[data-humidity]")
const wind = document.querySelector("[data-wind]")
const searchBtn = document.querySelector("[data-search-button]")
const searchBar = document.querySelector("#citySearch")
const info = document.querySelector("[data-info]")

// Function that fetches weather data from openweather.org and display
function fetchWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
        .then((res) => res.json())
        .then((data) => {
            let fetchedData = {}

            fetchedData.city = data.name
            fetchedData.icon = data.weather[0].icon
            fetchedData.desc = data.weather[0].description
            fetchedData.temp = data.main.temp
            fetchedData.humidity = data.main.humidity
            fetchedData.windSpeed = data.wind.speed

            return fetchedData
        })
        .then(fetchedData => {
            City.innerHTML = fetchedData.city
            temp.innerHTML = fetchedData.temp
            icon.src = `https://openweathermap.org/img/wn/${fetchedData.icon}.png`
            desc.innerHTML = fetchedData.desc
            humidity.innerHTML = fetchedData.humidity
            wind.innerHTML = fetchedData.windSpeed
        })
        .catch((err) => {
            console.log(err)
            alert("We couldn't find the city you were looking for :(")
        })
};

// Event listeners that calls the fetchWeather function and display the data
searchBtn.addEventListener("click", () => {
    fetchWeather(searchBar.value)
    info.classList.remove("hide")
    searchBar.value = ""
})

searchBar.addEventListener("keyup", (e) => {
    if(e.key == "Enter") {
        fetchWeather(searchBar.value)
        info.classList.remove("hide")
        searchBar.value = ""
    }
})