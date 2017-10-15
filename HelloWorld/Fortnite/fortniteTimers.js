data = getData();
console.log("data is: " + data);

function onLaunch() {
	console.log("pageLaunched() started.")
	// Pull up existing cookie or create if necessary
	var oldData = document.cookie;
	if (oldData == null) {
		console.log(document.cookie);
		cookieName = "name=fortniteCookies";
		var d = new Date();
		d.setFullYear(2100);
		cookieExpiry = "expires=" + d.toUTCString();
		// cookieExpiry has to be fixed to like... one year, not one day!
		combinedCookie = cookieName + ';' + cookieExpiry + ";path=/";
		document.cookie = combinedCookie;
		console.log(combinedCookie)
		console.log("oldData = null!");
	}
	// Cookie exists, pull timers
	else {
		console.log('oldData: ' + oldData);
		console.log('document.cookie: ' + document.cookie);		
		var timers = getData();
		var currentDate = new Date().toUTCString();

		// probably only want this line
		//checkTimers();
		// Only need these for later.
		/*
		if (currentDate > timer1) {
			console.log('Timer1 has expired!');
		}
		else if (currentDate == timer1) {
			console.log('Timer1 is expiring right now!');
		}
		else {
			console.log('Timer1 expires on: ' + timer1);
		}
		*/
	}
	// document.cookie = "username=John Smith; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
}

// When button is pressed, update the cookie for the latest timer, only if the timer has expired?
function resetTimer() {
	timersArray = ['timer1', 'timer2', 'timer3', 'timer4', 'timer5', 'timer6'];
	var shiftedTimers = []
	for (i = 0; i < timersArray.length; i++) {
		timeData = getData(timersArray[i]);
		if (timeData !== "not found") {
			shiftedTimers.push(timeData);
		}
	}

	// print just to see output
	console.log(shiftedTimers);
	console.log("shiftedTimers length: " + shiftedTimers.length);
	if (shiftedTimers.length < 6) {
		shiftedTimers.push(getExpiryDate());
	}

	else {
		console.log("Error: You have already done 6 missions that are still on cooldown.");
		console.log("First one to expire will do so on: " + shiftedTimers[0]);
	}
	writeCookie(shiftedTimers);
/*
	console.log("Setting timer1 in cookie");
	var timer1 = getData("timer1", oldData);
	document.cookie = 'timer1=' + timer1;
	console.log('new cookie: ' + document.cookie);
	console.log("UTC Time: " + timer1.toUTCString());
	document.cookie = 'timer1=' + timer1.toUTCString();
	console.log(document.cookie);
*/
}

// Based on: https://www.w3schools.com/js/js_cookies.asp
function getExpiryDate() {
	var d = new Date();
    console.log("Current date: " + d.getDate());
	d.setDate(d.getDate() + 1);
	console.log("New date: " + d.getDate());
    return d.toUTCString();
}


// a parsing function that will return the timer data.
function getData() {
	console.log("getData called.");
	//cookieData = document.cookie;
	// Dummy data to refine parsing
	cookieData = "name=fortniteTimers; path=/; timers=[Fri, 08 Oct 1999 19:24:55 GMT-Fri, 08 Oct 1999 19:24:55 GMT-Fri, 08 Oct 1999 19:24:55 GMT];";
	// Remember to use - instead of , in array as delimiter
	// Test whether the requested field exists in the cookie
	if (cookieData.indexOf("timers") == -1) {
		console.log("Error: Timer data not found.");
		return "";
	}

	else {
		// Split string on semicolons
		splitCookie = cookieData.split(';');
		console.log("SplitCookie length: " + splitCookie.length);
		// look for requested data
		for (i = 0; i < splitCookie.length; i++) {
			if (splitCookie[i].indexOf("timers") != -1) {
				console.log(splitCookie[i]);
				// find location of = sign
				location = splitCookie[i].indexOf('=');

				// remove the field name and = sign
				requestedData = splitCookie[i].substr(location);
				// remove leading space if it exists
				if (requestedData[0] === ' ') {
					requestedData = requestedData.slice(1);
				}
				//return requestedData;
				console.log(requestedData);
				return requestedData;
			}
		}
	}
}

// check timers, shift values as needed.
function checkTimers() {
	console.log("checkTimers called")
	timersArray = ['timer1', 'timer2', 'timer3', 'timer4', 'timer5', 'timer6'];
	var currentDate = new Date();
	var shiftedTimers = [];

	for(i = 0; i < timersArray.length; i++) {
		timerData = getData(timersArray[i]);
		if (timerData === "not found") {
			// Reached an empty timer.  Could probably end process here.
			continue;
		}
		else if (currentDate > timerData) {
			console.log("timer " + i + " has expired.");
		}
		else {
			shiftedTimers.push(timerData);
		}
	}
	console.log("Timerdata from checkTimers: " + timerData);
	//writeCookieAllTimers(timerData);
}

// This is meant for, writing all the timer data, not just an individual line
function writeCookieAllTimers(timerData) {
	if (timerData.length > 6) {
		console.log("Error, there are " + timerData.length + " values in timerData.");
	}
	else {
		console.log("WriteCookieAllTimers called with timerdata: " + timerData)
		// set cookie and timers
		data = document.cookie;
		for(i = 0; i < timerData.length; i++) {
			append = "timer" + i+1 + "=" + timerData[i] + ";";
			console.log("Append value is: " + append);
			writeCookie(append);
		}
		console.log("Cookie written: " + document.cookie);
	}
}

// This writes individual lines
function writeCookie(timer) {
	console.log("WriteCookie called with timer: " + timer)
	// get old cookie data, append, then write to cookie again?
	// figure out which timer field to use
	// set cookie and timers
	document.cookie = timer;
	console.log("Cookie written: " + document.cookie);
}

// Unfinished function
function populateTable() {
	var printData = document.getElementById("displayData");
}

// Manually delete a cookie
function deleteCookie() {
	console.log("Deleting old cookie with data: " + document.cookie)
	d = new Date();
	d.setFullYear(1999);
	document.cookie = "expires=" + d.toUTCString();
	console.log(document.cookie);
}