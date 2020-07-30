/*@function loginCheck
 *@param {undefined}
 *@returns {undefined}
 *@description It validates the login form. 
	- If email field is empty or password field is less than 6 characters long, then error messages will be displayed red color in in the weather section, today's message section, today's date section and time now section. 
	- Also the text boxes for email and password appear in red color initially and also if login fails. If login is successful, the messages in the respective places will be changed in terms of contents and in terms of color. 
	- The weather information for 5 days will be  loaded only after the login is successful.
	- After login is successful, it calls the functions loadDateAndTime and loadWeather.
 */
function loginCheck(){
	let loginMessage=document.getElementById("loginMessage");
	let emailField=document.getElementById("email");
	let passwordField=document.getElementById("password");
	let messageTodayPlaceHolder=document.getElementById("messageToday");
	loginMessage.style.color="red";
	document.getElementById("dateToday").innerHTML="Login First!";
	document.getElementById("dateToday").style.color="red";
	document.getElementById("timeNow").innerHTML="Login First!";
	document.getElementById("timeNow").style.color="red";
	if(emailField.value==="" && passwordField.value.length<6){
		loginMessage.innerHTML="Email is empty.<br/>Password must be at least 6 characters' long.";
		messageTodayPlaceHolder.style.color="red";
		messageTodayPlaceHolder.innerHTML="Login First!"
		emailField.style.backgroundColor="red";
		passwordField.style.backgroundColor="red";
		let weatherPTag=document.getElementById("weatherPTag");
		weatherPTag.innerHTML="Login first to see weather information!";
		weatherPTag.style.color="red";
		let weatherList=document.getElementById("weather-list");
		weatherList.innerHTML="";
	}
	else if(emailField.value===""){
		loginMessage.innerHTML="Email field is empty.";
		messageTodayPlaceHolder.style.color="red";
		messageTodayPlaceHolder.innerHTML="Login First!";
		emailField.style.backgroundColor="red";
		passwordField.style.backgroundColor="lightgreen";
		let weatherPTag=document.getElementById("weatherPTag");
		weatherPTag.innerHTML="Login first to see weather information!";
		weatherPTag.style.color="red";
		let weatherList=document.getElementById("weather-list");
		weatherList.innerHTML="";
	}
	else if(passwordField.value.length<6){
		loginMessage.innerHTML="Password must be at least 6 characters' long.";
		messageTodayPlaceHolder.style.color="red";
		messageTodayPlaceHolder.innerHTML="Login First!";
		passwordField.style.backgroundColor="red";
		emailField.style.backgroundColor="lightgreen";
		let weatherPTag=document.getElementById("weatherPTag");
		weatherPTag.innerHTML="Login first to see weather information!";
		weatherPTag.style.color="red";
		let weatherList=document.getElementById("weather-list");
		weatherList.innerHTML="";
	}
	else{
		loginMessage.innerHTML="";
		emailField.style.backgroundColor="lightgreen";
		passwordField.style.backgroundColor="lightgreen";
		messageTodayPlaceHolder.style.color="green";
		messageTodayPlaceHolder.innerHTML="Login Success! Good Luck!";
		document.getElementById("weatherPTag").style.color="#660066";
		loadWeather();
		loadDateAndTime();
	}
}

/*@function loadDateAndTime
 *@param {undefined}
 *@returns {undefined}
 *@description It displays Today's Date and Time Now.
	- It is called only after the login is successfully validated
 */
function loadDateAndTime(){
	let dateTodayPlaceHolder=document.getElementById("dateToday");
	dateTodayPlaceHolder.style.color="green";
	let timeNowPlaceHolder=document.getElementById("timeNow");
	timeNowPlaceHolder.style.color="green";
	let today= new Date();
	const dayList=["Sun","Mon","Tues","Wed","Thurs","Fri","Sat"];
	const monthList=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
	let day=dayList[today.getDay()];
	let date=today.getDate()>=10?today.getDate():"0"+today.getDate();
	let month=monthList[today.getMonth()];
	let year=today.getFullYear();
	dateTodayPlaceHolder.innerHTML=day+" "+month+" "+date+" "+year;
	let hour=today.getHours();
	let ampm=hour>=12?"PM":"AM";
	hour=hour%12;
	hour=(hour===0)?0:hour;
	hour>=10?hour:"0"+hour;
	let minute=today.getMinutes()>=10?today.getMinutes():"0"+today.getMinutes();
	let second=today.getSeconds()>=10?today.getSeconds():"0"+today.getSeconds();
	timeNowPlaceHolder.innerHTML=hour+":"+minute+":"+second+" "+ampm;
}

/*@function loadDateAndTime
 *@param {undefined}
 *@returns {undefined}
 *@description Gets weather data from AcuWeather website.
	- It makes an Ajax call to the AcuWeather Forecast API to get weather information of Montreal for next five days including today.
	- It displays the date and time for the forecast days for five days including today.
	- It displays the maximum and minimum temperature for the forecast days for five days including today.
	- It displays the weather summary of day and night for the forecast days for five days including today.
 */
function loadWeather(){
	let weatherPTag=document.getElementById("weatherPTag");
	weatherPTag.innerHTML="Weather in Montreal for the next 5 days!";
	let weatherList=document.getElementById("weather-list");
	weatherList.innerHTML="";
	$.ajax(
		{
			url:"http://dataservice.accuweather.com/forecasts/v1/daily/5day/56186?apikey=xgqW17ZFLg72ec8Y9U0GGZ5MzyaBajZL&metric=true"
		})
		.done(successFunction)
		.fail(errorFunction);
	
	function successFunction(weatherResponse){
		let index;
		for(index=0;index<weatherResponse.DailyForecasts.length;index++)
		{
			let forecastDate=(weatherResponse.DailyForecasts[index].Date).split("T")[0];
			let forecastTime=((weatherResponse.DailyForecasts[index].Date).split("T")[1]).split("-")[0];
			weatherListItem=document.createElement("li");
			weatherListItem.innerHTML="<a href="+weatherResponse.DailyForecasts[index].Link+">Date: "+forecastDate+" Time: "+forecastTime+"</a><br/>Max: "+weatherResponse.DailyForecasts[index].Temperature.Maximum.Value+weatherResponse.DailyForecasts[index].Temperature.Maximum.Unit+" Min: "+weatherResponse.DailyForecasts[index].Temperature.Minimum.Value+weatherResponse.DailyForecasts[index].Temperature.Minimum.Unit+"<br/>Day:  "+weatherResponse.DailyForecasts[index].Day.IconPhrase+" Night: "+weatherResponse.DailyForecasts[index].Night.IconPhrase+"<br/>";
			weatherList.appendChild(weatherListItem);
		}
	}
	function errorFunction(error){
		weatherList.innerHTML="An error occurred. Can't load weather data.<br/>Error Code: "+error.status;
		weatherList.style.color="Red";
	}
}