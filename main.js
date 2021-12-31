/**function getUrl(url){
  const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
  const cityName = document.querySelector(".city").value;
  const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
  const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;
}**/
let btn_deletes = document.querySelectorAll(".row__right-close");
const UI_FORM_SEARCH = document.querySelectorAll(".search__city");
let resultNowCity = document.querySelector(".tabcontent-now-city").textContent;


window.onload = function (){
  let cityName = localStorage.getItem("CurrentCity");
  if (!!cityName){
    fetchWeather (cityName);
  } 
  fetchWeather ("Dnipro");
}


for (let btn_delete of btn_deletes) {
  btn_delete.addEventListener("click", DeleteCity)
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
}


function getCityNameFromFavorite(){
  let cityName = document.querySelector(".city").value;
  cityName = this.textContent;
  fetchWeather (cityName);
}


function fetchWeather (cityName){
  const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
  const serverIcoUrl = 'https://openweathermap.org/img/wn/';
  //const cityName = document.querySelector(".city").value;
  const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
  const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;
  
  

  fetch(url)
  .then((response) => response.json())
  .then (data => {
    
    let resultNowCity = document.querySelector(".tabcontent-now-city, .tabcontent-details-city"); 
    resultNowCity.innerHTML = `${data.name}`




    let resultNowTemp = document.querySelector(".tabcontent-now-temp>span"); 
    let numberTemp = +`${data.main.temp}`;
    resultNowTemp.innerHTML = Math.round(numberTemp-273);
    
    let resultNowIco = document.querySelector(".tabcontent-now-ico"); 
    let icoNumber = `${data.weather[0].icon}`;
    let ico = document.createElement('img');
    /**ico.src = 'https://openweathermap.org/img/wn/04n@2x.png';**/
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
    AddCurrentCityInLocalStorage(data.name)
    //
//вот тут КОНЕЦ
    })
    .catch(error => alert(error.message));
     //.finally(() => {UI_FORM_SEARCH.reset()});
  }

  function AddCurrentCityInLocalStorage(nameCity){
    localStorage.setItem("CurrentCity", nameCity);
  }

  

  function DeleteCity(){
    this.parentElement.remove();
    let delCity = this.parentElement.querySelector(".row__right-city").innerText;
    
    let parsedFavoriteCities = JSON.parse(localStorage.getItem("favoriteCities"));
    console.log (parsedFavoriteCities)
    localStorage.removeItem(delCity);
 }


  btn_favorite.addEventListener("click", HandleFavoriteClick)
  //btn_favorite.addEventListener("click", Store)
  //btn_favorite.addEventListener("click", ChangeBtn)


  /**function ChangeBtn (){
    
    btn_favorite.classList.add("active");
  }**/


  //localStorage

  



/**
  const city = new Map([
    ['Nur-Sultan', true],
    ['Amur', true],
    ['Samara', true],
    ['Bali', true],
    ['Dane', true],
    ['Kilo', true],
  ]);

 
function AddCityArr(){
  let resultNowCity = document.querySelector(".tabcontent-now-city").textContent; 
  city.set(resultNowCity, true);
  alert(city.size);
}
**/

function HandleFavoriteClick(){
  AddCity(); 
  //Store();  
  AddFavoriteCities();
}


////////////////////////////////////////////////////////////////////////////////////////ТУТ ПРОДОЛЖАТЬ!!!
/**function Store(){ 

    let favoriteCitiesUi = this.parentElement.querySelector(".row__right-city").innerText;
    let cities = [];
    localStorage.setItem(array, JSON.stringify(array));
    array = JSON.parse(localStorage.getItem("array"));
  
    console.log(typeof array); // объект
    console.log(array); // [1, 2, 3]


    /// считать массив JSON.parse(localStorage.getItem("data");
  }**/


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
  //let resultNowCity = document.querySelector(".tabcontent-now-city").textContent;
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
    document.querySelector(".row__right-close").addEventListener("click", DeleteCity);
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