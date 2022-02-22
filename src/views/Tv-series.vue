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
            syf:3
        }
    },
    methods:{
        daha:function(){
          this.syf+=2;
        }
    }
  }

    </script>
<template>
<Billboard type-film="tv" />
<Swiper  v-for="item in this.syf" :key="item" type-film="tv" typeDiscover="discover" :pages="item" />
<button @click="daha()" class="button button-more margin-i-auto"><span><i class='bx bx-down-arrow-alt' ></i>&nbsp;More</span></button>


</template>