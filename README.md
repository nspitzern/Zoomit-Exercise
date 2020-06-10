# Zoomit-Exercise
Home assignment for Zoomit

## Dependencies
The exercise was written in JavaScript and NodeJS, using the next Modoules:
- Express
- Body-Parser
- EJS
- XMLHttpRequest
- Mongoose

The Modoules can be installed by running:
```bash
npm i express body-parser ejs mongoose xmlhttprequest
```

Or if you already have the depndencies file (package.json):
```bash
npm i
```

## How it works
After installing all dependencies from the root folder run ```
node app.js``` 
in order to run the server (The server listens to port 3000).

The page will be open in [localHost](http://localhost:3000)

When making a *GET* request to the page, we retrive the films names from the *SWAPI* (using XMLHttpRequest).
When clicking a film name from the list we can toggle between *favorite* and *not favorite* for each film.
A star next to the film name indicates if it is a favorite film or not.
