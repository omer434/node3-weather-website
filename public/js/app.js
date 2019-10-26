console.log('Client side javsacript is up and running');

const weatherForm = document.querySelector('form');
const search = document.querySelector('#txtSearch');

const pErrMessage = document.querySelector('#pErrMessage');
const pMessage = document.querySelector('#pMessage');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value;

    pMessage.innerHTML = 'Loading';
    pErrMessage.innerHTML = '';

    fetch('http://localhost:3000/weather?address=' + location).then(response => {
    response.json().then(data => {
        if(data.error) {
            pMessage.innerHTML = '';
            pErrMessage.innerHTML = data.error;
            console.log(data.error);
        } else {
            pMessage.innerHTML = '';
            pMessage.innerHTML += 'The temperature is ' + data.forecast.temperature + '.<br />';
            pMessage.innerHTML += data.forecast.summary;
            console.log(data.location);
            console.log(data.forecast);
        }
    })
});

})