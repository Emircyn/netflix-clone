<template>
        <div class="content-grid" :style="{backgroundImage: 'url(' + imagesUrl+movie.backdrop_path+ ')' }">
            <div class="content">
                <div class="img">
                    <img :src="imagesUrl+movie.poster_path" draggable="false" />
                       <button class="button button-more margin-i-auto"><span><a target="_blank" :href="movie.homepage">Homepage</a></span></button>
                </div>
                <div class="content-txt">
                    <h1>{{movie.title}}{{movie.name}}</h1>
                    <p>{{movie.overview}}</p>
                    
                </div>
             
            </div>
        </div>
<div class="container">
    <div class="view-element">
        <h2>the lead actors</h2>
        <swiper
            :navigation="true"
            :slidesPerView="7"
            :spaceBetween="10"
             :breakpoints="swiperOptions.breakpoints"
            :modules="modules"
            class="mySwiper"
        >
            <swiper-slide v-for="item in cast" :key="item" :style="{backgroundImage: 'url(' + imagesUrl+item.profile_path + ')' }" >
              <div class="actors-content">
                <h2>{{item.name}}</h2>
              </div>
            </swiper-slide>
            
            
        </swiper>
        
    </div>
    <div class="view-element">
        <h2>{{name}}</h2>
        <iframe width="100%" height="auto" :src="link" :title="movie.name || movie.title"  frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    <div class="view-element">
        <h2>Current Season</h2>
        <div class="about">
          <div :style="{backgroundImage: 'url(' + imagesUrl+movie.backdrop_path + ')' }" class="img">
          </div>
          <div class="content">
            <h2 v-if="this.$route.matched[0].name=='tvDetail'" class="header">{{seasons}} Sezon</h2>
            <h2 v-if="this.$route.matched[0].name=='movieDetail'" class="header">{{movie.title}}</h2>
             <p class="about-small-header">{{tur}}</p>
             <p v-if="this.$route.matched[0].name=='movieDetail'" class="about-small-header">{{movie.release_date}} | {{movie.runtime}}  Dk</p>
             <p v-if="this.$route.matched[0].name=='tvDetail'" class="about-small-header">{{movie.last_air_date}} | {{dk}} Dk</p>
            <p class="about-txt">{{movie.tagline}}</p>
            <p v-if="this.$route.matched[0].name=='tvDetail'" class="about-txt">{{movie.name}} ilk gösterim tarihi: {{movie.last_air_date}} </p>
          </div>
        </div>
    </div>
</div>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper";
import axios from 'axios';

export default {
     
  components: {
    Swiper,
    SwiperSlide,
  },
  data () {
      return {
          
           id:null,
           tur:null,
           seasons:null,
           type:null,
           dk:null,
           name:null,
           id2:null,
           number:null,
           movie:[],
           videos:[],
           link:null,
           cast:[],
            baseUrl:'https://api.themoviedb.org/3',
           apiKey:'api_key=2f0516d4c4cae0ead0b0ee842e6c6da4',
            imagesUrl:'https://image.tmdb.org/t/p/original',  
          swiperOptions: {
              breakpoints: {    
            0: {
              slidesPerView: 1,
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
  created(){
                this.id2=this.$route.params.id;
                this.id=this.$route.href;
                
                console.log(this.id);
     
              
              
               axios.get(this.baseUrl+this.id+'?'+this.apiKey+'&language=en-US')
            .then(response => {
              // JSON responses are automatically parsed.

                this.movie = response.data;
                console.log(response.data);
                this.tur=this.movie.genres[0].name;
                this.dk=this.movie.episode_run_time[0];
                this.seasons=response.data.seasons.length;
                
               
                
               
               
            })
            .catch(e => {
              this.error=true;
              

            })
            .finally(() => this.load = false);
           
            axios.get(this.baseUrl+this.id+'/credits?'+this.apiKey+'&language=en-US')
            .then(response => {
              // JSON responses are automatically parsed.

                //this.movie = response.data;
                this.cast = response.data.cast;
                 
                
               
                
               
                
               
               
            })
            .catch(e => {
              this.error=true;
              

            })
            .finally(() => this.load = false);
             axios.get(this.baseUrl+this.id+'/videos?'+this.apiKey+'&append_to_response=videos')
                .then(response => {
                        
                  this.videos=response.data.results;
                  this.picker();
                  this.link='https://www.youtube.com/embed/' + this.videos[this.number].key+'?vq=hd1080';
                  this.name=this.videos[this.number].name;
                  console.log(response.data.results);


              
                
                
                
            })
                
            
            .catch(e => {
              this.error=true;
              

            })
           
           
          
               

      
  },
  methods:{
       picker: function(){
      
        var chosenNumber = Math.floor(Math.random() * this.videos.length);
        this.number = chosenNumber;
    
  },
  },
  setup() {
    return {
      modules: [Navigation],
    };
  },
};
</script>
