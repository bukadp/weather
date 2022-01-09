
let btn_deletes = document.querySelectorAll(".row__right-close");
let resultNowCity = document.querySelector(".tabcontent-now-city").textContent;
const btn_favorite = document.querySelector(".tabcontent-now-fvorite-btn"); 
const cityFavorites = document.querySelectorAll(".row__right-city");
let cityFavoriteAdd = document.querySelector(".row__right-locations");
const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
const serverUrlForecast = 'http://api.openweathermap.org/data/2.5/forecast';
const serverIcoUrl = 'https://openweathermap.org/img/wn/';
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
let favoriteCities = localStorage.getItem("favoriteCities") ? JSON.parse(localStorage.getItem("favoriteCities")) : [];


//Некорректно работает 
window.onload = function(){
  let cityName = localStorage.getItem("CurrentCity");
  if (!!cityName){
    fetchWeather(cityName);
    fetchForecast(cityName);
    //statrtCity(cityName);
  } 
  else {
  fetchWeather("Dnipro");
  fetchForecast("Dnipro");
  }
}

function initialFavoriteCities(){
  let currentCities = JSON.parse(localStorage.getItem("favoriteCities"));
  
}


for (let btn_delete of btn_deletes) {
  btn_delete.addEventListener("click", DeleteCityFromAddedLocations)
}


for (let cityFavorite of cityFavorites) {
  cityFavorite.addEventListener("click", getCityNameFromFavorite)
}

function clearCurrentForecast(){
  let forecastsForDelete = document.querySelectorAll(".tabcontent-forecast-info-box");
  for (let i=0; i<forecastsForDelete.length; i++){
    forecastsForDelete[i].remove();
  }
  
}

function getCityName (){
  let cityName = document.querySelector(".city").value;
      fetchWeather (cityName);
      clearCurrentForecast();
      fetchForecast(cityName);
}

function getCityNameFromFavorite(){
  cityName = this.textContent;
  fetchWeather(cityName);
  clearCurrentForecast();
  fetchForecast(cityName);
  getFavoriteButtonColor(cityName);
}

// chek btn
function getFavoriteButtonColor(cityName){
  if (!checkOnFavorites(cityName)){
    btn_favorite.classList.remove("active");  
 }
 else {
  
  btn_favorite.classList.add("active");
 }

}

// true or false
function checkOnFavorites(city){
  let parsedFavoriteCities = JSON.parse(localStorage.getItem("favoriteCities"));
    
    let isExist =  parsedFavoriteCities.includes(city);

    return isExist;
}

function fetchForecast(cityName){
  const urlForecast = `${serverUrlForecast}?q=${cityName}&appid=${apiKey}`;
  fetch(urlForecast)
  .then((response) => response.json())
  .then (data => {

    let resultForecastCity = document.querySelector(".tabcontent-forecast-city");
    resultForecastCity.innerHTML = `${data.city.name}`;

    handlerRender(data.list);
  })
  
}

function handlerRender(forecastList){
    
  forecastList.forEach(function(el){

    let icoNumber = `${el.weather[0].icon}`;
    let ico = document.createElement('img');
    ico.src = `${serverIcoUrl}${icoNumber}.png`;
    renderForecast(el, ico.src);

  })
}

function renderForecast(forecastList, icoSrc){
  
  let today = document.getElementById("forecastWeather");
  let day = moment(forecastList.dt).format('MMM DD');
  let time = moment(forecastList.dt).format('h:mm a');

  today.insertAdjacentHTML('afterend', `
  <div class="tabcontent-forecast-info-box" id="forecastWeather">
  <div class="tabcontent-forecast-info-box-day-time">
      <div class="tabcontent-forecast-info-box-day">${forecastList.dt}</div>
      <div class="tabcontent-forecast-info-box-time">${time}</div>
  </div>
  <div class="tabcontent-forecast-info-box-temp-ico">
      <div class="tabcontent-forecast-info-box-temp">
          <div class="tabcontent-forecast-info-box-temperature">Temperature: <span>${Math.round(+forecastList.main.temp-273)}</span>&#176;</div>
          <div class="tabcontent-forecast-info-box-feels">Feels like: <span>${Math.round(+forecastList.main.feels_like-273)}</span>&#176;</div>
      </div>
      <div class="tabcontent-forecast-info-box-ico">
          <div class="tabcontent-forecast-info-box-ico-name">${forecastList.weather[0].main[0].toUpperCase()}${forecastList.weather[0].main.slice(1)}</div>
          <div class="tabcontent-forecast-info-box-ico-icon box-ico" id="firstBoxIco"><img src="${icoSrc}" alt="weather"></div>
      </div>
  </div>
</div>
  `);

}

