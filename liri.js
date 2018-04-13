var dotEnv = require("dotenv").config();
var keys = require("./keys.js");
//var spotify = new spotify(keys.spotify);
//var client = new twitter(keys.twitter);


// omdb 
var userInput = process.argv; // all our inputs
var inputSelection = process.argv[2]; 
var request = require("request");

if (inputSelection === "movie-this") {
    
        var movieName = ""; 
        var slice = "";
//        slice = "Mr.Nobody";
//        console.log(slice);


        for (var i = 3; i < userInput.length; i++) {

            movieName = movieName + "+" + userInput[i];

        }

        slice = movieName.slice(1);
        console.log(slice);
    

    var movieLink = "http://www.omdbapi.com/?t=" + slice + "&plot=full&apikey=trilogy";
    request(movieLink, function (error, response, body) {
        if (!error && response.statusCode === 200) {

            console.log(JSON.parse(body));

        }
    });
}