'use strict';
import{URL, fetchData}from "./api.js"
import {createMovieCard } from "./movie-card.js";
import{sidebar}from "./sidebar.js"

const watchlist=localStorage.getItem("watchlist");
const pageContent = document.querySelector("[page-content]")

const device =deviceType();
const eventType = device=="mobile" ? "touchstart" : "click";


if(watchlist){
    const watchlistIds = watchlist.split(",");
    pageContent.innerHTML=`
        <h1 class="heading">My watchlist </h1>
        <div class="movie-list">
            <div class="grid-list"></div>
        </div>
    `;
    watchlistIds.forEach((id)=>{
        if(parseInt(id)>0){
            fetchData(URL.detail(parseInt(id)),(movie)=>{
                const movieCard=createMovieCard(movie);
                pageContent.querySelector(".grid-list").appendChild(movieCard);
                updateIcons();
                let watchlistBtn=document.querySelectorAll(".watchlist");
                addEventOnElements(watchlistBtn,eventType,(event)=>{
                    event.currentTarget.parentNode.parentNode.parentNode.remove();
                })
            })
        }
    })
}
else{
    pageContent.innerHTML=`
    <h3 class="heading">Ready to plan your movie marathon?</h3>
    <div style="margin-top:20px">
        <p>Your watchlist is currently empty. To start curating your personalized movie queue,
        explore our movies and click on save icon <img src="./assets/images/watch-later-stroke.png" style="display:inline" alt="favorite" width=15 heigth 15>.
        That way, you'll never miss out on the films you're excited to watch.
        Let's begin adding to your watchlist!</p>
    </div>
    `
}
sidebar();
