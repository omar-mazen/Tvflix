'use strict';

import {URL,fetchData} from "./api.js"
import {createMovieCard} from "./movie-card.js"

const device =deviceType();
const eventType = device=="mobile" ? "touchstart" : "click";


export function search(){
    const searchWrapper = document.querySelector("[search-wrapper]");
    const searchField = document.querySelector("[search-field]");
    const searchResultModal=document.createElement("div");
    searchResultModal.classList.add("search-modal");
    document.querySelector("main").appendChild(searchResultModal);
    let searchTimeout;
    searchField.addEventListener("input",function(){
        if(!searchField.value.trim()){
            searchResultModal.classList.remove("active");
            searchWrapper.classList.remove("searching");
            clearTimeout(searchTimeout);
            return;
        }
        searchWrapper.classList.add("searching");
        clearTimeout(searchTimeout);
        searchTimeout=setTimeout(function(){
            fetchData(URL.search(searchField.value),function({results:movieList}){
                searchWrapper.classList.remove("searching");
                searchResultModal.classList.add("active");
                searchResultModal.innerHTML=``;
                searchResultModal.innerHTML=`
                <p class="lable">Result for</p>
                <h1 class="heading">${searchField.value}</h1>
                <div class="movie-list">
                    <div class="grid-list"></div>
                </div>
                `;
                for(const movie of movieList){
                    const movieCard=createMovieCard(movie);
                    if(movieCard)
                        searchResultModal.querySelector(".grid-list").appendChild(movieCard);
                }
            });
        },500)
    })
    const searchToggler=document.querySelector("[search-close]");
    const searchModal = document.querySelector(".search-modal");
    searchToggler.addEventListener(eventType,()=>{
        searchModal.classList.remove("active");
    })
}