
$(document).ready(function() {

			$('#rangeSearch').hide()

		$('#dayRadio').on('click', function(event) {

			$('#search').show()
			$('#rangeSearch').hide()

			$('#entryInfo').empty()
			$('#entry').empty()
			$('#message').empty()

			$('#dateInput')[0].value = ''
		})

		$('#weekRadio').on('click', function(event) {

			$('#rangeSearch').show()
			$('#search').hide()

			$('#entryInfo').empty()
			$('#entry').empty()
			$('#message').empty()

			$('#startDate')[0].value = ''
			$('#endDate')[0].value = ''
		})

// Single-Date

		$('#search').on('submit', function(event) {
			
			event.preventDefault()

			$('#entryInfo').empty()
			$('#entry').empty()
			$('#message').empty()
			
			var userDate = $('#dateInput').val()
			
			var splitDate = userDate.split('-')
			splitDate.push(splitDate.shift())
			var formattedDate = splitDate.join('/')

// Error Handling for single day form

			if (userDate === '') {

				$('#message').append(`<h2>Please enter a valid date.</h2>`)
			}

			else {

			$.get(`/search?start_date=${userDate}`, function(body, status) {

				body = JSON.parse(body)

				var hazardousAsteroids = []
				
				for(var asteroid of body.near_earth_objects[userDate]) {
					
					var name = asteroid.name
					
					var diameter = Math.floor(Number(asteroid.estimated_diameter.feet.estimated_diameter_max)).toLocaleString()
				
					var velocity = Math.floor(Number(asteroid.close_approach_data[0].relative_velocity.miles_per_hour)).toLocaleString()

					var distanceFromEarth = Math.floor(Number(asteroid.close_approach_data[0].miss_distance.miles)).toLocaleString()

					var link = asteroid.nasa_jpl_url

					if(asteroid.is_potentially_hazardous_asteroid) {

						hazardousAsteroids.push(asteroid)
					
// Print results to html page

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

// Print to html
							$('#entryInfo').append (
								`<h2 class="dateInfo">${'Date: ' + formattedDate}</h2>
								<h2>${'Number of Dangerous Asteroids: ' + hazardousAsteroids.length}</h2>`
								
								)
				})
			}			
	})

// Range-Date 

		$('#rangeSearch').on('submit', function(event) {

			event.preventDefault()

			$('#entry').empty()
			$('#entryInfo').empty()
			$('#message').empty()


			var startDate = $('#startDate').val()
			
			var endDate = $('#endDate').val()

			var splitDate = startDate.split('-')
			splitDate.push(splitDate.shift())
			var formatStartDate = splitDate.join('/')

			var splitDate = endDate.split('-')
			splitDate.push(splitDate.shift())
			var formatEndDate = splitDate.join('/')

// Error Handling for range form
			
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
				
				for(var day in body.near_earth_objects) {

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

// Print results to the html page 

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

// Error Handling for incorrect api request
// Print results info to html

							if (body.code === 400) {

							$('#message').append(`<h2>Search is limited to 7 continuous days.</h2>`)
							
							}
							
							else {
							
							$('#entryInfo').append(
								`
								<h2 class="dateInfo">${'Date Range: ' + formatStartDate + ' - ' + formatEndDate}</h2>
								<h2>${'Number of Dangerous Asteroids: ' + hazardousAsteroids.length}</h2>
								`
								)
							}

			})

		}


	})

})