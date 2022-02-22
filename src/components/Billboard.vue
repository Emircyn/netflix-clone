<template>
  
    <div  class="billboard" :style="{ backgroundImage: 'url(' + imagesUrl+oneMovieImages+ ')' }" >
       <iframe
       
        v-if="videoplay&&!isMobile()"
        :src="link+ismuted"
        class="billboard"
        style="z-index:0"
        type="application/pdf"
        frameborder="0"
        allowfullscreen
        allow="autoplay"
        
      ></iframe>
        <div class="billboard-content" >
           
            <h1>{{oneMovieName}}</h1>
          
            
          <Transition  name="slide-fade"><p v-if="!show&&!isMobile()" >{{oneMovieDes}}</p></Transition>
            
            <div class="billboard-buttons">
                <button class="button button-white margin-r-05"><i class='bx bxs-right-arrow' ></i>&nbsp;Play</button>
                <RouterLink    :to="movieDetailsPath()+oneMovieId" > <button class="button button-gray margin-r-05"><i class='bx bx-info-circle'></i>&nbsp;Read more</button></RouterLink>
                <button  v-if="videoplay&&!isMobile()" @click="sound()" class="button button-gray margin-r-05"><i v-if="ses" class='bx bx-volume-full' ></i><i v-if="!ses" class='bx bx-volume-mute' ></i></button>
                <button v-if="reload&&!isMobile()" @click="play()" class="button button-gray"><i class='bx bx-refresh'></i></button>
                  
            </div>
        </div>
        <div class="billboard-overlay"></div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
  props: {
  	typeFilm: {
      typeFilm: String,
      required: true,
  	},
    
  	
  },
  data () {
      return { 
          
          movie:[],
          randomMoive:null,
          trend:'/trending/'+this.typeFilm+'/week?',
           baseUrl:'https://api.themoviedb.org/3',
           apiKey:'api_key=2f0516d4c4cae0ead0b0ee842e6c6da4',
           imagesUrl:'https://image.tmdb.org/t/p/original',
           randomMoive:null,
           oneMovieImages:null,
            oneMovie:null,
            oneMovieName:null,
            oneMovieDes:null,
            videoplay:false,
            number:null,
            videos:null,
            link:null,
            reload:false,
            ses:false,
            ismuted:1,
            show:false,
            oneMovieId:null

          
           
           
    }
  },
 created() {
            
              this.randomMoive = Math.floor(Math.random() * 20);
             
                axios.get(this.baseUrl+this.trend+this.apiKey)
            .then(response => {
              // JSON responses are automatically parsed.
              
                this.movie = response.data.results;
                console.log(response.data.results);
                this.oneMovie=this.movie[this.randomMoive];
                this.oneMovieId=this.movie[this.randomMoive].id;
                this.oneMovieDes=this.movie[this.randomMoive].overview;
                if(this.typeFilm=='tv'){this.oneMovieName=this.movie[this.randomMoive].name;}
                else{this.oneMovieName=this.movie[this.randomMoive].title;}
                
                this.oneMovieImages=this.movie[this.randomMoive].backdrop_path;
              
                axios.get(this.baseUrl+'/'+this.typeFilm+'/'+this.oneMovie.id+'/videos?'+this.apiKey+'&append_to_response=videos')
                .then(response => {
                  this.videos=response.data.results;
              console.log(response.data.results);
              this.picker();
              this.link='https://www.youtube.com/embed/' + this.videos[this.number].key+'?vq=hd1080&autoplay=1&controls=0&mute=';
                setTimeout(() => { this.videoplay=true}, 6500);
                setTimeout(() => { this.show=true }, 7500);
                
                
                setTimeout(() => { this.videoplay=false; this.reload=true;this.show=false }, 35000);

              
                
                
                
            })
                
            })
            .catch(e => {
              this.error=true;
              

            })
           
           
            
          },
           methods: {
  picker: function(){
      
        var chosenNumber = Math.floor(Math.random() * this.videos.length);
        this.number = chosenNumber;
    
  },
  sound: function(){
      if(this.ismuted){
          this.muted=0;
          this.ses=true;
          this.ismuted=false;
      }
      else{
          this.muted=1;
          this.ses=false;
           this.ismuted=true;
      }
     

     
      },
       play: function(){
      if(this.reload){
         this.videoplay=true;
         this.reload=false;
         setTimeout(() => { this.videoplay=false; this.reload=true; }, 35000);}
      else{
          this.videoplay=false;
          this.reload=true;
          setTimeout(() => { this.videoplay=true; this.reload=false; }, 35000);
          }
       },
       movieDetailsPath() {
      return `/${this.typeFilm}/`;
    },
       isMobile() {
   if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
     return true
   } else {
     return false
   }
   
 }
      
      
      
  
           }

}
</script>
