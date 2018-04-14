var dotEnv = require("dotenv").config();
var keys = require("./keys.js");
//var spotify = new spotify(keys.spotify);

var Twitter = require("twitter");
var client = new Twitter(keys.twitter);


// omdb 
var userInput = process.argv; // all our inputs
var inputSelection = process.argv[2];
var request = require("request");

if (inputSelection === "movie-this") {

    var movieName = "";
    var slice = "";
    //        slice = "Mr.Nobody";
    //        console.log(slice);
    // if (userInput = "") {
    //     slice= "Mr.Nobody"; // find a way to get mr Nobody in.
    // }

    for (var i = 3; i < userInput.length; i++) {

        movieName = movieName + "+" + userInput[i];

    }

    slice = movieName.slice(1);

    var movieLink = "http://www.omdbapi.com/?t=" + slice + "&plot=shaort&apikey=trilogy";
    request(movieLink, function (error, response, body) {
        if (!error && response.statusCode === 200) {

            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings.Value);
            console.log("Country Movie was Produced: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    });

} else if (inputSelection === "my-tweets") {

    var params ={screen_name: "nodejs"};
    client.get("statuses/user_timeline",params, function(error, tweets,response){
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log("Tweets: " + tweets[i].text + " Time Created: " + tweets[i].created_at);
            }
        }
    });


} else if (inputSelection === "spotify-this-song") {

}