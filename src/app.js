const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express()
const forecast = require('./forecast');
const geocode = require('./geocode');


const partialspath = path.join(__dirname, '../templates/partials');
app.use(express.static(path.join(__dirname, '../public')));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(partialspath);

app.get('', (req,res)=>{
    res.render('index', {
        title:'Weather App',
        name: 'Anchit'
    });
})


app.get('/help', (req, res)=>{
    res.render('help', {
        message: 'Thanks for asking for help',
        title: 'Help',
        name: 'Anchit'
    });
})
app.get('/about', (req, res)=>{
    res.render('about', {
        name: 'Anchit Agarwal',
        title: 'About Us'
    });
})
app.get('/weather', (req, res)=>{
    if(!req.query.address)
    {
        return res.send({
            error: 'Please provide an address'
        });
    }
    geocode(req.query.address, (error, data={})=>{
        if(error) {
            return res.send({
                error
            });
        }
        forecast(data.latitude, data.longitude, (error, forecastdata)=>{
            if(error) {
                return res.send({error});
            }
            res.send({
                forecast: forecastdata,
                location: data.location
            })
        })
    })
})


app.get('/help/*', (req, res)=>{
    res.send('Help article not foud!!!');
})

app.get('*', (req, res)=>{
    res.render('404', {
        name: 'Anchit',
        title: 'ERROR 404 NOT FOUND'
    })
})

app.listen(3000, function(){
    console.log("Server is up!");
});
