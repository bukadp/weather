import {timeTransform, dateTransform} from "./converters.js";
//let module = await import('./converters.js');

let btn_deletes = document.querySelectorAll(".row__right-close");
let resultNowCity = document.querySelector(".tabcontent-now-city").textContent;
const btn_favorite = document.querySelector(".tabcontent-now-fvorite-btn"); 
const cityFavorites = document.querySelectorAll(".row__right-city");
let cityFavoriteAdd = document.querySelector(".row__right-locations>ul");
const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
const serverUrlForecast = 'http://api.openweathermap.org/data/2.5/forecast';
const serverIcoUrl = 'https://openweathermap.org/img/wn/';
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
let favoriteCities = localStorage.getItem("favoriteCities") ? new Set (JSON.parse(localStorage.getItem("favoriteCities"))) 
                                                                  : new Set();

//onload main page
window.onload = function(){
  let cityName = localStorage.getItem("CurrentCity");
  initialFavoriteCities();
  if (!!cityName){
    fetchWeather(cityName);
    fetchForecast(cityName);
  } 
  else {
  fetchWeather("Dnipro");
  fetchForecast("Dnipro");
  }
}

let formValue = document.querySelector(".search__city");
formValue.addEventListener("submit", getCityName);


function initialFavoriteCities(){
  let currentFavoriteCities = new Set(JSON.parse(localStorage.getItem("favoriteCities")));
  if (!currentFavoriteCities==true){
    return;
  }
  currentFavoriteCities.forEach(function(el){
    renderFavoriteCities(el);
  })

}

//addEventListener on cross
for (let btn_delete of btn_deletes) {
  btn_delete.addEventListener("click", DeleteCityFromAddedLocations)
}

//addEventListener on favorite cities list
for (let cityFavorite of cityFavorites) {
  cityFavorite.addEventListener("click", getCityNameFromFavorite)
}

//clear box in forecast
function clearCurrentForecast(){
  let forecastsForDelete = document.querySelectorAll(".tabcontent-forecast-info-box");
  for (let i=0; i<forecastsForDelete.length; i++){
    forecastsForDelete[i].remove();
  }
  
}

//get City from UI form & fetch weather
function getCityName (){
  let cityName = document.querySelector(".city").value;
      fetchWeather (cityName);
      clearCurrentForecast();
      fetchForecast(cityName);
}

//get City from favorite cities & fetch weather
function getCityNameFromFavorite(){
  cityName = this.textContent;
  fetchWeather(cityName);
  clearCurrentForecast();
  fetchForecast(cityName);
  getFavoriteButtonColor(cityName);
}

//favorite btn color 
function getFavoriteButtonColor(cityName){
  if (!checkOnFavorites(cityName)){
    btn_favorite.classList.remove("active");  
 }
 else {
  
  btn_favorite.classList.add("active");
 }

}


function checkOnFavorites(city){
  let parsedFavoriteCities = new Set(JSON.parse(localStorage.getItem("favoriteCities")));
  let isExist = parsedFavoriteCities.has(city);
    return isExist;
}



//fetch Forecast
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

// get ico weather
function handlerRender(forecastList){
    
  forecastList.forEach(function(el){

    let icoNumber = `${el.weather[0].icon}`;
    let ico = document.createElement('img');
    ico.src = `${serverIcoUrl}${icoNumber}.png`;
    renderForecast(el, ico.src);

  })
}

