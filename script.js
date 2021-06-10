//Global Variables
const apiKey="8c30e394ac60b88dd3d26490d12af360";
const apiUrlNowPlaying=`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
const configurationUrl=`https://api.themoviedb.org/3/configuration?api_key=${apiKey}`;


const movieArea = document.getElementById("movies");
const loadBtn = document.getElementById("button");
const loadForm = document.getElementById("searchMovies");
loadForm.addEventListener("submit", searchForMovies);
/*
Example API Request: https://api.themoviedb.org/3/search/movie?api_key=8c30e394ac60b88dd3d26490d12af360
https://api.themoviedb.org/3/movie/now_playing?api_key=<<api_key>>&language=en-US&page=1
https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false
*/

async function getMovies(){
    //Configuration
    const configuration = await fetch(configurationUrl);
    const configJson = await configuration.json();
    console.log(configJson)
    const configImageUrl = configJson.images.secure_base_url;
    //Now Playing
    const fetchAllMovies = await fetch(apiUrlNowPlaying);
    console.log(fetchAllMovies)
    const jsonMovies = await fetchAllMovies.json();
    console.log("json",jsonMovies)

    //show Movies on HTML using forEach
    jsonMovies.results.forEach(element => {
        movies.innerHTML += `
        <div id="movie">
        <img id="movieImage" src="${configImageUrl}original${element.poster_path}" alt="${element.title} Movie Image" />
        <div id="movieTitle">
        <h4>${element.title}</h4>
        </div>
        <div id="rating">
        <h4>&#11088;${element.vote_average}</h4>
        </div>
        </div>
        `
    });
    


   
}
async function searchForMovies(event){
    event.preventDefault();
    //Get search result
    const searchInput = event.target.search;
    const findMovie = searchInput.value;
    const apiUrlSearch=`https://api.themoviedb.org/3/search/movie?query=${findMovie}&api_key=${apiKey}&language=en-US&page=1&include_adult=false`
    const fetchMovieSearch = await fetch(apiUrlSearch);
    console.log(fetchMovieSearch);
    const fetchMovieSearchJson = await fetchMovieSearch.json();
    console.log(fetchMovieSearchJson);

}

function displayMovies(){

}

function displaySearch(){

}


getMovies();
searchForMovies();
//displayMovies();
//displaySearch();