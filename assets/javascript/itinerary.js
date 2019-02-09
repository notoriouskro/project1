
var itineraryObj = {

    // assignAdd: function (parkIdx) {
    //     var parkName = parkNames[parkIdx];  //[Math.floor(Math.random() * parkNames.length)];
    //     console.log('parkIdx', parkIdx, 'parkName', parkName);
    //     $('#park-title').text(parkName);
    //     $('#itinerary-add-btn').attr('park-name', parkName);
    // },

    doRefresh: function (snapshot) {

        var row = $('<div>');
        var key = snapshot.key;
        console.log('key', key);
        row.attr({ class: 'row itinerary-data-row', id: key, 'data-toggle': 'modal', 'data-target': '#editItinModal', 'data-key': key });

        var buttdiv = $('<div>');
        buttdiv.attr({ class: 'col-md-1' });

        var button = $('<button>');
        button.attr({ type: 'button', class: 'btn btn-primary align-self-center', 'data-toggle': 'modal', 'data-target': '#editItinModal', 'data-key': key });
        button.text('Edit');
        buttdiv.append(button);
        row.append(buttdiv);

        var parkName = $('<div>');
        parkName.attr({ class: 'col-md-5' });
        parkName.text(snapshot.val().parkName);
        row.append(parkName);

        var itineraryStart = $('<div>');
        itineraryStart.attr({ class: 'col-md-2 text-center' });
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

        //set edit buttons
        $('.itinerary-remove').on('click', itineraryObj.remove);

        // $('.itinerary-data-row').on('click', itineraryObj.select);
    },
    remove: function () {
        var key = $(this).attr('removekey');
        $('#' + key).remove();
        database.ref().child(key).remove();
    },
    select: function (event) {

        var key = $(this).attr('id');
        console.log(key);
        // $('#itinerary-add-btn').attr({ datakey: key }); //set the submit key
        var row = database.ref().child(key);
        row.once('value').then(function (snapshot) {
            //open modal form

            //get weather
            // weatherObj.getWeather(parkLat,parkLong,startDate,endDate);
            //hold for modal form
            // $('#itinerary-name').val(snapshot.val().parkName);
            // $('#itinerary-start').val(snapshot.val().itineraryStart);
            // $('#itinerary-end').val(snapshot.val().itineraryEnd);
            // $('#itinerary-duration').val(snapshot.val().itineraryDuration);

        });
    }
};

// if (false) { //hold for on click button that saves edit on modal form
//     var postData = {
//         parkCode: parkCode,
//         parkName: parkName,
//         parkLat: parkLat,
//         parkLong: parkLong,
//         itineraryStart: itineraryStart,
//         itineraryEnd: itineraryEnd,
//         itineraryDuration: itineraryDuration
//     };
//     var updates = {};
//     updates[datakey] = postData;
//     return firebase.database().ref().update(updates);
// }

//open modal dialog

$('#itinerary-add-btn').on('click', function () {

    event.preventDefault();

    $('#itinerary-add-btn').prop('disabled', true);

    //add form data 
    var parkCode = appObj.lastParkCode;
    var parkName = appObj.lastParkName;
    var parkLat = appObj.lastParkLat;
    var parkLong = appObj.lastParkLong;
    var itineraryStart = '02/15/2019';//moment();
    var itineraryEnd = '02/19/2019'; //moment();
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

$('#editItinModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var key = button.data('key'); // Extract info from data-* attributes
    console.log(key);
    // $('#itinerary-add-btn').attr({ datakey: key }); //set the submit key
    var row = database.ref().child(key);
    row.once('value').then(function (snapshot) {
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this);

        var lat = snapshot.val().parkLat;
        var long = snapshot.val().parkLong;
        var start = snapshot.val().itineraryStart;
        var end = snapshot.val().itineraryEnd;
        console.log('start', start, 'end', end);

        $('#editItinModalLabel').text(snapshot.val().parkName);
        $('#datepicker').val(start);
        $('#end-date').val(end);
        $('#num-days').val(snapshot.val().itineraryDuration);

        //get weather
        weatherObj.getWeather(lat, long, start, end, 'modal');

        //open modal form

    });


});

$("#datepicker").datepicker();
$("#end-date").datepicker();