//render forecast
function renderForecast(forecastList, icoSrc){
  
 let today = document.querySelector(".tabcontent-forecast-info");

  today.insertAdjacentHTML('beforeBegin', `
  <div class="tabcontent-forecast-info-box" id="forecastWeather">
  <div class="tabcontent-forecast-info-box-day-time">
      <div class="tabcontent-forecast-info-box-day">${dateTransform(forecastList.dt)}</div>
      <div class="tabcontent-forecast-info-box-time">${timeTransform(forecastList.dt)+"0"}</div>
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

//fetch Weather
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
    resultTemp.innerHTML = `${Math.round(data.main.temp-273)}`

    let resultSunrise = document.querySelector(".tabcontent-details-sunrise>span"); 
    resultSunrise.innerHTML = "0"+timeTransform(data.sys.sunrise);

    let resultSunset = document.querySelector(".tabcontent-details-sunset>span"); 
    resultSunset.innerHTML = timeTransform(data.sys.sunset);

    let resultFeelsLike = document.querySelector(".tabcontent-details-feels>span"); 
    resultFeelsLike.innerHTML = `${Math.round(data.main.feels_like-273)}`

    let resultWeatherDescription = document.querySelector(".tabcontent-details-weather>span");
    let resultWeatherDescriptionValue = `${data.weather[0].description}`;
    resultWeatherDescription.innerHTML = `${resultWeatherDescriptionValue[0].toUpperCase()}${resultWeatherDescriptionValue.slice(1)}`;
    
    HandlerFetch(data.name);

    })
    
    .catch(error => alert(error.message));     
  }


//after fetch weather Handler
function  HandlerFetch (dataName){
  getFavoriteButtonColor(dataName);
  AddCurrentCityInLocalStorage(dataName);
}

//Add Current City In LocalStorage
  function AddCurrentCityInLocalStorage(nameCity){
    localStorage.setItem("CurrentCity", nameCity);
  }

 function DeleteCityFromAddedLocations(){
  this.parentElement.remove();
  let delCity = this.parentElement.querySelector(".row__right-city").innerText;
  
  let parsedFavoriteCities = new Set (JSON.parse(localStorage.getItem("favoriteCities")));
  parsedFavoriteCities.delete(delCity)
  localStorage.setItem("favoriteCities", JSON.stringify([...parsedFavoriteCities]));
  favoriteCities = parsedFavoriteCities;
  let resultNowCity = document.querySelector(".tabcontent-now-city").textContent; 
   
  if (delCity===resultNowCity){
    btn_favorite.classList.remove("active"); 
  }
  else{
    return;
  } 

}

  btn_favorite.addEventListener("click", isNew)
  

  //toggle favorite btn
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
     
  let parsedFavoriteCities = new Set (JSON.parse(localStorage.getItem("favoriteCities")));
  parsedFavoriteCities.delete(resultNowCity)
  localStorage.setItem("favoriteCities", JSON.stringify([...parsedFavoriteCities]));
  favoriteCities = parsedFavoriteCities;
}
function HandleFavoriteClick(){
   AddCity(); 
   AddFavoriteCities();
}

  //Add Favorite Cities in localStorage+
  function AddFavoriteCities(){
    let resultNowCity = document.querySelector(".tabcontent-now-city").textContent;
    
    favoriteCities.add(resultNowCity);

    localStorage.setItem("favoriteCities", JSON.stringify([...favoriteCities]));
    }


// check city in localStorage+  
function checkToExistCity(city){
  return localStorage.getItem(city);
}

//check city in favorite cities list
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
//add city to favorite cities list & btn active
function AddCity(){
  let nowCity = document.querySelector(".tabcontent-now-city").textContent;
  if (!checkToExistCity(nowCity)){
     btn_favorite.classList.add("active");
     
  }
  if (!checkToExistCityInTheList(nowCity)){
    renderFavoriteCities(nowCity);
  }
}
//render favorite cities list
function renderFavoriteCities(nowCity){
  let cityFavorite = document.createElement('li'); 
  cityFavorite.classList.add("row__right-citys");
  cityFavoriteAdd.prepend(cityFavorite);
  cityFavorite.innerHTML = `
        <button class="row__right-city">${nowCity}</button>
        <button class="row__right-close" data-close="close"></button>
        `;
  document.querySelector(".row__right-close").addEventListener("click", DeleteCityFromAddedLocations);
  document.querySelector(".row__right-city").addEventListener("click", getCityNameFromFavorite);
}
