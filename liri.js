var dotEnv = require("dotenv").config();
var keys = require("./keys.js");

//spotify
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

// twitter
var Twitter = require("twitter");
var client = new Twitter(keys.twitter);


// omdb 
var userInput = process.argv; // all our inputs
var inputSelection = process.argv[2];
var request = require("request");


function getUserInput(userInput) {

    var searchName = '';
    for (var i = 3; i < userInput.length; i++) {

        searchName = searchName + "+" + userInput[i];

    }
    return searchName.slice(1);
};


if (inputSelection === "movie-this") { // imdb

    // var movieName = "";
    // var slice = "";
    //        slice = "Mr.Nobody";
    //        console.log(slice);
    // if (userInput = "") {
    //     slice= "Mr.Nobody"; // find a way to get mr Nobody in.
    // }



    var movieLink = "http://www.omdbapi.com/?t=" + getUserInput(userInput) + "&plot=shaort&apikey=trilogy";
    request(movieLink, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var jsonBody = JSON.parse(body);
            console.log("n/Title: " + jsonBody.Title + "n/Year: " + jsonBody.Year + "n/IMDB Rating: " + jsonBody.imdbRating
                + "n/Rotten Tomatoes Rating: " + jsonBody.Ratings.Value + "n/Country Movie was Produced: " + jsonBody.Country +
                "n/Language: " + jsonBody.Language + "n/Plot: " + jsonBody.Plot + "n/Actors: " + jsonBody.Actors);

        }
    });

} else if (inputSelection === "my-tweets") { // tweeter

    var params ={screen_name: "nodejs"};
    client.get("statuses/user_timeline",params, function(error, tweets,response){
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log("Tweets: " + tweets[i].text + " Time Created: " + tweets[i].created_at);
            }
        }
    });


} else if (inputSelection === "spotify-this-song") { // spotify

    spotify.search({ type: "track", query: getUserInput(userInput) }, function (error, data) {
        if (error) {
            return console.log("Error occured: " + error);
        }
        var spotifyInfo = data.tracks.items;
        console.log("\nArtist: " + spotifyInfo[0].artists[0].name + "\nSong Title: " + spotifyInfo[0].name
            + "\nAlbum Name: " + spotifyInfo[0].album.name + "\nURL Preview: " + spotifyInfo[0].preview_url);

    });

}