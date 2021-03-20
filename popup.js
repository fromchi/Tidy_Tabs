/*Popup.js */
/* Front-end functions to pass variables for backgound js and hide and show div */

var startMsg = "Please update settings as links will default to 'Other bookmarks' folder. <br> </br> Max tabs will default to '7'.";
document.getElementById("getdirections").addEventListener("click", ShowDirections);

function ShowDirections() {
  document.getElementById("reminder").innerHTML = startMsg;
  myVar = setTimeout(function(){ document.getElementById("reminder").innerHTML = ""; }, 5000);
}



document.getElementById("settingsBtn").addEventListener("click", displaySettings);

function displaySettings() {  
  var x = document.getElementById("demo");
  if (x.style.display === "none") {
    x.style.display = "block";
  }
  else {
    x.style.display = "none";
  }
}

var paramIndex = document.getElementById("getdata").addEventListener("click", displayinput);


function displayinput() {
  var fname = document.getElementById('fName').value;
  var tabname =  document.getElementById('tabName').value;
  chrome.runtime.sendMessage({x: fname, y: tabname}, function(request) {
    console.log(fname);
    console.log(tabname);
  });     
}




    
 