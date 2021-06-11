//Global Variables
const apiKey="8c30e394ac60b88dd3d26490d12af360";
var page=1;

const configurationUrl=`https://api.themoviedb.org/3/configuration?api_key=${apiKey}`;

const movieArea = document.getElementById("movies");
const loadBtn = document.getElementById("button");
const loadForm = document.getElementById("searchMovies");
loadForm.addEventListener("submit", searchForMovies);

/*var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn")
var span = document.getElementsByClassName("close")[0];

btn.onclick = function(){
    modal.style.display = "block";
}
span.onclick = function(){
    modal.style.display = "none"
}

window.onclick = function(event){
    if (event.target == modal){
        modal.style.display = "none";
    }
}*/
/*
Example API Request: https://api.themoviedb.org/3/search/movie?api_key=8c30e394ac60b88dd3d26490d12af360
https://api.themoviedb.org/3/movie/now_playing?api_key=<<api_key>>&language=en-US&page=1
https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false
*/

getMovies();

async function getMovies(){
    //Configuration
    const configuration = await fetch(configurationUrl);
    const configJson = await configuration.json();
  //  console.log(configJson)
    const configImageUrl = configJson.images.secure_base_url;
    //Now Playing
    const apiUrlNowPlaying=`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${page}`
    const fetchAllMovies = await fetch(apiUrlNowPlaying);
 //   console.log(fetchAllMovies)
    const jsonMovies = await fetchAllMovies.json();
  //  console.log("json",jsonMovies)
  //  console.log(configImageUrl)

    //show Movies on HTML using forEach
    jsonMovies.results.forEach(element => {
        movies.innerHTML += `
        <div id="movie">
        <img id="movieImage" src="${configImageUrl}original${element.poster_path}" alt="${element.title} Movie Image" />
        <div id="myModal" class="modal"> 
        <span class="close">&times;</span>
        <img class="modal-content" id="img1">
        <div id="caption"></div> 
        </div>
        <div id="movieTitle">
        <h4>${element.title}</h4>
        </div>
        <div id="rating">
        <h4>&#11088;${element.vote_average}</h4>
        </div>
        </div>
        `
    });
    jsonMovies.results.forEach(element => {
        //need to figure out how to use element
       var modal = document.getElementById("myModal");
      //  var img = document.getElementById("movieImage")
        var modalImg = document.getElementById("img1");
        var captionText = document.getElementById("caption");
      //  console.log(document.getElementById("movieImage"))
        var img = `https://image.tmdb.org/t/p/original${element.poster_path}`
       
        img.onclick = function(){
            modal.style.display = "block";
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
    }
        var span = document.getElementsByClassName("close")[0];
    
        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
        modal.style.display = "none"}
        
    });
    page++;

}

async function searchForMovies(event){
    event.preventDefault();
    //Configuration
    const config = await fetch(configurationUrl);
    const config_Json = await config.json();
    console.log(config_Json)
    const config_ImageUrl = config_Json.images.secure_base_url;
    //Get search result
    const searchInput = event.target.search;
    const findMovie = searchInput.value;
    const apiUrlSearch=`https://api.themoviedb.org/3/search/movie?query=${findMovie}&api_key=${apiKey}&language=en-US&page=${page}&include_adult=false`
    const fetchMovieSearch = await fetch(apiUrlSearch);
   // console.log(fetchMovieSearch);
    const fetchMovieSearchJson = await fetchMovieSearch.json();
   // console.log("search json", fetchMovieSearchJson);

    //remove now playing movies from innerhtml
    movies.innerHTML="";
    //change playing elements
    const now_playing = document.getElementById("now_playing")
    now_playing.innerHTML = `<h2>Search Results</h2>`
    loadBtn.style.display = 'none';
    clearbtn.innerHTML = `<button id="btnClear">Clear Search</button>`
    btnClear.onclick = function() {
        movies.innerHTML="";
        now_playing.innerHTML = `<h2>Now Playing</h2>`
        loadBtn.style.display='block'
        page-=1;
        document.getElementById("searchMovie").value = ""
        document.getElementById("searchMovie").placeholder = "Enter Movie a Title"
        getMovies();


    }
    
    //display Search Results
    fetchMovieSearchJson.results.forEach(element => {
        movies.innerHTML += `
        <div id="movie">
        <img id="movieImage" src="${config_ImageUrl}original${element.poster_path}" alt="${element.title} Movie Image" />
        <div id="myModal" class="modal"> 
        <span class="close">&times;</span>
        <img class="modal-content" id="img1">
        <div id="caption"></div> 
        </div>
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
loadBtn.addEventListener("click", getMovies);


