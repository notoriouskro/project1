
var weatherObj = {

    callHomeWeather: function () {
        var lat = appObj.lastParkLat;
        var long = appObj.lastParkLong;
        var today = moment.format('02/09/2019','MM/DD/YYYY');
        console.log('today',today);
        weatherObj.getWeather(lat, long, today, today,'home');
    },
    getWeather: function (lat,long,start,end,target) {

        event.preventDefault();

        console.log("Clicked!");
        var APIKey = "8a90078f604cf4b9108fb023de777c1a";
        var city = $('#park-search-val').val();
        console.log(city);

        var queryURL = 'https://api.aerisapi.com/forecasts/' + lat + ', ' + long + '?&client_id=8I6t90Z8W84ZVlcgjzpqs&client_secret=8KAQf3xSfGPQSCzL7jXJ4AdUe3JMLajykSLvjuq6&from=' + start + '&to=' + end + '&filter=day';

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

            // $('#weather-info').html("Time zone: " + response.response[0].profile.tz);

            // var length = days;
            for (i = 0; i < response.response.length; i++) {

                var div = $('<div>');
                div.attr('id', 'weatherDiv');
                var img = $('<img>');
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
                if(target === 'home') {
                    $('#home-weather-info').append(div);
                } else {
                    $('#modal-weather-info').append(div);
                }
            }
        });
    }
};
