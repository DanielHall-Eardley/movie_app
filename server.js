const express = require('express');
const app = express();
const path = require('path')

app.listen(8080, () => {
    console.log("working...");
});

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index.ejs', {
        movies: getMovies
    });
});

//I used the movieId parameter as the index for my getMovies request

app.get('/movie/:movieId', (request, response) => {
    response.render('movie', {
        movies: getMovies[request.params.movieId]
    });
});

/*I spent ages trying to get this function to stop
giving me the client header error, but in the end I
got it to work even though the error persists*/

app.get("/search", (request, response) => {
    let query = request.query.input
    for (let i = 0; i < getMovies.length; i++) {
        if (query.toLowerCase() == getMovies[i].title.toLowerCase()) {
            response.render('movie', {
                movies: getMovies[i]
            })
        }
    }
    response.render('error')
});

/*I added an image and a youtube link into each movie object to be 
dynamically rendered */

let getMovies = [{
        video: "https://www.youtube.com/embed/eogpIG53Cis",
        img: "https://image.tmdb.org/t/p/w1280/wuvsU227d8pvHvTRaqkPlsj0OvD.jpg",
        title: 'Blade Runner',
        year: '1982',
        rated: 'R',
        released: '25 June 1982',
        runtime: '1h 57min',
        genre: 'Sci-Fi, Thriller',
        director: 'Ridley Scott',
        writer: 'Hampton Fancher, David Peoples',
        actors: 'Harrison Ford, Rutger Hauer, Sean Young, Edward James Olmos',
        plot: 'In the smog-choked dystopian Los Angeles of 2019, blade runner Rick Deckard is called out of retirement to terminate a quartet of replicants who have escaped to Earth seeking their creator for a way to extend their short life spans.',
        language: 'English',
        country: 'USA, Hong Kong',
    },

    {
        video: "https://www.youtube.com/embed/QwievZ1Tx-8",
        img: "https://image.tmdb.org/t/p/w1280/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
        title: 'Avengers Infinity War',
        year: '2018',
        rated: 'PG13',
        released: '23 April 2018',
        runtime: '2h 29min',
        genre: 'Adventure, Sci-Fi',
        director: 'Joe Russo, Anthony Russo',
        writer: 'Stephen Mcfeely, Christopher Markus',
        actors: 'Robert Downey Jr, Chris Hemsworth, Mark Ruffalo, Chris Evans',
        plot: "As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment - the fate of Earth and existence itself has never been more uncertain.",
        language: 'English',
        country: 'USA',
    },

    {
        video: "https://www.youtube.com/embed/cSp1dM2Vj48",
        img: "https://image.tmdb.org/t/p/w1280/pU1ULUq8D3iRxl1fdX2lZIzdHuI.jpg",
        title: 'Ready Player One',
        year: '2018',
        rated: 'PG13',
        released: '29 March 2018',
        runtime: '2h 20min',
        genre: 'Sci-Fi, Video Game',
        director: 'Steven Spielberg',
        writer: 'Ernest Cline, Zak Penn',
        actors: 'Tye Sheridan, Olivia Cooke, Len Waith, T.J Miller',
        plot: "When the creator of a popular video game system dies, a virtual contest is created to compete for his fortune.",
        language: 'English',
        country: 'USA',
    }
]

/*I added a style tag in the movie.ejs folder because I couldn't get express
to render the style.css file with the html body*/