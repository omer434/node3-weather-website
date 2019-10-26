const weatherForm = document.querySelector('form');
const search = document.querySelector('#txtSearch');

const pErrMessage = document.querySelector('#pErrMessage');
const pMessage = document.querySelector('#pMessage');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value;

    pMessage.innerHTML = 'Loading';
    pErrMessage.innerHTML = '';

    fetch('/weather?address=' + location).then(response => {
    response.json().then(data => {
        if(data.error) {
            pMessage.innerHTML = '';
            pErrMessage.innerHTML = data.error;
            console.log(data.error);
        } else {
            pMessage.innerHTML = '';
            pMessage.innerHTML += 'The temperature is ' + data.forecast.temperature + '.<br />';
            pMessage.innerHTML += 'Highest temperature is ' + data.forecast.temperatureHigh + '.<br />';
            pMessage.innerHTML += 'Lowest temperature is ' + data.forecast.temperatureLow + '.<br />';
            pMessage.innerHTML += data.forecast.summary;
            console.log(data.location);
            console.log(data.forecast);
        }
    })
});

})