function fetchWeather (cityName){
  const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;
 
  fetch(url)
  .then((response) => response.json())
  .then (data => {
    
    let resultNowCity = document.querySelector(".tabcontent-now-city, .tabcontent-details-city"); 
    resultNowCity.innerHTML = `${data.name}`;

    let resultNowTemp = document.querySelector(".tabcontent-now-temp>span"); 
    let numberTemp = +`${data.main.temp}`;
    resultNowTemp.innerHTML = Math.round(numberTemp-273);
  
    let resultNowIco = document.querySelector(".tabcontent-now-ico"); 
    let icoNumber = `${data.weather[0].icon}`;
    let ico = document.createElement('img');
    ico.src = `${serverIcoUrl}${icoNumber}@4x.png`;
        
    resultNowIco.append(ico);
    let resultNowIcoFirst = document.querySelector(".tabcontent-now-ico>img"); 
    resultNowIcoFirst.remove();

    let resultDetailsCity = document.querySelector(".tabcontent-details-city"); 
    resultDetailsCity.innerHTML = `${data.name}`

    let resultTemp = document.querySelector(".tabcontent-details-temp>span"); 
    resultTemp.innerHTML = `${data.main.temp}`

    let resultSunrise = document.querySelector(".tabcontent-details-sunrise>span"); 
    resultSunrise.innerHTML = `${data.sys.sunrise}`

    let resultSunset = document.querySelector(".tabcontent-details-sunset>span"); 
    resultSunset.innerHTML = `${data.sys.sunset}`

    let resultFeelsLike = document.querySelector(".tabcontent-details-feels>span"); 
    resultFeelsLike.innerHTML = `${data.main.feels_like}`

    let resultWeatherDescription = document.querySelector(".tabcontent-details-weather>span");
    let resultWeatherDescriptionValue = `${data.weather[0].description}`;
    resultWeatherDescription.innerHTML = `${resultWeatherDescriptionValue[0].toUpperCase()}${resultWeatherDescriptionValue.slice(1)}`;
    
    HandlerFetch(data.name);

    })
    
    .catch(error => alert(error.message));     
  }


function  HandlerFetch (dataName){
  getFavoriteButtonColor(dataName);
  AddCurrentCityInLocalStorage(dataName);
}


  function AddCurrentCityInLocalStorage(nameCity){
    localStorage.setItem("CurrentCity", nameCity);
  }


  function DeleteCityFromAddedLocations(){
    this.parentElement.remove();
    let delCity = this.parentElement.querySelector(".row__right-city").innerText;
    
    let parsedFavoriteCities = JSON.parse(localStorage.getItem("favoriteCities"));
    
    let updatedFavoriteCities =  parsedFavoriteCities.filter(function (el){
      return el !== delCity;
    })
    localStorage.setItem("favoriteCities", JSON.stringify(updatedFavoriteCities));
    favoriteCities = updatedFavoriteCities;
    
    btn_favorite.classList.remove("active"); 
 }

  btn_favorite.addEventListener("click", isNew)
  

  //localStorage
  function isNew(){
    btn_favorite.classList.toggle('active')
    
    if (btn_favorite.classList.contains('active')){
      HandleFavoriteClick();
    }
    else{
      DeleteCity();
    }
  }

  
function DeleteCity(){
  let resultNowCity = document.querySelector(".tabcontent-now-city").textContent;

  let arrFavoriteCities = document.getElementsByClassName("row__right-city");
  
  let deleteFavoriteCities; 
  for (let i=0; i<arrFavoriteCities.length; i++){
    if (resultNowCity==arrFavoriteCities[i].textContent){
      deleteFavoriteCities = arrFavoriteCities[i];
    }
    
  }

  deleteFavoriteCities.parentElement.remove();
  
  let parsedFavoriteCities = JSON.parse(localStorage.getItem("favoriteCities"));
  
  let updatedFavoriteCities =  parsedFavoriteCities.filter(function (el){
    return el !== resultNowCity;
  })
  localStorage.setItem("favoriteCities", JSON.stringify(updatedFavoriteCities));
  favoriteCities = updatedFavoriteCities;
  
}

function HandleFavoriteClick(){
   AddCity(); 
   AddFavoriteCities();
}

  
  function AddFavoriteCities(){
    let resultNowCity = document.querySelector(".tabcontent-now-city").textContent;
    let result = CheckCityInLocalStorage(resultNowCity);
    if (result == false){   
    
     favoriteCities.push(resultNowCity);

    localStorage.setItem("favoriteCities", JSON.stringify(favoriteCities));
    }
  }

//проверка в localStorage наличие города
function CheckCityInLocalStorage(resultNowCity){
  let result = false;
  let parsedFavoriteCities = JSON.parse(localStorage.getItem("favoriteCities"));
  
  if (!!parsedFavoriteCities){
    result = parsedFavoriteCities.includes(resultNowCity);
  }
  return result;
}

function checkToExistCity(city){
  return localStorage.getItem(city);
}

function checkToExistCityInTheList(cityName){
  let result = null;
  let cities = document.querySelectorAll(".row__right-citys");
   cities.forEach(function (city){
    if (city.innerText == cityName){
       result = city.innerText;
    }
    })
    return result
}

function AddCity(){
  let resultNowCity = document.querySelector(".tabcontent-now-city").textContent;
  if (!checkToExistCity(resultNowCity)){
     btn_favorite.classList.add("active");
     
  }
  if (!checkToExistCityInTheList(resultNowCity)){
    let cityFavorite = document.createElement('li'); 
    cityFavorite.classList.add("row__right-citys");
    cityFavoriteAdd.prepend(cityFavorite);
    cityFavorite.innerHTML = `
          <button class="row__right-city">${resultNowCity}</button>
          <button class="row__right-close" data-close="close"></button>
          `;
    document.querySelector(".row__right-close").addEventListener("click", DeleteCityFromAddedLocations);
    document.querySelector(".row__right-city").addEventListener("click", getCityNameFromFavorite);
  }
}

//Tabs 
function openWeather(evt, tabsSwitch) {
    // Declare all variables
    let i, tabcontent, tablinks;
    // Get all elements with class="row__left-tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabsSwitch).style.display = "flex";
    evt.currentTarget.className += " active";
  }
// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

