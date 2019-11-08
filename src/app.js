const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;


// Define paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../template/views');
const partialsPath = path.join(__dirname, '../template/partials');

// Setup handlebers engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Ali'
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About me',
		name: 'Ali'
	})
})

app.get('/help', (req, res) =>{
	res.render('help', {
		title: 'Help page',
		name: 'Ali'
	})
})

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Ali',
		errorMessage: 'Help article not found'
	})
})

// Weather Page
app.get('/weather', (req, res) => {
	if(!req.query.address){
		return res.send({
			errors: "You must provide an address!"
		})
	}
	
	geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
		if(error){
			return res.send({error})
		}
		
		forecast(latitude, longitude, (error, forecastData) => {
			if(error){
				return res.send({error})
			}
			
			res.send({
				forecast: forecastData,
				location,
				address: req.query.address
			})
		})
	})
	
	/* res.send({
		location: 'Boston',
		forecast: 'It is Cloudy',
		address: req.query.address
	}); */
})

app.get('/products', (req, res) => {
	if(!req.query.search){
		return res.send({
			errors: "you must provide a search term!"
		})
	}
	
	console.log(req.query.search);
	res.send({
		products: []
	})
})

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Ali',
		errorMessage: 'Page Not Found'
	})
})



app.listen(port, () => {
	console.log('Server is up on port ' + port);
});


















