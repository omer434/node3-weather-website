const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 3000;

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

//Paths for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and view location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ömer Öztürk'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ömer Öztürk'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is the help page',
        title: 'Help',
        name: 'Ömer Öztürk'
    });
});

app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
            error: 'No address provided'
        });
    }

    geocode(req.query.address, (errGeo, dataGeo = {})=>{
        if(errGeo) {
            return res.send({
                error: 'Error occured: errGeo'
            });;
        }

        forecast(dataGeo, (errForecast, dataForecast) => {
            if(errForecast) {
                return res.send({
                    error: 'Error occured: errForecast'
                });;
            }

            res.send({
                location: dataGeo.latitude + ',' + dataGeo.longitude,
                forecast: dataForecast,
                address: req.query.address
            });
        })
    });
});

app.get('/products', (req, res) => {
    
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term' 
        });
    }
    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        errmessage: 'Help article not found',
        title: '404',
        name: 'Ömer Öztürk'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        errmessage: 'Page not found',
        title: '404',
        name: 'Ömer Öztürk'
    });
});

app.listen(port, () => {
    console.log('Server is up on port 3000');
});