var express = require('express')

var app = express()

const request = require('request')


app.use(express.static('./public'))


app.get('/', function(req, res){

	res.sendFile('./public/html/index.html', {root:'./'})

	console.log('sent index.html')

})

app.get('/search', function(req, res){
	

		var nasaAPI = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${req.query.start_date}&end_date=${req.query.start_date}&api_key=A8c7SEJlofzqwm2mcWv6G8qlaothFddXpYyzAtgM
`
		request (nasaAPI, function(err, response, dataFromServer) {
			
			res.send(dataFromServer)
			
			console.log('started single-date api')
		})
	})

app.get('/range_search', function(req, res){

		var nasaAPI = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${req.query.start_date}&end_date=${req.query.end_date}&api_key=A8c7SEJlofzqwm2mcWv6G8qlaothFddXpYyzAtgM
`
		request (nasaAPI, function(err, response, dataFromServer){
			
			res.send(dataFromServer)
			
			console.log('started range api')
	})
})


app.listen(8080, function(){

	console.log("running on port 8080")
})


