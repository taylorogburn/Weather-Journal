/* Global Variables */
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid='
let apiKey = 'c3313bfb040cae1f8d6af91e97254fcd'; //Riley's Key: c3313bfb040cae1f8d6af91e97254fcd
let countryCode = 'US';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const button = document.querySelector('#generate');
const zip = document.querySelector('#zip');
const textBox = document.querySelector('#feelings');

const date = document.querySelector('#date');
const temp = document.querySelector('#temp');
const contentArea = document.querySelector('#content');
const container = document.querySelector('#entryHolder');

button.addEventListener('click', performAction);

function performAction (e){
    const feelingsContent = textBox.value;
    const zipCode = zip.value

    if (zipCode === ''){
        alert('Please enter a zip code');
    }
    getWeather(baseURL,zipCode, countryCode, apiKey)
    .then(function (data){
        postData('/addweather', {date: newDate, temp: data.main.temp, weather: data.weather, content: feelingsContent, city: data.name});
        console.log(data);
    }).then(function () {
        updateUI();
    })
};

container.innerHTML = '';

const getWeather = async (baseURL, zip, countryCode, apiKey) => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},${countryCode}&appid=${apiKey}`)
    try {
        const data = await res.json();
        console.log(data)
        return data;
    } 
    catch(error) {
        console.log("error", error);
    }
};

//post request
const postData = async ( url = '', data = {}) =>{
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    
    try {
        const newData = await response.json();
    }catch(error){
        console.log("error at post data", error)
    }
};

//update UI with getData

const updateUI = async () => {
    const request = await fetch('/getData');
    try{
        const allData = await request.json();
        //convert temp to F
        let temperature = (allData.temperature - 273.15) * 9/5 + 32;
        document.getElementById('date').innerHTML = Data.date;
    }catch(error){
        console.log("error at updateUI", error);
    }
};
