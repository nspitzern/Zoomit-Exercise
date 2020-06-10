/* Initialize packages */
const express = require('express');
const bodyParser = require('body-parser');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const app = express();

/* Set body parser */
app.use(bodyParser.urlencoded({extended: true}));
/* Set express to use static folder */
app.use(express.static("public"));

/* Set EJS */
app.set("view engine", "ejs");

/* Set API URL for http requests */
const api_url = "https://swapi.dev/api/films/";

app.get("/", function(req, res) {
    // Get the favorite movies using http request
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", api_url, false );
    xmlHttp.send( null );
    let responseText = JSON.parse(xmlHttp.responseText);
    
    let films = responseText.results;

    let filmsList = [];

    films.forEach(film => {
        filmsList.push({title: film.title, isFavorite: true});
    });

    res.render("list", {list: filmsList});
});

app.post("/", function(req, res) {
    console.log(req.body);
    localStorage.setItem("temperature", "100");
});




app.listen(3000, function() {
    console.log('Server listens to port 3000');
});