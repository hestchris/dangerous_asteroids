var express = require('express')

var app = express()

const request = require('request')

app.use(express.static('./public'))

app.get('/', function(req, res){

	res.sendFile('./public/html/index.html', {root:'./'})

})

app.get('/search', function(req, res){
	
		console.log(req.query)

		var nasaAPI = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${req.query.start_date}&end_date=${req.query.start_date}&api_key=A8c7SEJlofzqwm2mcWv6G8qlaothFddXpYyzAtgM
`
		request (nasaAPI, function(err, response, dataFromServer) {
			console.log('started api')
			console.log(dataFromServer)
			res.send(dataFromServer)
		})
	})


app.listen(8080, function(){

	console.log("running on port 8080")
})


