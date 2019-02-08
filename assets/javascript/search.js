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
var latLong = '';



function parks() {
    var input = $('#park-search-val').val();
    searches.push(input);
    var parkCode = $('#park-search-val').val().substring(0,4);
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
            var weather = $('<p>' + response.data[0].weatherInfo + '</p>');
            var website = $('<p>' + response.data[0].url + '</p>');
            var $info = $('<div id="info">');
            $info.append(description, directions, directionsURL, weather, website);

            $('#search-results').append($name, $info);
            latLong = response.data[0].latLong;

            trails();
        });
    
};


function unsplash() {
    var input = $('#park-search-val').val();
    console.log('unsplash: ' + input);

    var queryURL = 'https://api.unsplash.com/search/photos?page=1&query=' + input + '&client_id=595205d0fab64dca9acc4912f7319d2869c29ff0834538b31167dbca9425a2f6&client_secret=00c14faa873902ff8dd494014545db17655595508ae0c67fe37a8774e4b7b45c';

    $.ajax({
        url: queryURL,
        method: "GET",
        }).then(function(response){
            console.log(response);
            for(var i = 0; i < 1; i++){
            $('#search-results').append('<img src="' + response.results[i].urls.regular + '">');
            }
        });

};

function trails() {
    var input = latLong.split(',');
    console.log(input);
    var lat = input[0].substring(4,16);
    console.log('latitude: ' + lat);
    var long = input[1].substring(6,18);
    console.log('longitude: ' + long);

    var queryURL = 'https://www.hikingproject.com/data/get-trails?lat='+ lat + '&lon=' + long + '&maxDistance=10&key=200415723-df92bbbf592b6baa4ec5ef44ab0ffed8';

    $.ajax({
        url: queryURL,
        method: "GET",
        crossOrigin: true,
        }).then(function(response){
            console.log(response);
            for(var i = 0; i < response.trails.length; i++){
                var $trails = $('<div id="trails">');

                var $img = $('<img src="' + response.trails[i].imgSqSmall + '">');
                $trails.append($img);

                var $div = $('<div>');
                var name = $('<p>' + response.trails[i].name + '</p>');
                var description = $('<p>' + response.trails[i].summary + '</p>');
                var difficulty = $('<p>' + response.trails[i].difficulty + '</p>');
                var length = $('<p>' + response.trails[i].length + '</p>');
                var ascent = $('<p>' + response.trails[i].ascent + '</p>');
                var altitude = $('<p>' + response.trails[i].high + '</p>');
                var url = $('<a href="' + response.trails[i].url + '">View Trail Map</a>');
                $div.append(name, description, difficulty, length, ascent, altitude, url);
                $trails.append($div);

                $('#search-results').append($trails);
            }
            
        });
        
};


$('#park-search-btn').on('click', function(){
    event.preventDefault();
    parks();
    unsplash();
});

