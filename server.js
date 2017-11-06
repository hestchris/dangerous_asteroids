var express = require('express')

var app = express()

const request = require('request')

var key = 'A8c7SEJlofzqwm2mcWv6G8qlaothFddXpYyzAtgM'


app.use(express.static('./public'))


app.get('/', function(req, res) {

	res.sendFile('./public/html/index.html', {root:'./'})

	console.log('sent index.html')

})

app.get('/search', function(req, res) {
	

		var nasaAPI = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${req.query.start_date}&end_date=${req.query.start_date}&api_key=${key}`
		request (nasaAPI, function(err, response, dataFromServer) {
			
			res.send(dataFromServer)
			
			console.log('single-date api')
		})
	})

app.get('/range_search', function(req, res) {

		var nasaAPI = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${req.query.start_date}&end_date=${req.query.end_date}&api_key=${key}`
		request (nasaAPI, function(err, response, dataFromServer) {
			
			res.send(dataFromServer)
			
			console.log('range-date api')
	})
})

app.get('/sentry', function(req, res) {

	var sentryAPI = `https://ssd-api.jpl.nasa.gov/sentry.api?spk=${req.query.spk}`
	request (sentryAPI, function(err, response, dataFromServer) {

		res.send(dataFromServer)

		console.log('sentry api')
	})


})


app.listen(8081, function() {

	console.log("'NASA_part2' on port 8081")

})


