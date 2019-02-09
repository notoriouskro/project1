

var parkLat = ['38.88101431', '47.17777274', '29.31262089'];
var parkLong = ['77.03632572', '103.4300083', '-98.4289522'];
var idx = 2;
// var days = '4';
var startDate = '02/12/2019';
var endDate = '02/12/2019';

var weatherObj = {
    getWeather: function () {

        event.preventDefault();

        console.log("Clicked!");
        var APIKey = "8a90078f604cf4b9108fb023de777c1a";
        var city = $('#park-search-val').val();


        console.log(city);
        // https://api.aerisapi.com/forecasts/minneapolis,mn?&format=json&filter=day&limit=7&client_id=CLIENT_ID&client_secret=CLIENT_SECRET
        var queryURL = 'https://api.aerisapi.com/forecasts/' + parkLat[idx] + ', ' + parkLong[idx] + '?&client_id=8I6t90Z8W84ZVlcgjzpqs&client_secret=8KAQf3xSfGPQSCzL7jXJ4AdUe3JMLajykSLvjuq6&from=' + startDate + '&to=' + endDate + '&filter=day';


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

            // var length = days;
            for (i = 0; i < response.response.length; i++) {

                var div = $('<div>');
                div.attr('id', 'weatherDiv');
                // div.attr('periodidx', i);
                // div.attr('id', 'period-'+i);
                var img = $('<img>');
                // var tDiv = $('<div>');
                // var hDiv = $('<div>');
                var weatherDate = response.response[0].periods[i].dateTimeISO;
                console.log(weatherDate);
                var momentDate = moment(weatherDate).format('MMMM Do YYYY');
                var temp = '<div> Temp: ' + response.response[0].periods[i].avgTempF;
                var humid = '<div> Humidity: ' + response.response[0].periods[i].humidity;
                var weatherIcon = 'assets/images/' + response.response[0].periods[i].icon;
                div.append(momentDate);
                div.append(temp);
                div.append(humid);
                img.attr('src', weatherIcon);
                div.append(img);
                $('#weather-info').append(div);
            }
        });
    }
}

$('#park-search-btn').on('click', function () {
    weatherObj.getWeather(parkLat[idx], parkLong[idx], startDate, endDate);
}) 