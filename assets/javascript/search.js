 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyAUbsJcyadBDoOGF24ajS7SC3Q7KweP_AY",
    authDomain: "bootcamp-project1-504c8.firebaseapp.com",
    databaseURL: "https://bootcamp-project1-504c8.firebaseio.com",
    projectId: "bootcamp-project1-504c8",
    storageBucket: "",
    messagingSenderId: "452720723166"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// searches to local storage
var searches = [];



function parks() {
    var input = $('#input').val();
    searches.push(input);
    var parkCode = $('#input').val().substring(0,4);
    console.log(parkCode);

    var queryURL = 'https://developer.nps.gov/api/v1/parks?parkCode=' + parkCode + '&api_key=7saAAebFIxUpWP1IHtyJN3nKfo94xMzf009LSiHb';

    $.ajax({
        url: queryURL,
        method: "GET",
        }).then(function(response){
            console.log(response);
        
            var name = response.data[0].name;
            var $name = $('<h1>');
            $name.text(name);

            var description = $('<p>' + response.data[0].description + '</p>');
            var directions = $('<p>' + response.data[0].directionsInfo + '</p>');
            var directionsURL = $('<p>' + response.data[0].directionsUrl + '</p>');
            var location = $('<p>' + response.data[0].latLong + '</p>');
            var weather = $('<p>' + response.data[0].weatherInfo + '</p>');
            var website = $('<p>' + response.data[0].url + '</p>');
            var $info = $('<div id="info">');
            $info.append(description, directions, directionsURL, location, weather, website);
            
            $('#search-results').append($name, $info);
        });
    
};

$('#search').on('click', function(){
    event.preventDefault();
    parks();
});

// function unsplash() {
//     var input = $('#input').val().split('');
//     console.log(input);

//     var queryURL = 'https://api.unsplash.com/search/photos?page=1&query=' + input[0] + '&client_id=595205d0fab64dca9acc4912f7319d2869c29ff0834538b31167dbca9425a2f6&client_secret=00c14faa873902ff8dd494014545db17655595508ae0c67fe37a8774e4b7b45c';

//     $.ajax({
//         url: queryURL,
//         method: "GET",
//         }).then(function(response){
//             console.log(response);
//             for(var i = 0; i < response.results.length; i++){
//             $('#images').append('<img src="' + response.results[i].urls.regular + '">');
//             }
//         });

// };

// function trails() {
//     var queryURL = 'https://www.hikingproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&key=200415723-df92bbbf592b6baa4ec5ef44ab0ffed8'

//     $.ajax({
//         url: queryURL,
//         method: "GET",
//         }).then(function(response){
//             console.log(response);
//         });
        
// };



