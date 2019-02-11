
function dropdown1() {
    for (var i = 0; i < parkNames.length; i++) {
        var $p = $('<p class="list">');
        $p.text(parkNames[i]);
        $('#myDropdown1').append($p);
    }
}

function dropdown() {
    for (var i = 0; i < parkNames.length; i++) {
        var $p = $('<p class="list">');
        $p.text(parkNames[i]);
        $('#myDropdown').append($p);
    }
}

function myFunction1() {
    $('#myDropdown1').toggle('show');
    dropdown1();
}

function myFunction() {
    $('#myDropdown').toggle('show');
    dropdown();
}

// function filterFunction() {
//     var input = $('#myInput').val();
//     var filter = input.toUpperCase();
//     for (var i = 0; i < $('#myDropdown').length; i++) {
//         var txtValue = $('p.list').text();
//         if (txtValue.toUpperCase().indexOf(filter) > -1) {
//         $('<p>').css({'display': ''});
//         } else {
//         $('<p>').css({'display':'none'});
//         }
//     }
// };

// $('#myInput').on('keyup', filterFunction);

function unsplash(element) {
    var input = element.text();
    console.log('unsplash: ' + input);

    var queryURL = 'https://api.unsplash.com/search/photos?orientation=landscape&page=1&query=' + input + '&client_id=595205d0fab64dca9acc4912f7319d2869c29ff0834538b31167dbca9425a2f6&client_secret=00c14faa873902ff8dd494014545db17655595508ae0c67fe37a8774e4b7b45c';

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response);
        for(var i = 0; i < 1; i++){
            // var $div = $('<div>');
            // $div.attr({id:'main-img-container'});
            var $img = $('<img>');
            $img.attr({class: 'main-img'});
            $img.attr({src: response.results[i].urls.regular});
            $('#main-img-container').append($img);
        }
    });
};

function parks(element) {
    var parkName = element.text();
    console.log(parkName);

    var position = parkNames.indexOf(parkName);
    var parkCode = parkCodes[position];
    console.log(parkCode);

    var queryURL = 'https://developer.nps.gov/api/v1/parks?parkCode=' + parkCode + '&api_key=7saAAebFIxUpWP1IHtyJN3nKfo94xMzf009LSiHb';

    $.ajax({
        url: queryURL,
        method: "GET",

      }).then(function(response){
            console.log(response);
        
            var name = $('<h1>');
            name.attr({id:'h1-park'});
            name.text(response.data[0].name);

            var description = $('<p>');
            description.text(response.data[0].description);

            var directions = $('<a>');
            directions.attr({href: response.data[0].directionsInfo});
            directions.text('Park Directions');

            var weather = $('<p>');
            weather.text(response.data[0].weatherInfo);

            var website = $('<a>');
            website.attr({href: response.data[0].url});
            website.text('Park Website');

            $info.append(description, directions, directionsURL, weather, website);

            $('#search-results').append(name, $info);
            
            var latLong = response.data[0].latLong;
            var input = latLong.split(',');
            console.log(input);
            var lat = input[0].substring(4,16);
            console.log('latitude: ' + lat);
            var long = input[1].substring(6,18);
            console.log('longitude: ' + long);

            trails();

            appObj.lastParkCode = parkCode;
            appObj.lastParkName = parkName;
            appObj.lastParkLat = lat;
            appObj.lastParkLong = long;

            $('#itinerary-add-btn').prop('disabled', false);
            
            console.log('about to call weather');
            weatherObj.callHomeWeather();

        });
};

function trails() {
    var lat = appObj.lastParkLat;
    var long = appObj.lastParkLong;
    var queryURL = 'https://www.hikingproject.com/data/get-trails?lat=' + lat + '&lon=' + long + '&maxDistance=10&key=200415723-df92bbbf592b6baa4ec5ef44ab0ffed8';

    $.ajax({
        url: queryURL,
        method: "GET",
        crossOrigin: true,
    }).then(function (response) {
        console.log(response);
        for (var i = 0; i < response.trails.length; i++) {

            var $allTrails = $('<div>');
            $allTrails.attr({id: 'all-trails'});

            var $trail = $('<div>');
            $trail.attr({id: 'trail'});

            var $img = $('<img>');
            $img.attr({src: response.trails[i].imgSqSmall, id: 'trail-img'});

            var $summary = $('<div>');
            $summary.attr({id: 'summary'});

            var $details = $('<div>');
            $details.attr({id: 'details'});

            var $name = $('<h3>');
            $name.text(response.trails[i].name);

            var $description = $('<p>');
            $description.text(response.trails[i].summary);

            var $difficulty = $('<p>');
            $difficulty.text(response.trails[i].difficulty);

            var $length = $('<p>');
            $length.text(response.trails[i].length);

            var $ascent = $('<p>');
            $ascent.text(response.trails[i].ascent);

            var $altitude = $('<p>');
            $altitude.text(response.trails[i].high)''

            var $url = $('<a>');
            $url.attr({href: response.trails[i].url});
            $url.text('Trail Map');

            $summary.append($name, $description);

            $details.append($difficulty, $length, $ascent, $altitude, $url);

            $trail.append($summary, $details, $img);

            $allTrails.append($trail);
        }
        $('#search-results').append($allTrails);
    });
};

$('#park-search-btn').on('click', function () {
    myFunction1();

}); $('#myDropdown1').on('click', 'p.list', function () {
    $('#search-results').empty();
    $('#myDropdown1').toggle('hide');
    $('#navbarDropdown').css({ 'display': 'block' });
    $('#initial').css({ 'display': 'none' });
    console.log('dropdown-click', this);
    unsplash($(this));
    parks($(this));
});

$('#navbarDropdown').on('click', function () {
    myFunction();
});

$('#myDropdown').on('click', 'p.list', function () {
    $('#search-results').empty();
    $('#myDropdown').toggle('hide');
    unsplash($(this));
    parks($(this));

});
