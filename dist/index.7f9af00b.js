function openWeather(evt, tabsSwitch) {
    // Declare all variables
    let i, tabcontent, tablinks;
    // Get all elements with class="row__left-tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for(i = 0; i < tabcontent.length; i++)tabcontent[i].style.display = "none";
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for(i = 0; i < tablinks.length; i++)tablinks[i].className = tablinks[i].className.replace(" active", "");
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabsSwitch).style.display = "flex";
    evt.currentTarget.className += " active";
}
// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

//# sourceMappingURL=index.7f9af00b.js.map
