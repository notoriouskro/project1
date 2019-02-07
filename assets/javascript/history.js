 // This is our API key. Add your own API key between the ""
 var APIKey = "8a90078f604cf4b9108fb023de777c1a";

 // Here we are building the URL we need to query the database
 var queryURL = "http://history.openweathermap.org/data/2.5/history/city?q=London,UK";

 // We then created an AJAX call
 $.ajax({
   url: queryURL,
   method: "GET"
 }).then(function(response) {

   // Create CODE HERE to Log the queryURL
   console.log(queryURL);
   // Create CODE HERE to log the resulting object
   console.log(response);
   // Create CODE HERE to transfer content to HTML
//    $('.city').html("City: " + response.name)
//    $('.wind').html("Wind Speed: " + response.wind.speed)
//    $('.humidity').html("Humidity: " + response.main.humidity)
//    $('.temp').html("Temperature: " + response.main.temp)
   // Create CODE HERE to calculate the temperature (converted from Kelvin)
   // Hint: To convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32
   var temp = (response.main.temp - 273.15) * 1.80 + 32
   temp = temp.toFixed(2);
   



   // Create CODE HERE to dump the temperature content into HTML
//    $('.temp').html("Temperature: " + temp + " degrees")

 });