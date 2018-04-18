var dotEnv = require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var request = require("request");
var fs = require("fs");





//spotify
var spotify = new Spotify(keys.spotify);

// twitter
var client = new Twitter(keys.twitter);


// omdb 
var userInput = process.argv; // all our inputs
var inputSelection = process.argv[2];


var movieInput = ""; // holds movie input
var movieName = "";  // will hold default movie name
var songName = ""; // will also hold default song name

if (inputSelection === "movie-this") { // imdb

    if (!movieInput) { // checking is the movie input is blank
        movieName = "Mr.Nobody";
    } else {
        movieName = getUserInput(userInput);
    }

    var movieLink = "http://www.omdbapi.com/?t=" + movieName + "&plot=shaort&apikey=trilogy";
    request(movieLink, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var jsonBody = JSON.parse(body);
            console.log("\nTitle: " + jsonBody.Title + "\nYear: " + jsonBody.Year + "\nIMDB Rating: " + jsonBody.imdbRating
                + "\nRotten Tomatoes Rating: " + jsonBody.Ratings.Value + "\nCountry Movie was Produced: " + jsonBody.Country +
                "\nLanguage: " + jsonBody.Language + "\nPlot: " + jsonBody.Plot + "\nActors: " + jsonBody.Actors);

        }
    });

} else if (inputSelection === "my-tweets") { // tweeter

    var params = { screen_name: "nodejs" };
    client.get("statuses/user_timeline", params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log("Tweets: " + tweets[i].text + " Time Created: " + tweets[i].created_at);
            }
        }
    });


} else if (inputSelection === "spotify-this-song") { // spotify

    songName = getUserInput(userInput);

    if (!songName) {
        songName = "The Sign";
        spotifyThis(songName);
    } else {
        spotifyThis(songName);
    }


} else if (inputSelection === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function (err, result) {
        if (err)
            console.log(err)

        spotifyThis(result);

    });

} else {

    console.log(inputSelection + ": is not one of the commands. Please enter an appropriate command. You can choose from the following: "
        + "\nmovie-this \nmy-tweets \nspotify-this-song \ndo-what-it-says ");
}

// concatenate string with "+"
function getUserInput(userInput) {

    var searchName = '';
    for (var i = 3; i < userInput.length; i++) {

        searchName = searchName + "+" + userInput[i];

    }
    return searchName.slice(1);
};

// spotify function
function spotifyThis(songInput) {
    spotify.search({ type: "track", query: songInput }, function (error, data) {
        if (error) {
            return console.log("Error occured: " + error);
        }
        var spotifyInfo = data.tracks.items;


        for (var i = 0; i < spotifyInfo.length; i++) { // trying to match the name with the song.
            if (spotifyInfo[i].name === songInput) {
                spotify.request("https://api.spotify.com/v1/tracks/" + spotifyInfo[i].id)
                    .then(function (data) {
                        console.log("\nArtist: " + data.album.artists[0].name + "\nSong Name: " + data.album.name + "\nPreview of link: " + data.preview_url + "\nAlbum: " + data.name);
                    })
                    .catch(function (err) {
                        console.log("Error: " + err);
                    });
            } else {

                console.log("\nArtist: " + spotifyInfo[0].artists[0].name + "\nSong Title: " + spotifyInfo[0].name
                    + "\nAlbum Name: " + spotifyInfo[0].album.name + "\nURL Preview: " + spotifyInfo[0].preview_url);
                break;

            }
        }

    });

}