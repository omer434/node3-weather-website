const request = require('request');

const forecast = ({latitude, longitude}, callback) => {
    const url = 'https://api.darksky.net/forecast/0d881b22448806063bb41cc7ef9b4de6/' + encodeURIComponent(latitude+','+longitude) + '?units=si';

    request({url, json: true}, (error, {body})=>{
        if(error) {
            callback('Unable to connect to weather service', undefined);
        } else if(body.error) {
            callback('Error: ' + body.error, undefined);
        } else {
            const currently = body.currently;
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temperatureHigh: body.daily.data[0].temperatureHigh,
                temperatureLow: body.daily.data[0].temperatureLow,
                temperature: currently.temperature,
                precipProbability: currently.precipProbability
            });
        }
    });
}

module.exports = forecast;

