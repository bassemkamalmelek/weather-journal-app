/* Global Variables */
const apiKey = "d92fce9f1e4dfde5a719f92ca3d68c6d";
const zipCodeInput = document.getElementById("zip");
const feelingsInput = document.getElementById("feelings");
const submitBtn = document.getElementById("generate");
const latestEntryDate = document.getElementById("date");
const latestEntryTemp = document.getElementById("temp");
const latestEntryContent = document.getElementById("content");
const unit = "metric";
const lang = "ar";
const myLocalServer = "http://127.0.0.1:5544/";

// Create a new date instance dynamically with JS


//Events
submitBtn.addEventListener('click',mainAction);

//Main Fuctions
//
function mainAction() {
  const zipCodeValue = zipCodeInput.value;
  const feelings = feelingsInput.value;
  const d = new Date();
  const newDate = (d.getMonth()+1 )+'.'+ d.getDate()+'.'+ d.getFullYear();
  var url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCodeValue}&appid=${apiKey}&units=${unit}&lang=${lang}`;

  if (!zipCodeValue) {
    alert('Please enter Zip Code');
  }else {
      // then , weatherData returned from getData automaticclly using then function
      // get the data then post it to the locat server then update the ui
      getDataFromAPI(url).then(function(weatherData) {
        // get the Data usin Destructuring or the normal method
        // but i prefer the Destructuring approache while i feel that i'm professional :D
        const {main: {temp}}  = weatherData;
        // const temp = weatherData['main'].temp;
        console.log("app: get from server " + temp + feelings);
        // call post function
        postData(`${myLocalServer}addNewRecord`, {
          date: newDate ,
          temp: temp,
          userFeeling: feelings,
        });
        console.log("app: post to local " + temp + feelings);
        // update ui
        updateUI();
    })
  }
}


// get the data from openweathermap.org api
const getDataFromAPI = async function (url) {
  // fetch the Data
  // get the data using openweathermap.org api and save it in variable
  const requestedData = await fetch (url);
  try {
    // get the data and convert to json
    const weatherData = await requestedData.json();
    // return the data to use it anywhere
    return weatherData;
  }catch (error) {
    alert(`error ${error}`);
  }
}


// post the data to the local Server
const postData = async function (url = "", data = {}){
  // post the data object
  const request = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const postNewData = await request.json();
    return postNewData;
  }catch (error) {
    alert(`error ${error}`);
  }
}

// call postData fuicntion
//postData('/weatherData', );


//fetch the data from the local server
const updateUI = async function() {
  // fetch
  const latestWeatherRecordRequest = await fetch(`${myLocalServer}retriveTheLastRecord`)
  try {
    // get the data and convert to json
    const latestWeatherRecordData = await latestWeatherRecordRequest.json();

    console.log("app: get from local " + latestWeatherRecordData['date'] + latestWeatherRecordData['temp'] +latestWeatherRecordData['userFeeling']);
    latestEntryTemp.textContent =`Current Tempreture is ${latestWeatherRecordData['temp']}` ;
    latestEntryDate.textContent =`Today is ${latestWeatherRecordData['date']}` ;
    latestEntryContent.textContent =`Your Feeling is ${latestWeatherRecordData['userFeeling']}`;
  }catch (error) {
    alert(`error ${error}`);
  }
}
