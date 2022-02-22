<template>

  <div class="swiper-grid">
    
      <div class="swiper-column">
        <a class="swiper-header" v-if="typeFilm=='movie'" href="#">Netflix'te Popüler Filmler</a>
        <a class="swiper-header" v-if="typeFilm=='tv'" href="#">Netflix'te Popüler Diziler</a>
               <swiper
            :slidesPerView="6"
            :spaceBetween="10"
            :breakpoints="swiperOptions.breakpoints"
            :navigation="true"
            :modules="modules"
            class="mySwiper"
        >
        
          <swiper-slide   v-for="(item, index) in movie" :key="index" :style="{backgroundImage: 'url(' + this.imagesUrl+item.poster_path + ')' }" :class = "(load)?'skeleton':''" >
             
            
                <div class="swiper-content">
                    <h5 class="content-title" v-if="typeDiscover=='trending'" style="text-transform: capitalize;">{{item.media_type}}</h5>
                    <h5 class="content-title" v-if="typeDiscover=='discover'" style="text-transform: capitalize;">{{typeFilm}}</h5>
                    <p class="content" v-if="typeFilm=='movie'">{{item.title}}</p>
                    <p class="content" v-if="typeFilm=='tv'">{{item.name}}</p>
                </div>
                <div class="swiper-button">
                  <RouterLink v-if="typeFilm=='movie'"  class="button-rounded"  :to="movieDetailsPath()+item.id" ><i class='bx bx-play' ></i></RouterLink>
                    <RouterLink v-if="typeFilm=='tv'"  class="button-rounded"  :to="movieDetailsPath()+item.id" ><i class='bx bx-play' ></i></RouterLink>
                </div>
                <div class="swiper-content-bottom">
                  <div class="left-side">
                    <p><i class='bx bxs-like' ></i>&nbsp;{{item.vote_count}}</p>
                  </div>
                  <div class="right-side">
                      <i class='bx bxl-imdb'></i>&nbsp;{{item.vote_average}}
                  </div>
                </div>
             
            </swiper-slide>
            
           </swiper>
          </div>
        </div>
</template>
<script>

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import axios from 'axios';



// Import Swiper styles
import "swiper/css";

import "swiper/css/navigation";



// import required modules
import { Navigation } from "swiper";


export default {

  props: {
  	typeFilm: {
      typeFilm: String,
      required: true,
  	},
      typeDiscover: {
      typeDiscover: String,
      required: true,
  	},
       pages: {
      pages: Number,
      required: true,
  	},
  	
  },
    components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Navigation],
    };
  },
  
     data () {
      return { 
          
          movie:[],
          trend:'/'+this.typeDiscover+'/'+this.typeFilm+'/week?',
          discoverUrl:'/'+this.typeDiscover+'/'+this.typeFilm+'?',
           baseUrl:'https://api.themoviedb.org/3',
           apiKey:'api_key=2f0516d4c4cae0ead0b0ee842e6c6da4',
           load:true,
         
           imagesUrl:'https://image.tmdb.org/t/p/original',
           
           discoverUrl2:'&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page='+this.pages+'&with_watch_monetization_types=flatrate',
           swiperOptions: {
          breakpoints: {    
            0: {
              slidesPerView: 2,
              spaceBetween: 10
            },  
      420: {       
         slidesPerView: 2,
         spaceBetween: 10     
      },          
      560: {       
         slidesPerView: 3,       
         spaceBetween: 10     
      },   
  
      1024: {       
         slidesPerView: 5,       
         spaceBetween: 10     
      },
      1366: {
        slidesPerView: 7,
        spaceBetween: 10
      }
   }   
        }
      }
    },
    mounted() {
              
            if(this.typeDiscover=='discover'){
               
                axios.get(this.baseUrl+this.discoverUrl+this.apiKey+this.discoverUrl2)
            .then(response => {
             
               
                this.movie = response.data.results;
                
                
                setTimeout(() => { this.load=false;}, 1500);
               
                
               
               
            })
            .catch(e => {
              this.error=true;
              

            })
           
            }
           
            else{
                axios.get(this.baseUrl+this.trend+this.apiKey)
            .then(response => {
             
                 
               
                  setTimeout(() => { this.movie = response.data.results; }, 1000);
                
               
                
                
            })
            .catch(e => {
              this.error=true;
              

            })
            .finally(() => this.load = false);
            }
               
          },
          methods:{
              UrlTitle: function (title) {
                 
        return title.toString()               // Convert to string
        .normalize('NFD')               // Change diacritics
        .replace(/[\u0300-\u036f]/g,'') // Remove illegal characters
        .replace(/\s+/g,'-')            // Change whitespace to dashes
        .toLowerCase()                  // Change to lowercase
        .replace(/&/g,'-and-')          // Replace ampersand
        .replace(/[^a-z0-9\-]/g,'')     // Remove anything that is not a letter, number or dash
        .replace(/-+/g,'-')             // Remove duplicate dashes
        .replace(/^-*/,'')              // Remove starting dashes
        .replace(/-*$/,'');             // Remove trailing dashes
        
},
      movieDetailsPath() {
      return `/${this.typeFilm}/`;
    },

          }

}
</script>
