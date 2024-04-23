const input = document.querySelector(".searchBar");
const cityName = document.querySelector(".city");
const search = document.querySelector(".search");
const weatherTable = document.querySelector(".Weather-table");
const APIkey = "322c5854459f46e4bb203648240601";
const weatherCondition = document.querySelector(".weatherCondition");
const temp = document.querySelector(".temp");
const feelsLike = document.querySelector(".feelsLike");
const max = document.querySelector(".tempMax");
const humidity = document.querySelector(".humidity");
const deg = document.querySelector(".deg");
const toggleFButton = document.querySelector('.toggle-F');

async function getWeather(location) {
  const response = await fetch('http://api.weatherapi.com/v1/current.json?q=' + location + '&key=' + APIkey, { mode: 'cors' });
  const data = await response.json();
  const a = data.location.name;
  const b = data.current.temp_c;
  const c = data.current.feelslike_c;
  const d = data.current.condition.text;
  const e = data.current.humidity;
  buildPage(a, b, c, d, e);
  getSticker(d);
}

getWeather("London");

const buildPage = (place, t, feels, desc, humid, m) => {
  desc = desc.charAt(0).toUpperCase() + desc.slice(1);
  cityName.textContent = place;
  weatherCondition.textContent = desc;
  temp.textContent = Math.round(t);
  feelsLike.textContent = "Feels like: " + Math.round(feels) + "°C";
  max.textContent = "Today's high: " + Math.round(m) + "°C";
  humidity.textContent = "Humidity: " + humid + "%";
};

async function toggleTemperatureUnit() {
  let location = cityName.textContent;
  let unit = "imperial"; 
  if (this.textContent === "F") {
    unit = "metric"; 
    this.textContent = "C"; 
  } else {
    this.textContent = "F"; 
  }
  
  const response = await fetch('https://api.weatherapi.com/v1/current.json?q=' + location + '&key=' + APIkey + '&unit=' + unit, { mode: 'cors' });
  const data = await response.json();
  const a = data.location.name;
  const b = (unit === "metric") ? data.current.temp_c : data.current.temp_f; 
  const c = (unit === "metric") ? data.current.feelslike_c : data.current.feelslike_f; 
  const d = data.current.condition.text;
  const e = data.current.humidity;
  getSticker(d);
  buildPage(a, b, c, d, e);
}

toggleFButton.addEventListener('click', toggleTemperatureUnit);

async function getSticker(search) {
  try {
    const response = await fetch("http://api.giphy.com/v1/gifs/search?api_key=" + APIkey + "&q=" + search, { mode: "cors" });
    const sticker = await response.json();
    img.src = sticker.data.images.fixed_height.url;
  } catch (error) {
    console.log(error);
  }
};

search.addEventListener("click", () => {
  getWeather(input.value);
});

const toggleDarkMode = () => {
  document.body.classList.toggle('dark-mode');
};

const darkModeButton = document.querySelector('.Dark-Mode');
darkModeButton.addEventListener('click', toggleDarkMode);

