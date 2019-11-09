const request = require('request');

const forecast = (latitude, longitude, callback) => {
	const url = "https://api.darksky.net/forecast/94218ba97170d82b5554547569152bd9/"+ latitude +","+ longitude;
	
	request({url, json: true}, (error, { body }) => {
		if(error){
			callback('Unable to connect to location service.', undefined);
		}else if(body.error){
			callback('Unable to find location',undefined);
		}else{
			
			callback(undefined,
				// const temp = response.body.currently,
				body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degree out, This high today is "+ body.daily.data[0].temperatureHigh + " with a low of "+ body.daily.data[0].temperatureLow + " . There is a "+ body.currently.precipProbability +"% chance of rain."
			);
		}
	})
}

module.exports = forecast;