const cookies = {
 addCurrentCityInCookie : function (nameCity) {
        let dateNow = new Date(Date.now());
        dateNow.setDate(dateNow.getDate() + 1);
        let dateExpiresCookies = dateNow.toUTCString();
        document.cookie = "currentCity=" + nameCity + "; expires=" + dateExpiresCookies;
  }
}
  export const cookie = cookies.addCurrentCityInCookie;