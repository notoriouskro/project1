

// Initialize Firebase
var config = {
    apiKey: 'AIzaSyAUbsJcyadBDoOGF24ajS7SC3Q7KweP_AY',
    authDomain: 'bootcamp-project1-504c8.firebaseapp.com',
    databaseURL: 'https://bootcamp-project1-504c8.firebaseio.com',
    projectId: 'bootcamp-project1-504c8',
    storageBucket: '',
    messagingSenderId: '452720723166'
};
firebase.initializeApp(config);

//connect to database
var database = firebase.database();

// itineraryObj.assignAdd();

var itineraryObj = {

    assignAdd: function (parkIdx) {
        var parkName = parkNames[parkIdx];  //[Math.floor(Math.random() * parkNames.length)];
        console.log('parkIdx', parkIdx, 'parkName', parkName);
        $('#park-title').text(parkName);
        $('#itinerary-add-btn').attr('park-name', parkName);
    },
    doRefresh: function (snapshot) {

        var row = $('<div>');
        var key = snapshot.key;
        console.log('key', key);
        row.attr({ class: 'row itinerary-row', id: key });

        var itineraryName = $('<div>');
        itineraryName.attr({ class: 'col-md-6' });
        itineraryName.text(snapshot.val().itineraryName);
        row.append(itineraryName);

        var itineraryStart = $('<div>');
        itineraryStart.attr({ class: 'col-md-2' });
        itineraryStart.text(snapshot.val().itineraryStart);
        row.append(itineraryStart);

        var itineraryEnd = $('<div>');
        itineraryEnd.attr({ class: 'col-md-2 text-center' });
        itineraryEnd.text(snapshot.val().itineraryEnd);
        row.append(itineraryEnd);

        var itineraryDuration = $('<div>');
        itineraryDuration.attr({ class: 'col-md-1 text-center' });
        itineraryDuration.text(snapshot.val().itineraryDuration);
        row.append(itineraryDuration);

        var remove = $('<div>');
        remove.attr({ class: 'col-md-1 text-center itinerary-remove', removekey: key });
        remove.text('X');
        row.append(remove);

        //append to row
        $('#itinerary-data').append(row);
        //set buttons
        $('.itinerary-remove').on('click', itineraryObj.remove);
        $('.itinerary-row').on('click', itineraryObj.select);
    },
    remove: function () {
        var key = $(this).attr('removekey');
        $('#' + key).remove();
        database.ref().child(key).remove();
    },
    select: function () {
        var key = $(this).attr('id');
        console.log(key);
        // $('#itinerary-add-btn').attr({ datakey: key }); //set the submit key
        var row = database.ref().child(key);
        row.once('value').then(function (snapshot) {
            //open modal form

            //get weather
        // weatherObj.getWeather(parkLat,parkLong,startDate,endDate);
            //hold for modal form
            // $('#itinerary-name').val(snapshot.val().itineraryName);
            // $('#itinerary-start').val(snapshot.val().itineraryStart);
            // $('#itinerary-end').val(snapshot.val().itineraryEnd);
            // $('#itinerary-duration').val(snapshot.val().itineraryDuration);

        });
    }
};

$('#park-search-btn').on('click', function () {
    event.preventDefault();
    var parkName = $('#park-search-val').val();
    console.log('parkNamesearchval', parkName);
    var parkIdx = parkNames.indexOf(parkName);
    itineraryObj.assignAdd(parkIdx);
    $('#park-search-val').attr('placeholder', 'Enter National Park Name'); //reset search field to placeholder
});

if (false) { //hold for on click button that saves edit on modal form
    var postData = {
        parkCode: parkCode,
        parkName: parkName,
        parkLat: parkLat,
        parkLong: parkLong,
        itineraryStart: itineraryStart,
        itineraryEnd: itineraryEnd,
        itineraryDuration: itineraryDuration
    };
    var updates = {};
    updates[datakey] = postData;
    return firebase.database().ref().update(updates);
}

//open modal dialog

$('#itinerary-add-btn').on('click', function () {

    event.preventDefault();

    //add form data 
    var parkCode = appObj.lastParkCode;
    var parkName = appObj.lastParkName;
    var parkLat = appObj.lastParkLat;
    var parkLong = appObj.lastParkLong;
    var itineraryStart = '02/07/2019';//moment();
    var itineraryEnd = '02/08/2019'; //moment();
    var itineraryDuration = 1; //this will be calculated

    database.ref().push({
        parkCode: parkCode,
        parkName: parkName,
        parkLat: parkLat,
        parkLong: parkLong,
        itineraryStart: itineraryStart,
        itineraryEnd: itineraryEnd,
        itineraryDuration: itineraryDuration
    });

});

database.ref().on('child_added', function (snapshot) {
    itineraryObj.doRefresh(snapshot);
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});