var dotEnv = require("dotenv").config();
var keys = require("./keys.js");
//var spotify = new spotify(keys.spotify);
//var client = new twitter(keys.twitter);


// omdb 
var userInput = process.argv;
var movieName = "";
var request = require("request");

for (var i =2; i<userInput.length;i++){

    movieName = movieName+"+"+userInput[i];

    


}

var slice = movieName.slice(1);
console.log(slice);

var movieLink = "http://www.omdbapi.com/?t=" + slice + "&plot=full&apikey=trilogy";
request(movieLink, function (error, response, body) {
    if (!error && response.statusCode === 200) {

        console.log(JSON.parse(body));

    }
});
