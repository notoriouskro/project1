

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

var parks = ['Alcatraz Island', 'Cabrillo', 'Castle Mountains', 'César E. Chávez', '>Channel Islands', 'Death Valley', 'Devils Postpile', 'Eugene ONeill', 'Fort Point', 'Golden Gate', 'John Muir', 'Joshua Tree', 'Juan Bautista de Anza', 'Lassen Volcanic', 'Lava Beds', 'Manzanar', 'Mojave', 'Muir Woods', 'Old Spanish', 'Pinnacles', 'Point Reyes', 'Pony Express', 'Port Chicago Naval Magazine', 'Presidio of San Francisco', 'Redwood', 'Rosie the Riveter WWII Home Front', 'San Francisco Maritime', 'Santa Monica Mountains', 'Sequoia & Kings Canyon', 'Tule Lake Unit', 'Whiskeytown', 'World War II Valor in the Pacific', 'Yosemite'];

// itineraryObj.assignAdd();

var itineraryObj = {

    assignAdd: function (parkIdx) {
        var parkName = parks[parkIdx];  //[Math.floor(Math.random() * parks.length)];
        $('#itinerary-park-title').text(parkName);
        $('#itinerary-add-btn').attr('itinerary-park-name',parkName);
    },
    doRefresh: function () {

        var row = $('<div>');
        var key = snapshot.key;
        console.log('key', key);
        row.attr({ class: 'row itinerary-row', id: key });

        var itineraryName = $('<div>');
        itineraryName.attr({ class: 'col-lg-6' });
        itineraryName.text(snapshot.val().itineraryName);
        row.append(itineraryName);

        var itineraryStart = $('<div>');
        itineraryStart.attr({ class: 'col-lg-2' });
        itineraryStart.text(snapshot.val().itineraryStart);
        row.append(itineraryStart);

        var itineraryEnd = $('<div>');
        itineraryEnd.attr({ class: 'col-lg-2 text-center' });
        itineraryEnd.text(snapshot.val().itineraryEnd);
        row.append(itineraryEnd);

        var itineraryDuration = $('<div>');
        itineraryDuration.attr({ class: 'col-lg-1 text-center' });
        itineraryDuration.text(snapshot.val().itineraryDuration);
        row.append(colfreq);

        var remove = $('<div>');
        remove.attr({ class: 'col-lg-1 text-center itinerary-remove', removekey: key });
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
    var parkIdx = parks.indexOf(parkName);
    itineraryObj.assignAdd(parkIdx);
    $('#park-search-val').val('Enter National Park Name'); //reset search field to placeholder
});

$('#itinerary-add-btn').on('click', function () {

    event.preventDefault();

    //add form data 
    var itineraryName = $('#itinerary-add-btn').attr('itinerary-name');
    var itineraryStart = moment();
    var itineraryEnd = moment();
    var itineraryDuration = 1;

    var datakey = $('#itinerary-add-btn').attr('datakey');

    //add if it's new;  datakey = blank
    if (datakey === '') {
        database.ref().push({
            itineraryName: itineraryName,
            itineraryStart: itineraryStart,
            itineraryEnd: itineraryEnd,
            frequency: frequency,
            itineraryDuration: itineraryDuration
        });
    } else { //update if existing row; datakey = key
        var postData = {
            itineraryName: itineraryName,
            itineraryStart: itineraryStart,
            itineraryEnd: itineraryEnd,
            frequency: frequency,
            itineraryDuration: itineraryDuration
        };
        var updates = {};
        updates[datakey] = postData;
        return firebase.database().ref().update(updates);
    }

    //clear form values
    $('#train-name').val('');
    $('#train-dest').val('');
    $('#train-first').val('');
    $('#train-freq').val('');
    $('#train-last').val('');
    $('#add-train').val(''); //clear the add key

    
    $('#itinerary-add-btn').attr('itinerary-park-name','');

});

database.ref().on('child_added', function (snapshot) {
    itineraryObj.doRefresh(snapshot);
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});