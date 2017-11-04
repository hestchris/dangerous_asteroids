
$(document).ready(function(){

	$('#rangeSearch').hide()

	$('#dayRadio').on('click', function(event){

		$('#search').show()
		$('#rangeSearch').hide()

		$('#entryInfo').empty()
		$('#entry').empty()
		$('#message').empty()

		$('#dateInput')[0].value = ''
	})

	$('#weekRadio').on('click', function(event){

		$('#rangeSearch').show()
		$('#search').hide()

		$('#entryInfo').empty()
		$('#entry').empty()
		$('#message').empty()

		$('#startDate')[0].value = ''
		$('#endDate')[0].value = ''
	})

	$()

	$('#search').on('submit', function(event){
		
		event.preventDefault()

		$('#entryInfo').empty()
		$('#entry').empty()
		$('#message').empty()
		
		var userDate = $('#dateInput').val()
		
		var splitDate = userDate.split('-')
		splitDate.push(splitDate.shift())
		var formattedDate = splitDate.join('/')



		if (userDate === '') {

			$('#message').append(`<h2>Please enter a valid date.</h2>`)
		}

		else {

		$.get(`/search?start_date=${userDate}`, function(body, status) {
			
			body = JSON.parse(body)

			var hazardousAsteroids = []
			
			for(var asteroid of body.near_earth_objects[userDate]) {

				console.log(asteroid)
				
				var name = asteroid.name
				
				var diameter = Math.floor(Number(asteroid.estimated_diameter.feet.estimated_diameter_max)).toLocaleString()
			
				var velocity = Math.floor(Number(asteroid.close_approach_data[0].relative_velocity.miles_per_hour)).toLocaleString()

				var distanceFromEarth = Math.floor(Number(asteroid.close_approach_data[0].miss_distance.miles)).toLocaleString()

				var link = asteroid.nasa_jpl_url

				if(asteroid.is_potentially_hazardous_asteroid) {

					hazardousAsteroids.push(asteroid)
				
				
					$('#entry').append (
						`
						<div id='listDiv'>
						<h3 id='listName'><a href="${link}" target="_blank">${name}<a></h3>
						 <p id='listDiameter'>${'Estimated Diameter: ' + diameter + ' ft'}</p>
						 <p id='listVelocity'>${'Velocity: ' + velocity + ' mph'}</p>
						 <p id='listDistance'>${'Distance from Earth: ' + distanceFromEarth + ' miles'}</p>
						 </div>
						 `
						)

					}		

				}
						$('#entryInfo').append (
							`<h2>${'Date: ' + formattedDate}</h2>
							<h2>${'Number of Dangerous Asteroids: ' + hazardousAsteroids.length}</h3>`
							
							)
			})
		}			
})

	$('#rangeSearch').on('submit', function(event){

		event.preventDefault()

		$('#entry').empty()
		$('#entryInfo').empty()
		$('#message').empty()


		var startDate = $('#startDate').val()
		
		var endDate = $('#endDate').val()

		
		if ( startDate === '' && endDate === '') {

			$('#message').append(`<h2>Please enter a valid START and END date.</h2>`)
		}

		else if ( startDate === '') {

			$('#message').append(`<h2>Please enter a valid START date.</h2>`)
		}

		else if (endDate === '') {

			$('#message').append(`<h2>Please enter a valid END date.</h2>`)
		}

		else {

		$.get(`/range_search?start_date=${startDate}&end_date=${endDate}`, function(body, status) {

			body = JSON.parse(body)

			var hazardousAsteroids = []

			// console.log(body)

			for(var day in body.near_earth_objects) {

				// console.log(day)

				for(var asteroid = 0; asteroid < body.near_earth_objects[day].length; asteroid++) {

					if(body.near_earth_objects[day][asteroid].is_potentially_hazardous_asteroid === true) {

						var date = body.near_earth_objects[day][asteroid].close_approach_data[0].close_approach_date

						var splitDate = date.split('-')
						splitDate.push(splitDate.shift())
						var formattedDate = splitDate.join('/')

						var dayAsteroid = body.near_earth_objects[day][asteroid]

						var name = dayAsteroid.name
				
						var diameter = Math.floor(Number(dayAsteroid.estimated_diameter.feet.estimated_diameter_max)).toLocaleString()
			
						var velocity = Math.floor(Number(dayAsteroid.close_approach_data[0].relative_velocity.miles_per_hour)).toLocaleString()

						var distanceFromEarth = Math.floor(Number(dayAsteroid.close_approach_data[0].miss_distance.miles)).toLocaleString()

						var link = dayAsteroid.nasa_jpl_url

						hazardousAsteroids.push(dayAsteroid)

						$('#entry').append(
						`
						<div id='listDiv'>
						<h3 id='listName'><a href="${link}" target="_blank">${name}<a></h3>
						<p id="listDate">${'Date: ' + formattedDate}</p>
						 <p id='listDiameter'>${'Estimated Diameter: ' + diameter + ' ft'}</p>
						 <p id='listVelocity'>${'Velocity: ' + velocity + ' mph'}</p>
						 <p id='listDistance'>${'Distance from Earth: ' + distanceFromEarth + ' miles'}</p>
						 </div>
						 `
						)	
					}
				}
			}
						$('#entryInfo').append(
							`
							<h2>${'Number of Dangerous Asteroids: ' + hazardousAsteroids.length}</h3>
							`
							)

		})

	}


	})

})