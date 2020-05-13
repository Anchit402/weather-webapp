const request  = require('postman-request');

const geocode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYW5jaGl0YWdhcndhbCIsImEiOiJjazluOTI5NXcwNHFkM2dwY3lzYnBnaXhoIn0.LyMxtcAV03F9eqQCMc4PyQ&unit=1';
    request({url: url, json: true}, function(error, response){
        if(error)
            callback('Unable to connect ', undefined);
        else if(response.body.features.length === 0)
            callback('Unable to find location ', undefined);
        else
            callback(undefined,{
                location: response.body.features[0].place_name,
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0]
            });
    })
}

module.exports = geocode;