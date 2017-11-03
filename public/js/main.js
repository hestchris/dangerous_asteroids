
$(document).ready(function(){

$('#search').on('submit', function(event){
	
	event.preventDefault()
	
	var userDate = $('#dateInput').val()

	// console.log(userDate)
	// console.log('--------------')

	$.get(`/search?start_date=${userDate}`, function(body, status) {

		body = JSON.parse(body)

		var hazardousAsteroids = []
		
		for(var asteroid of body.near_earth_objects[userDate]) {

			// console.log(asteroid)
			
			var name = asteroid.name
			
			var diameter = Math.floor(Number(asteroid.estimated_diameter.feet.estimated_diameter_max)).toLocaleString()
		
			var velocity = Math.floor(Number(asteroid.close_approach_data[0].relative_velocity.miles_per_hour)).toLocaleString()

			var distanceFromEarth = Math.floor(Number(asteroid.close_approach_data[0].miss_distance.miles)).toLocaleString()

			var link = asteroid.nasa_jpl_url

			if(asteroid.is_potentially_hazardous_asteroid) {

				hazardousAsteroids.push(asteroid)
				// console.log(hazardousAsteroids)
			
				$('#entry').append(
					`
					<div id='listDiv'>
					<h3 id='listName'><a href="${link}" target="_blank">${name}<a></h3>
					 <h4 id='listDiameter'>${'Estimated Diameter: ' + diameter + 'feet'}</h4>
					 <h4 id='listVelocity'>${'Velocity: ' + velocity + 'mph'}</h4>
					 <h4 id='listDistance'>${'Distance from Earth: ' + distanceFromEarth + ' miles'}
					 </div>
					 `

					)
				// console.log('name: ' + asteroid.name)
				// console.log('diameter: ' + asteroid.estimated_diameter.feet.estimated_diameter_max)
				// console.log(asteroid.close_approach_data[0].relative_velocity.miles_per_hour)
				// console.log('======================')
			
			}

				

		}
				$('#entryInfo').append(
					`<h2>${'Date: ' + userDate}</h2>
					<h2>${'Number of Dangerous Asteroids: ' + hazardousAsteroids.length}<?h3>`
					)
				// console.log('number of dangerous asteroids: ' + hazardousAsteroids.length)


	})



})

})