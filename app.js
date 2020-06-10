/* Initialize packages */
const express = require('express');
const bodyParser = require('body-parser');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const mongoose = require("mongoose");

const app = express();

/* Set body parser */
app.use(bodyParser.urlencoded({extended: true}));
/* Set express to use static folder */
app.use(express.static("public"));

/* Set EJS */
app.set("view engine", "ejs");

// Connect to mongoose
mongoose.connect("mongodb://localhost:27017/filmsDB", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
// create DB schema
const filmsSchema = {
    title: String
};

// Create film model
const Film = mongoose.model("Film", filmsSchema);

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

    // init films list
    films.forEach(film => {
        filmsList.push({title: film.title, isFavorite: false});
    });

    // look for all favorite films and set isFavorite to true (if not exist - add to list)
    Film.find(function(err, results) {
        if(err) {
            console.log(err);
        } else {
            results.forEach(film => {
                let existsInFavList = false;
                for(var i = 0; i < filmsList.length; i++) {                
                    if(filmsList[i].title === film.title) { // if film exists in the list
                        // The film with the given title is a favorite.
                        // Set the isFavorite attribute of the film to true and stop searching
                        filmsList[i].isFavorite = true;
                        existsInFavList = true;
                        break;
                    }
                }

                if(!existsInFavList) {
                    filmsList.push({title: film.title, isFavorite: true});
                }
            });            
        }
        res.render("list", {list: filmsList});
    });
});

app.post("/", function(req, res) {
    // Get the film title
    const filmTitle = req.body.listItem;

    Film.findOne({title: filmTitle}, function(err, result) {
        if(err) {
            console.log(err);
        } else {            
            if(!result) { // if film not exists in the favorites - we add it to the favorite list
                const newFilm = new Film({
                    title: filmTitle
                });
            
                newFilm.save();
            } else {
                // in case film is already in the favorite list, we remove it from the list.
                Film.deleteOne({"title": result.title}, function(err) {
                    if(err) {
                        console.log(err);
                    }
                });
            }
        }
    });

    res.redirect("/");
});


app.listen(3000, function() {
    console.log('Server listens to port 3000');
});