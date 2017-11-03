
$(document).ready(function(){

$('#search').on('submit', function(event){
	
	event.preventDefault()
	
	var userDate = $('#dateInput').val()

	console.log(userDate)

	$.get(`/search?start_date=${userDate}`, function(body, status) {
		// console.log(status)
		body = JSON.parse(body)
		// console.log(body.element_count)

		var hazardousAsteroids = []
		
		for(var asteroid of body.near_earth_objects[userDate]) {

			// console.log(asteroid)
		
			if(asteroid.is_potentially_hazardous_asteroid) {

				hazardousAsteroids.push(asteroid)
				// console.log(hazardousAsteroids)
				console.log(asteroid.name)
				// console.log(asteroid.close_approach_data[0].relative_velocity.miles_per_hour)
				console.log('======================')
			
			}

				// for(var x of hazardousAsteroids) {

				// 	$('#infoDisplay').text(hazardousAsteroids.length.toString())

				// }

		}

				console.log('number of dangerous asteroids: ' + hazardousAsteroids.length)


	})



})

})