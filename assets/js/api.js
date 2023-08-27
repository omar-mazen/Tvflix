'use strict';

const api_key='5950c6bf4b625e262f05283dfcef3e63';
const imageBaseURL='https://image.tmdb.org/t/p/';

const fetchData =(url,callback,optinalParam)=>{
    fetch(`${url}&api_key=${api_key}`)
    .then(res=>res.json())
    .then(data=>callback(data,optinalParam))
}
const URL ={
    genreList:`https://api.themoviedb.org/3/genre/movie/list?`,
    popular:`https://api.themoviedb.org/3/movie/popular?`,
    topRated:`https://api.themoviedb.org/3/movie/top_rated?`,
    upcoming:`https://api.themoviedb.org/3/movie/upcoming?`,
    trending:`https://api.themoviedb.org/3/trending/movie/week?`,
    genre:`https://api.themoviedb.org/3/genre/movie/list?`,
    recommendations(id){return`https://api.themoviedb.org/3/movie/${id}/recommendations?page=1`},
    discover(urlParam,currentPage) {return`https://api.themoviedb.org/3/discover/movie?&page=${currentPage}&${urlParam}`},
    detail(id){return`https://api.themoviedb.org/3/movie/${id}?append_to_response=casts,videos,images,releases`},
    search(query){return`https://api.themoviedb.org/3/search/movie?query=${query}`},

}
export {imageBaseURL,fetchData,URL};
