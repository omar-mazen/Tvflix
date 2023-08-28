'use strict';
import { imageBaseURL } from "./api.js";

const device =deviceType();
const eventType = device=="mobile" ? "touchstart" : "click";

export function createMovieCard(movie){
    const{
        poster_path,
        title,
        vote_average,
        release_date,
        id
    }=movie;
    if(poster_path==null){
        return;
    }
    const card = document.createElement("div");
    card.classList.add("movie-card");
    card.setAttribute("movie-id",`${id}`);
    card.innerHTML=`
    <div class="icons">
        <span><span class="favorites" on${eventType}=favorites(this,${id}) ></span></span>
        <span>
        <span class="watchlist" on${eventType}=watchList(this,${id})></span>
        </span>
    </div>
    <a href="./detail.html" class="card-btn" title="${title}" on${eventType}="getMovieDetail(${id})">
        <figure class="poster-box card-banner">
            <img src="${imageBaseURL}w342${poster_path}" alt="${title}" class="img-cover" loading="lazy">
        </figure>
        <h4 class="title">${title}</h4>
        <div class="meta-list">
            <div class="meta-item">
                <img src="./assets/images/star.png" alt="rating" width="20" height="20" loading="lazy">
                <span class="span">${vote_average.toFixed(1)}</span>
            </div>
            <div class="card-badge">${release_date.split("-")[0]}</div>
        </div>
    </a>
        `;
    return card;
};      