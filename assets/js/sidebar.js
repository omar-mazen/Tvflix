'use strict';

import {fetchData,URL} from "./api.js";

const device =deviceType();
const eventType = device=="mobile" ? "touchstart" : "click";


export function sidebar(){
    /**
     * fetch all genres eg:[{"id":"123","name":"action"}]
     * then change genre fromat eg : {123:"action"}
     */
    const genreList={};
    fetchData(`${URL.genreList}`,({genres})=>{
        for(const{id,name} of genres)
            genreList[id]=name;
        genreLink();
    });
    const sidebarInner = document.createElement("div");
    sidebarInner.classList.add("sidebar-inner");
    sidebarInner.innerHTML=`
        <div class="sidebar-list">
            <p class="title">Movie Lists</p>
            <a href="./favorites.html" menu-close class="sidebar-link">Favorite Movies</a>
            <a href="./watchlist.html" menu-close class="sidebar-link">Watchlist</a>
        </div>
        <div class="sidebar-list">
            <p class="title">Genre</p>
        </div>
        <div class="sidebar-list">
                <p class="title">Language</p>
                <a href="./movie-list.html" menu-close class="sidebar-link" on${eventType}=getMovieList("with_original_language=ar","with_original_language=ar")>Arabic</a>
                <a href="./movie-list.html" menu-close class="sidebar-link" on${eventType}=getMovieList("with_original_language=en",""with_original_language=en")>English</a>
                <a href="./movie-list.html" menu-close class="sidebar-link" on${eventType}=getMovieList("with_original_language=fr","with_original_language=fr")>French</a>
                <a href="./movie-list.html" menu-close class="sidebar-link" on${eventType}=getMovieList("with_original_language=es","with_original_language=es")>Spanish</a>
                <a href="./movie-list.html" menu-close class="sidebar-link" on${eventType}=getMovieList("with_original_language=de","with_original_language=de")>German</a>
                <a href="./movie-list.html" menu-close class="sidebar-link" on${eventType}=getMovieList("with_original_language=hi","with_original_language=hi")>Hindi</a>
        </div>
    `;
    const genreLink =()=>{
        for(const[genreId,genreName] of Object.entries(genreList)){
            const link =document.createElement("a");
            link.classList.add("sidebar-link");
            link.setAttribute("href","./movie-list.html");
            link.setAttribute("menu-close","");
            link.setAttribute(`on${eventType}`,`getMovieList("with_genres=${genreId}","${genreName}")`);
            link.textContent=genreName;
            sidebarInner.querySelectorAll(".sidebar-list")[1].appendChild(link);
        }
        const sidebar=document.querySelector("[sidebar]");
        sidebar.appendChild(sidebarInner);
        toggleSidebar(sidebar);
    }

    const toggleSidebar=sidebar=>{
        const sidebarBtn = document.querySelector("[menu-btn]");
        const sidebarTogglers = document.querySelectorAll("[menu-toggler]");
        const sidebarClose = document.querySelectorAll("[menu-close]");
        const overlay=document.querySelector("[overlay]");
        addEventOnElements(sidebarTogglers,eventType,()=>{
            sidebar.classList.toggle("active");
            sidebarBtn.classList.toggle("active");
            overlay.classList.toggle("active");
        });
        addEventOnElements(sidebarClose,eventType,()=>{
            sidebar.classList.remove("active");
            sidebarBtn.classList.remove("active");
            overlay.classList.remove("active");
        });
    }
}