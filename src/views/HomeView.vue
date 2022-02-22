<script setup>
import Swiper from "@/components/Swiper.vue";
import Billboard from "@/components/Billboard.vue";

</script>
<script>
export default {
    data(){
        return{
            randomType:null,
            pages:1,
            syf:8
        }
    },
    created(){
        let a=Math.floor(Math.random() * 2);
        if(a==0){
            this.randomType='movie';
        }
        else{
             this.randomType='tv';
        }
        
        
    },
   
    
    
}

    </script>

<template>
 <Billboard :type-film="this.randomType" />
 <Swiper type-film="movie" typeDiscover="trending" pages="1" />
 <Swiper type-film="tv"  typeDiscover="trending" pages="2" />
 <Swiper v-for="item in this.syf" :key="item" :type-film="this.randomType" typeDiscover="discover" :pages="item" />

 

 

 

 

</template>
