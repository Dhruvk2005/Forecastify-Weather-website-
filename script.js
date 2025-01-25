const apikey = "9d0fe266add86f48bc3a1c90a3b06c1b";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?q=";

const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weathericon = document.querySelector(".weather-icon");

const city = searchbox.value.trim().toLowerCase(); // Convert input to lowercase
checkweather(city);

async function checkweather(city) {
    const response = await fetch(apiurl + city + `&appid=${apikey}`)

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".details").style.display = "none";
    }
    else {
        let data = await response.json();

        const kelvin = data.main.temp;
        const celcius = kelvin - 273.15;

        const mspeed = data.wind.speed;
        const kmspeed = Math.floor(mspeed * 3.6);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(celcius) + "°C";
        document.querySelector("#pcent").innerHTML = data.main.humidity + "%";
        document.querySelector("#speed").innerHTML = kmspeed + " km/h";



        if (data.weather[0].main == "Clouds") {
            weathericon.src = "Clouds.png";
        }
        else if (data.weather[0].main == "Clear") {
            weathericon.src = "clear-sky.png";
        }
        else if (data.weather[0].main == "Rain") {
            weathericon.src = "heavy-rain.png";
        }
        else if (data.weather[0].main == "Drizzle") {
            weathericon.src = "drizzle.png";
        }
        else if (data.weather[0].main == "Mist") {
            weathericon.src = "mist.png";
        }
        document.querySelector(".error").style.display = "none";

    }

}

searchbtn.addEventListener("click", () => {

    checkweather(searchbox.value);
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".details").style.display = "flex";
    searchbox.style.marginBottom = "20px";
    searchbtn.style.marginBottom = "20px";




})


