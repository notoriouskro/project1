var parks = ['Alcatraz Island', 'Cabrillo', 'Castle Mountains', 'César E. Chávez', '>Channel Islands', 'Death Valley', 'Devils Postpile', 'Eugene ONeill', 'Fort Point', 'Golden Gate', 'John Muir', 'Joshua Tree', 'Juan Bautista de Anza', 'Lassen Volcanic', 'Lava Beds', 'Manzanar', 'Mojave', 'Muir Woods', 'Old Spanish', 'Pinnacles', 'Point Reyes', 'Pony Express', 'Port Chicago Naval Magazine', 'Presidio of San Francisco', 'Redwood', 'Rosie the Riveter WWII Home Front', 'San Francisco Maritime', 'Santa Monica Mountains', 'Sequoia & Kings Canyon', 'Tule Lake Unit', 'Whiskeytown', 'World War II Valor in the Pacific', 'Yosemite'];

var lat = ['38.88101431', '47.17777274', '29.31262089'];
var long = ['77.03632572', '103.4300083', '-98.4289522'];
var days = '4'
var from = 'monday';


$('#park-search-btn').on('click', function () {

    event.preventDefault();
  
    console.log("Clicked!");
    var APIKey = "8a90078f604cf4b9108fb023de777c1a";
    var city = $('#park-search-val').val();
    
  
    console.log(city);
    // https://api.aerisapi.com/forecasts/minneapolis,mn?&format=json&filter=day&limit=7&client_id=CLIENT_ID&client_secret=CLIENT_SECRET
    var queryURL = 'https://api.aerisapi.com/forecasts/'+ lat[2] + ', ' + long[2] +'?&client_id=8I6t90Z8W84ZVlcgjzpqs&client_secret=8KAQf3xSfGPQSCzL7jXJ4AdUe3JMLajykSLvjuq6&from='+from+'&to=+'+days+'days&filter=daynight';
    
  
    // We then created an AJAX call
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
  
      // Create CODE HERE to Log the queryURL
      console.log(queryURL);
      // Create CODE HERE to log the resulting object
      console.log(response);
      // Create CODE HERE to transfer content to HTML
        
      $('#weather-info').html("Time zone: " + response.response[0].profile.tz);
      
      var length = days;
      for (i = 0;i < length; i++)
      $('#weather-info').append('<br>' + days + ' day forcast: ' + response.response[0].periods[i].avgTempF);
      // $('#humidity').html("Humidity: " + response.main.humidity);
      // $('#temp').html("Temperature: " + response.main.temp);
  
      // // Create CODE HERE to calculate the temperature (converted from Kelvin)
      // // Hint: To convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32
      // var temp = (response.main.temp - 273.15) * 1.80 + 32;
      // temp = temp.toFixed(2);
  
      // // Create CODE HERE to dump the temperature content into HTML
      // $('.temp').html("Temperature: " + temp + " degrees");
  
    });
  
  });