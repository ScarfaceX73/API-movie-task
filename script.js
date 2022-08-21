const API_KEY = "api_key=fe104304b38f134fb117a2d5f3d4f660";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = BASE_URL + "/search/movie?" + API_KEY;


const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
function getMovies(url) {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            console.log(data.results);
            showMovies(data.results);
        });
}
getMovies(API_URL);
function showMovies(data) {
    main.innerHTML = "";
    data.forEach((movie) => {
        const { title, poster_path, vote_average, overview, release_date } = movie;
        const movie_date = new Date(release_date).toDateString();
        const ele = document.createElement("div");
        ele.classList.add("movie");
        ele.innerHTML = `<img src="${IMG_URL + poster_path}" alt="movie">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>
        <div class="release-date">Released-Date:${movie_date}</div>
        <div class="overview">
            <h3>Overview</h3>
           ${overview}
        </div>`;
        main.appendChild(ele);
    });
}


function getColor(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

let button = document.createElement("button");
button.setAttribute("onclick", "showMovies()");
button.setAttribute("class", "btn1");
button.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i>';
form.append(button);

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm) {
        getMovies(searchURL + "&query=" + searchTerm);
    } else {
        getMovies(API_URL);
    }
});
 