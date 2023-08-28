'use strict';
import {URL,fetchData,imageBaseURL}from "./api.js"
import {sidebar}from "./sidebar.js"
import {createMovieCard}from "./movie-card.js"
import { search } from "./search.js";

const movieId=window.localStorage.getItem("movieId");
const pageContent=document.querySelector("[page-content]");

const device =deviceType();
const eventType = device=="mobile" ? "touchstart" : "click";

sidebar();

const getGenres = function(genreList){
    const newGenreList=[];
    for(const {name} of genreList)
        newGenreList.push(name);
    return newGenreList.join(", ");
}
const getCasts = function(castList){
    const newCastList=[];
    for(let i=0,len=castList.length;i<len&&i<10;i++){
        const{name}=castList[i];
        newCastList.push(name);
    }
    return newCastList.join(", ")
}
const getDirectors = function(crewList){
    const directors=crewList.filter(({job})=>job =="Director")
    const directorsList =[];
    for(const{name}of directors)
        directorsList.push(name)
    return directorsList.join(", ")
}
const filterVideos = function(videoList){
    return videoList.filter(({type, site})=>(type=="Trailer"||type=="Teaser")&&site=="YouTube")
}

fetchData(URL.detail(movieId),function(movie){
    const{
        id,
        backdrop_path,
        poster_path,
        title,
        release_date,
        runtime,
        vote_average,
        releases:{countries:[{certification}]},
        genres,
        overview,
        casts:{cast,crew},
        videos:{results:videos}
    }=movie;
    document.title=`${title} - Tvflix`;
    const MovieDetail = document.createElement("div");
    MovieDetail.classList.add("movie-detail");
    MovieDetail.id=`${id}`
    MovieDetail.innerHTML=`
            <div class="backdrop-image" style="background-image: url('${imageBaseURL}${"w1280"||"original"}${backdrop_path||poster_path}');"></div>        
            
                <figure class="poster-box movie-poster movie-card "movie-id=${id}>
                        <div class="icons">
                            <span><span class="favorites" on${eventType}=favorites(this,${id}) ></span></span>
                            <span>
                            <span class="watchlist" on${eventType}=watchList(this,${id})></span>
                            </span>
                        </div>  
                    <img src="${imageBaseURL}w342${poster_path}" alt="${title}" class="img-cover">
                </figure>
            <div class="detail-box">
                <div class="detail-content">
                    <h1 class="heading">${title}</h1>
                    <div class="meta-list">
                        <div class="meta-item">
                            <img src="./assets/images/star.png" width="20" height="20" alt="rating">
                            <span class="span">${vote_average.toFixed(1)}</span>
                        </div>                        
                        <div class="separator"></div>
                        <div class="meta-item">${runtime}m</div>
                        <div class="separator"></div>
                        <div class="meta-item">${release_date.split("-")[0]}</div>
                        <div class="meta-item card-badge">${certification}</div>
                    </div>
                    <p class="genre">${getGenres(genres)}</p>
                    <p class="overview">${overview}</p>
                    <ul class="detail-list">
                        <div class="list-item">
                            <p class="list-name">Starring</p>
                            <p>${getCasts(cast)}</p>
                        </div>
                        <div class="list-item">
                            <p class="list-name">Directed By</p>
                            <p>${getDirectors(crew)}</p>
                        </div>
                    </ul>
                </div>
                <div class="title-wrapper">
                    <h3 class="title-large">Trailers and Clips</h3>
                </div>
                <div class="slider-list">
                    <div class="slider-inner"></div>
                </div>
        </div>
    `
    for(const{key,name} of filterVideos(videos)){
        const videoCard = document.createElement("div");
        videoCard.classList.add("video-card");
        videoCard.innerHTML=`
        <iframe width="500" height="294" src="https://www.youtube.com/embed/${key}?&theme=dark&color=white&rel=0" frameborder="0" allowfullscreen="1" title="${name}" class="img-cover" loading="lazy"></iframe>
        `;
        MovieDetail.querySelector(".slider-inner").appendChild(videoCard);
        updateIcons();
    }
    pageContent.appendChild(MovieDetail);
    updateIcons();
    fetchData(URL.recommendations(movieId),addSuggestedMovies);

});
const addSuggestedMovies = ({results:movieList})=>{
    const movieListElem = document.createElement("section");
    movieListElem.classList.add("movie-list");
    movieListElem.ariaLabel=`You May Also Like`;
    movieListElem.innerHTML=`
    <div class="title-wrapper">
        <h3 class="title-large">You May Also Like</h3>
    </div>
    
    <div class="slider-list">
        <div class="slider-inner"></div>
    </div>
    `;
    for(const movie of movieList){
        const movieCard = createMovieCard(movie) //movie card.js
        if(movieCard)
            movieListElem.querySelector(".slider-inner").appendChild(movieCard);
    }
    pageContent.appendChild(movieListElem);
    updateIcons();
}
search();

