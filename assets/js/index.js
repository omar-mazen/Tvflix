'use strict';
import { URL, fetchData ,imageBaseURL} from "./api.js";
import { sidebar } from "./sidebar.js";
import { createMovieCard } from "./movie-card.js";
import { search } from "./search.js";

const pageContent = document.querySelector("[page-content]");

const device =deviceType();
const eventType = device=="mobile" ? "touchstart" : "click";


const homePageSections =[
    {
        title:"Trending Movies",
        url:URL.trending
    },
    {
        title:"Top Rated Movies",
        url:URL.topRated
    },
    {
        title:"Upcoming Movies",
        url:URL.upcoming
    }
]

sidebar();
/**
 * fetch all genres eg:[{"id":"123","name":"action"}]
 * then change genre fromat eg : {123:"action"}
 */
const genreList={
    //create genre string from genre_id eg [32,43] -> "action,romance"
    asString(genreIdList){
        let newGenreList=[];
        for(const genreId of genreIdList)
            this[genreId] && newGenreList.push(this[genreId]);
        return newGenreList.join(", ");
    }
};
fetchData(`${URL.genreList}`,({genres})=>{
    for(const{id,name} of genres)
        genreList[id]=name;
    fetchData(`${URL.popular}`,heroBanner);
});


const heroBanner = ({results:movieList})=>{
    const banner = document.createElement("section");
    banner.classList.add("banner");
    banner.ariaLabel="Popular Movies";
    banner.innerHTML=`
    <div class="banner-slider"></div>
    <div class="slider-control">
        <div class="control-inner"></div>
    </div>
    `;
    let controlItemIndex=0;
    for(const[index,movie] of movieList.entries()){
        const{
            backdrop_path,
            title,
            release_date,
            genre_ids,
            overview,
            poster_path,
            vote_average,
            id
        }=movie
        const sliderItem = document.createElement("div");
        sliderItem.classList.add("slider-item");
        sliderItem.setAttribute("slider-item","");
        sliderItem.innerHTML=`
        <img src="${imageBaseURL}w1280${backdrop_path}" alt="${title}" class="img-cover" loading="${index == 0 ? "eager":"lazy" }">
        <div class="banner-content">
            <h2 class="heading">${title}</h2>
            <div class="meta-list">
                <div class="meta-item">${release_date.split("-")[0]}</div>
                <div class="meta-item card-badge">${vote_average.toFixed(1)}</div>
            </div>
            <p class="genre">${genreList.asString(genre_ids)}</p>
            <p class="banner-text">${overview}</p>
            <a href="./detail.html" class="btn" onclick=getMovieDetail(${id})>
                <img src="./assets/images/play_circle.png" width="24" height="24" aria-hidden="true" alt="play_circle">
                <span class="span">Watch Now</span>
            </a>
        </div>
        `;
        banner.querySelector(".banner-slider").appendChild(sliderItem);
        const controlItem = document.createElement("button");
        controlItem.classList.add("poster-box","slider-item");
        controlItem.setAttribute("slider-control",`${controlItemIndex}`);
        controlItemIndex++;
        controlItem.innerHTML=`
            <img src="${imageBaseURL}w154${poster_path}" alt="${title}" class="img-cover" loading="lazy" draggable="false">
        `;
        banner.querySelector(".control-inner").appendChild(controlItem);
    }
    pageContent.appendChild(banner);
    addHeroSlide();
    /**
     * fetch data for home page sections
     */
    for(const{title,url} of homePageSections)
        fetchData(url,createMovieList,title);
}

const addHeroSlide = ()=>{
    const sliderItems = document.querySelectorAll("[slider-item]");
    const sliderControls = document.querySelectorAll("[slider-control]");
    
    let lastSliderItem = sliderItems[0];
    let lastSliderControl = sliderControls[0];

    lastSliderItem.classList.add("active");
    lastSliderControl.classList.add("active");

    const sliderStart =function(){
        lastSliderItem.classList.remove("active");
        lastSliderControl.classList.remove("active");
        //this => slider-control
        sliderItems[Number(this.getAttribute("slider-control"))].classList.add("active");
        this.classList.add("active");
        lastSliderItem= sliderItems[Number(this.getAttribute("slider-control"))];
        lastSliderControl=this;
    }
    addEventOnElements(sliderControls,eventType,sliderStart);
}
const createMovieList = ({results:movieList},title)=>{
    const movieListElem = document.createElement("section");
    movieListElem.classList.add("movie-list");
    movieListElem.ariaLabel=`${title}`;
    movieListElem.innerHTML=`
    <div class="title-wrapper">
        <h3 class="title-large">${title}</h3>
    </div>
    <div class="slider-list">
        <div class="slider-inner">
        </div>
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