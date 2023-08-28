'use strict';
import{URL,fetchData} from "./api.js"
import{sidebar} from "./sidebar.js"
import{createMovieCard} from "./movie-card.js"
import { search } from "./search.js";


const device =deviceType();
const eventType = device=="mobile" ? "touchstart" : "click";

const genreName = window.localStorage.getItem("genreName");
const urlParam = window.localStorage.getItem("urlParam");
const pageContent = document.querySelector("[page-content]");

sidebar();

let currentPage =1;
let totalPages =0;

fetchData(URL.discover(urlParam,currentPage),({results:movieList,total_pages})=>{
    totalPages = total_pages;
    document.title=`${genreName} Movies - Tvflix`;
    const movieListElem = document.createElement("section");
    movieListElem.classList.add("movie-list","genre-list");
    movieListElem.ariaLabel = `${genreName} Movies`;

    movieListElem.innerHTML=`
    <div class="title-wrapper">
        <h1 class="heading">All ${genreName} Movies</13>
    </div>
    <div class="filter-sort">
            <div class="dropdown">
                <select class="sort">
                    <option value=""selected>Sort by</option>
                    <option value="&sort_by=popularity.desc">popularity</option>
                    <option value="&sort_by=revenue.desc">revenue</option>
                    <option value="&sort_by=primary_release_date.desc">release date</option>
                    <option value="&sort_by=vote_average.desc">vote average</option>
                    <option value="&sort_by=vote_count.desc">vote count</option>
                </select>
            </div>        
            <div class="dropdown">
                <select class="language">
                    <option value="&with_original_language="selected>Language</option>
                    <option value="&with_original_language=ar">Arabic</option>
                    <option value="&with_original_language=en">English</option>
                    <option value="&with_original_language=fr">French</option>
                    <option value="&with_original_language=es">Spanish</option>
                    <option value="&with_original_language=de">German</option>
                    <option value="&with_original_language=hi">Hindi</option>
                </select>
            </div>
            <div class="dropdown">
                <select class="rating">
                    <option value="&vote_average.gte=" selected >rating</option>
                    <option value="&vote_average.gte=10.0">10</option>
                    <option value="&vote_average.gte=9.0">9</option>
                    <option value="&vote_average.gte=8.0">8</option>
                    <option value="&vote_average.gte=7.0">7</option>
                    <option value="&vote_average.gte=6.0">6</option>
                    <option value="&vote_average.gte=5.0">5</option>
                    <option value="&vote_average.gte=4.0">4</option>
                    <option value="&vote_average.gte=3.0">3</option>
                    <option value="&vote_average.gte=2.0">2</option>
                    <option value="&vote_average.gte=1.0">1</option>
                </select>
            </div>
            <div class="dropdown">
                <select class="rating">
                    <option value="&primary_release_year=" selected >year</option>
                    <option value="&primary_release_year=2023">2023</option>
                    <option value="&primary_release_year=2022">2022</option>
                    <option value="&primary_release_year=2021">2021</option>
                    <option value="&primary_release_year=2020">2020</option>
                    <option value="&primary_release_year=2019">2019</option>
                    <option value="&primary_release_year=2018">2018</option>
                    <option value="&primary_release_year=2017">2017</option>
                    <option value="&primary_release_year=2016">2016</option>
                    <option value="&primary_release_year=2015">2015</option>
                    <option value="&primary_release_year=2014">2014</option>
                    <option value="&primary_release_year=2013">2013</option>
                    <option value="&primary_release_year=2012">2012</option>
                    <option value="&primary_release_year=2011">2011</option>
                    <option value="&primary_release_year=2010">2010</option>
                    <option value="&primary_release_year=2009">2009</option>
                    <option value="&primary_release_year=2008">2008</option>
                    <option value="&primary_release_year=2007">2007</option>
                    <option value="&primary_release_year=2006">2006</option>
                    <option value="&primary_release_year=2005">2005</option>
                    <option value="&primary_release_year=2004">2004</option>
                    <option value="&primary_release_year=2003">2003</option>
                    <option value="&primary_release_year=2002">2002</option>
                    <option value="&primary_release_year=2001">2001</option>
                    <option value="&primary_release_year=2000">2000</option>
                    <option value="&primary_release_year=1999">1999</option>
                    <option value="&primary_release_year=1998">1998</option>
                    <option value="&primary_release_year=1997">1997</option>
                    <option value="&primary_release_year=1996">1996</option>
                    <option value="&primary_release_year=1995">1995</option>
                    <option value="&primary_release_year=1994">1994</option>
                    <option value="&primary_release_year=1993">1993</option>
                    <option value="&primary_release_year=1992">1992</option>
                    <option value="&primary_release_year=1991">1991</option>
                    <option value="&primary_release_year=1990">1990</option>
                    <option value="&primary_release_year=1989">1989</option>
                    <option value="&primary_release_year=1988">1988</option>
                    <option value="&primary_release_year=1987">1987</option>
                    <option value="&primary_release_year=1986">1986</option>
                    <option value="&primary_release_year=1985">1985</option>
                    <option value="&primary_release_year=1984">1984</option>
                    <option value="&primary_release_year=1983">1983</option>
                    <option value="&primary_release_year=1982">1982</option>
                    <option value="&primary_release_year=1981">1981</option>
                    <option value="&primary_release_year=1980">1980</option>
                    <option value="&primary_release_year=1979">1979</option>
                    <option value="&primary_release_year=1978">1978</option>
                    <option value="&primary_release_year=1977">1977</option>
                    <option value="&primary_release_year=1976">1976</option>
                    <option value="&primary_release_year=1975">1975</option>
                    <option value="&primary_release_year=1974">1974</option>
                    <option value="&primary_release_year=1973">1973</option>
                    <option value="&primary_release_year=1972">1972</option>
                    <option value="&primary_release_year=1971">1971</option>
                    <option value="&primary_release_year=1970">1970</option>
                </select>
            </div>
    </div>
    <div class="grid-list"></div>
    <button class="btn load-more" load-more>Load More</button>
    `
    for (const movie of movieList){
        const movieCard = createMovieCard(movie);
        if(movieCard)
            movieListElem.querySelector(".grid-list").appendChild(movieCard);
    }
    pageContent.appendChild(movieListElem);
    /**
     * load more button functionality
     */
    updateIcons();
    document.querySelector("[load-more]").addEventListener(eventType,function(){
        if(currentPage>= totalPages){
            this.style.display="none";
            return;
        }
        currentPage++;
        this.classList.add("loading");
        fetchData(URL.discover(`${urlParam}${param}`,currentPage),({results:movieList})=>{
            this.classList.remove("loading")
            for (const movie of movieList){
                const movieCard = createMovieCard(movie);
                if(movieCard)
                    movieListElem.querySelector(".grid-list").appendChild(movieCard);
                updateIcons();
            }
        });
    });

    const dropdowns=document.querySelectorAll("select");
    let param="";
    addEventOnElements(dropdowns,"change",()=>{
        document.querySelector(".grid-list").innerHTML=``;
        dropdowns.forEach((select)=>{
                param+=select.value
        })
        fetchData(URL.discover(`${urlParam}${param}`,currentPage),({results:movieList,total_pages})=>{
            totalPages = total_pages;
            currentPage =1;
            for (const movie of movieList){
                const movieCard = createMovieCard(movie);
                if(movieCard)
                    movieListElem.querySelector(".grid-list").appendChild(movieCard);
            }
            pageContent.appendChild(movieListElem);
        })
    })
    param="";
})
search();