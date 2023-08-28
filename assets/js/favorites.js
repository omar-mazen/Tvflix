'use strict';
import{URL, fetchData}from "./api.js"
import {createMovieCard } from "./movie-card.js";
import{sidebar}from "./sidebar.js"

const favorites=localStorage.getItem("favorites");
const pageContent = document.querySelector("[page-content]")

const device =deviceType();
const eventType = device=="mobile" ? "touchstart" : "click";


if(favorites){
    const favoritesIds = favorites.split(",");
    pageContent.innerHTML=`
        <h1 class="heading">My Favorite Movies</h1>
        <div class="movie-list">
            <div class="grid-list"></div>
        </div>
    `;
    favoritesIds.forEach((id)=>{
        if(parseInt(id)>0){
            fetchData(URL.detail(parseInt(id)),(movie)=>{
                const movieCard=createMovieCard(movie);
                pageContent.querySelector(".grid-list").appendChild(movieCard);
                updateIcons();
                let favoriteBtn=document.querySelectorAll(".favorites");
                addEventOnElements(favoriteBtn,eventType,(event)=>{
                    event.currentTarget.parentNode.parentNode.parentNode.remove();
                })
            })
        }
    })
}
else{
    pageContent.innerHTML=`
    <h3 class="heading">Haven't found any favorites yet? Let's fix that!</h3>
    <div style="margin-top:20px">
        <p>It looks like your favorites list is empty.
        To add movies to your favorites, simply browse our collection and click the heart icon  
        <img src="./assets/images/love-stroke.png" style="display:inline" alt="favorite" width=15 heigth 15> for movies you love. 
        Start building your favorites list now!</p>
    </div>
    `
}
sidebar();
