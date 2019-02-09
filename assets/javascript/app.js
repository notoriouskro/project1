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

var appObj = {
    userId: '1',
    lastParkCode: 'yose',
    lastParkName: 'Yosemite',
    lastParkLat: '29.30662089',
    lastParkLong: '-98.4289522',
    currUserName: '',
    currUserUid: '',
};
