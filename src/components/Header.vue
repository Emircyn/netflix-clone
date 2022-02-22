<script setup>
import Search from "./Search.vue";

</script>


<template>
 <nav id="navbar" class="sticky">
        <div class="left-side">
            <div class="logo margin-i-2">
                <RouterLink to="/"><img  src="https://www.freepnglogos.com/uploads/netflix-logo-0.png" width="100" alt="Logo" /></RouterLink>
            </div>
            <div class="menu">
                <ul>
                    <li><RouterLink class="menu-link" to="/">Home</RouterLink></li>
                    <li><RouterLink class="menu-link" to="/tv-series">Tv Series</RouterLink></li>
                    <li><RouterLink class="menu-link" to="/movies">Movies</RouterLink></li>
                </ul>
            </div>
        </div>
        <div class="right-side">
           <Search />
        </div>
    </nav>
    <div class="mobile-menu">
        <ul>
            <li><RouterLink class="menu-link" to="/"><i class='bx bx-home-alt'></i><span>Home</span></RouterLink></li>
            <li><RouterLink class="menu-link" to="/tv-series"><i class='bx bx-tv' ></i><span>Tv Series</span></RouterLink></li>
            <li><RouterLink class="menu-link" to="/movies"><i class='bx bx-camera-movie' ></i><span>Movies</span></RouterLink></li>
        </ul>
    </div>
</template>
<style>
.menu .active{
    color:#E50914;
    font-weight: 600;
    opacity: 1 !important;
}
.mobile-menu .active{
    background-color:#E50914;
    color: #fff;
    font-weight: 600;
    opacity: 1 !important;
}
</style>