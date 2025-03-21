api_key = "b9ec6254ffb55557b90772b77e84baea";
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOWVjNjI1NGZmYjU1NTU3YjkwNzcyYjc3ZTg0YmFlYSIsIm5iZiI6MTc0MjAxMTI5OS42MTksInN1YiI6IjY3ZDRmYmEzNzkwZDc4NjMzYTAxMGZiNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GTVKQKFsokk4bfxnxM7OtpgYJZt3nj2ReDpTBBY9a5E'
    }
  };
//Using moviedb wrapper
// const mdb = require('moviedb')(api_key);

// mdb.searchMovie({query:'Singam', language: 'IN-TM' }, (err, res) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     const filteredResults = res.results.filter(movie => movie.popularity > 0.1); // Example of using a relational operator
//     console.log(filteredResults);
// });


//Using traditional get and post

// function getCastDetails(movieQuery, language) {
//     const url = "https://api.themoviedb.org/3/search/movie/"
// }

function getMovieIdFromQuery(query,language) {
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=${language}`;
    return fetch(url,options).then(res => {
        return res.json()
    }).catch(err => console.log(err));
}

function getCastDetails(movieId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${api_key}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const cast = data.cast;
            cast.forEach(actor => {
                console.log(`${actor.name} as ${actor.character}`);
            });
        })
        .catch(error => console.error('Error fetching cast details:', error));
}
async function logMovieIds() {
    const movies = await getMovieIdFromQuery("Padam","IN-TM");
    let movieIds;
    movies.results.forEach(movie => {
        movieIds += `${movie.id}\n`;
    });
    console.log(movieIds);
}
logMovieIds();