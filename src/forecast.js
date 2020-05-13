const request  = require('postman-request');

const forecast = (latitude, longitude, callback)=> {
    const url = 'http://api.weatherstack.com/current?access_key=b14f3b4560befc881867064b969faa61&query='+latitude+','+longitude+'&unit=m';
    request({url: url, json: true}, (error, response)=>{
        if(error)
            callback('Unable to connect', undefined);
        else if(response.body.error)
            callback('Unable to find location', undefined);
        else   
            callback(undefined, "It is currently"+" "+response.body.current.temperature+" degrees"+" but it feels like "+response.body.current.feelslike+" degrees")
    })
}

module.exports = forecast;