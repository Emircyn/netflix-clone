<script>
import axios from 'axios';

export default{
    
        data(){
            return{
                isActive:false,
                query: '',
                 results: '',
                 id:'',
                 type:null
                
                
            }
        },
        
        methods:{
            active:function(){
                this.isActive=true;

            },
            close:function(){
                this.isActive=false;

            },
              clearSearch() {
                  this.query = ''
                 this.results = []
                 },
            getResultMovie(query) {
                
                axios.get('https://api.themoviedb.org/3/search/multi?api_key=2f0516d4c4cae0ead0b0ee842e6c6da4&language=en-US&page=1&include_adult=false&query='+ query).then(response => { 
                    this.results = response.data.results;
                    this.id=this.results.id;
                    console.log(response.data.results);
                    
                    
                    
                   
                    
                    
                
                })
                
   },
   movieDetailsPath() {
      return `/${this.type}/`;
    },
    

        }

    }
</script>
<template>

    <div class="search-box" v-bind:class="{ active: isActive }">
        <div class="icon" @click="active()">
            <i class='bx bx-search-alt-2'></i>
        </div>
        <div class="input">
            <input  v-model='query' @keyup='getResultMovie(query)' type="text" name="search" id="search" placeholeder="Type Search">
        </div>
        <div class="close" @click="clearSearch()">
            <i @click="close()" class='bx bx-x'></i>
        </div>
    <div class="search-list">
        <div v-for='result in results' :key='result' class="search-item">
            
            <a v-if="result.media_type=='tv'||result.media_type=='movie'" :href="movieDetailsPath()+result.id" @click="result=null" >
                <p v-if="result.media_type!='person'" >{{type=result.media_type}}</p>
                <p>{{result.title}}</p>
                <p v-if="result.media_type=='person'">{{result.name}}</p>
                 <img v-if="result.media_type=='person'&&result.profile_path!=null"  v-bind:src="'http://image.tmdb.org/t/p/original/'+result.profile_path"  />
                <img v-if="result.poster_path!=null"  v-bind:src="'http://image.tmdb.org/t/p/original/'+result.poster_path"  /> 
                <img v-if="result.poster_path==null || result.profile_path==null"  src="https://upload.kabasakalonline.com/kabasakal/ilan/2021-08/netflix-ultra-hd-hesap-639395-2021-08-05-19-1.png"  /> 
                
            </a>
        </div>
    </div>
       
    </div>
   </template> 