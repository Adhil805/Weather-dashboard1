const cityinput=document.querySelector("input");
const searchButton=document.querySelector("button");
const message=document.querySelector("#message");
const weatherinfo=document.querySelector("#weather-info");
const loader=document.querySelector("#loader")

// console.log(cityinput);
// console.log(searchButton)
searchButton.addEventListener("click",function(){
    let city=cityinput.value;
    getWeather(city);
});
async function getWeather(city){
    message.textContent="";
    weatherinfo.innerHTML = "";
    if(city.trim()===""){
        message.textContent="Please Enter a City Name";
        return;
    }
    message.textContent="Loading Weather... ";
    loader.style.display="block";
    try{
         const apiKey="407d9711b1f5363572a0be2277885c90";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response=await fetch(apiUrl);
    if(!response.ok){
        throw new Error("City Not Found");
    }
    const data=await response.json();
    message.textContent="";
loader.style.display="none";
   document.querySelector("#humidity").textContent =
    data.main.humidity + "%";

document.querySelector("#wind-speed").textContent =
    data.wind.speed + " m/s";

document.querySelector("#feels-like").textContent =
    data.main.feels_like + "°C";
  weatherinfo.innerHTML = `
    <h2>${data.name}</h2>

    <img
        src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"
        alt="${data.weather[0].description}"
    >

    <p>Temperature: ${data.main.temp}°C</p>

    <p>Weather: ${data.weather[0].description}</p>

    <button onclick="addFavorite('${data.name}')">
        ⭐ Add to Favorites
    </button>
`;
}catch(error){
    message.textContent=error.message;
    loader.style.display = "none";
    weatherinfo.innerHTML="";
}
}
async function addFavorite(city) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (favorites.includes(city)) {
        message.textContent = "City already in favorites!";
        return;}
    favorites.push(city);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    loadFavorites();
    message.textContent = "City added to favorites!";
}function loadFavorites() {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const favoritesList = document.querySelector("#favoritesList");
    favoritesList.innerHTML = "";
    favorites.forEach(function(city) {
        favoritesList.innerHTML += `
            <button onclick="getWeather('${city}')">
                ${city}
            </button>
        `;
    });
}