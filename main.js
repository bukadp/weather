/**function getUrl(url){
  const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
  const cityName = document.querySelector(".city").value;
  const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
  const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;
}**/
let btn_deletes = document.querySelectorAll(".row__right-close");
const UI_FORM_SEARCH = document.querySelectorAll(".search__city");
let resultNowCity = document.querySelector(".tabcontent-now-city").textContent;

// НЕКОРРЕКТНО РАБОТАЕТ
window.onload = function (){
  let cityName = localStorage.getItem("CurrentCity");
  if (!!cityName){
    fetchWeather (cityName);
    fetchForecast(cityName);
  } 
  fetchWeather ("Dnipro");
  fetchForecast("Dnipro");
}


for (let btn_delete of btn_deletes) {
  btn_delete.addEventListener("click", DeleteCityFromAddedLocations)
}


let btn_favorite = document.querySelector(".tabcontent-now-fvorite-btn"); 
const cityFavorites = document.querySelectorAll(".row__right-city");
let cityFavoriteAdd = document.querySelector(".row__right-locations");




for (let cityFavorite of cityFavorites) {
  cityFavorite.addEventListener("click", getCityNameFromFavorite)
}


function getCityName (){
  let cityName = document.querySelector(".city").value;
      fetchWeather (cityName);
      fetchForecast(cityName);
}


function getCityNameFromFavorite(){
  cityName = this.textContent;
  fetchWeather(cityName);
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



const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
const serverUrlForecast = 'http://api.openweathermap.org/data/2.5/forecast';
const serverIcoUrl = 'https://openweathermap.org/img/wn/';
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';


function fetchForecast(cityName){
  const urlForecast = `${serverUrlForecast}?q=${cityName}&appid=${apiKey}`;
  fetch(urlForecast)
  .then((response) => response.json())
  .then (data => {

    let resultForecastCity = document.querySelector(".tabcontent-forecast-city");
    resultForecastCity.innerHTML = `${data.city.name}`;

    let resultForecastDay = document.querySelector(".tabcontent-forecast-info-box-day"); 
    resultForecastDay.innerHTML = `${data.list[0].dt}`;

    let resultForecastTime = document.querySelector(".tabcontent-forecast-info-box-time"); 
    resultForecastTime.innerHTML = `${data.list[0].dt}`;

    let resultForecastTemp = document.querySelector(".tabcontent-forecast-info-box-temperature>span"); 
    let numberTemp = +`${data.list[0].main.temp}`;
    resultForecastTemp.innerHTML = Math.round(numberTemp-273);

    let resultForecastFeelsLikeTemp = document.querySelector(".tabcontent-forecast-info-box-feels>span"); 
    let numberFeelsLikeTemp = +`${data.list[0].main.feels_like}`;
    resultForecastFeelsLikeTemp.innerHTML = Math.round(numberFeelsLikeTemp-273);


    let resultForecastDescription = document.querySelector(".tabcontent-forecast-info-box-ico-name");
    let resultForecastDescriptionValue = `${data.list[0].weather[0].main}`;
    resultForecastDescription.innerHTML = `${resultForecastDescriptionValue[0].toUpperCase()}${resultForecastDescriptionValue.slice(1)}`;


    let resultNowIco = document.querySelector(".tabcontent-forecast-info-box-ico-icon"); 
    let icoNumber = `${data.list[0].weather[0].icon}`;
    let ico = document.createElement('img');
    ico.src = `${serverIcoUrl}${icoNumber}.png`;
        
    resultNowIco.append(ico);
    let resultNowIcoFirst = document.querySelector(".tabcontent-forecast-info-box-ico-icon>img"); 
    resultNowIcoFirst.remove();

  })
  
}

function renderForecast(){
  
  let today = document.getElementById("today");
  today.insertAdjacentHTML('afterend', `
  <button class="row__right-city">"Amur"</button>
  <button class="row__right-close" data-close="close"></button>
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

    //let city = document.querySelector(".city").value;
    //getFavoriteButtonColor (city);
  
//вот тут КОНЕЦ
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
  

  /**function ChangeBtn (){
    
    btn_favorite.classList.toggle("active");
  }**/


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
  //Store();  
  AddFavoriteCities();
 // ChangeBtn ();
}


////////////////////////////////////////////////////////////////////////////////////////ТУТ ПРОДОЛЖАТЬ!!!


  let favoriteCities = [];
  function AddFavoriteCities(){
    let resultNowCity = document.querySelector(".tabcontent-now-city").textContent;
    let result = CheckCityInLocalStorage(resultNowCity);
    if (result == false){   
    
     favoriteCities.push(resultNowCity);

    localStorage.setItem("favoriteCities", JSON.stringify(favoriteCities));
    
    }
  }
  


  

  /**
    let cities = [];
    function AddCityInArr (name) {
      this.cities.push({
        name,
      })
    };**/

    /**function DeleteCityFromArr (name) {
      this.cities.forEach((city, index) => {
        if (name === city.name) {
          this.cities.splice(index, 1)
        }
      })
    };

  
  let nameCity = document.querySelector(".tabcontent-now-city").textContent;

  localStorage.setItem("FavoriteCities", nameCity);**/
  

 
  //localStorage.clear()
  /**let keys = Object.keys(localStorage);//выводит всё что есть в localStorage
  for(let key of keys) {
    alert(`${key}: ${localStorage.getItem(key)}`);
  }**/
  

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


  

/** в задании

storage.saveFavoriteCities(favoriteCities)
const favoriteCities = storage.getFavoriteCities();
const currentCity = storage.getCurrentCity(); 
!!!!!!!!!!!!!!!!!! **/