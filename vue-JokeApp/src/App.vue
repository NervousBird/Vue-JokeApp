<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink class="routerLink" to="/">Home</RouterLink>
        <RouterLink class="routerLink" to="/newjokes">New Jokes!</RouterLink>
        <RouterLink class="routerLink" to="/favourites">Favourites</RouterLink>
        <RouterLink class="routerLink" to="/myjokes">My Jokes!</RouterLink>
        <RouterLink class="routerLink" to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <div class="router-view">
    <RouterView />
  </div>
  
  <Footer />
</template>

<style scoped>
.router-view {
  min-height: 75vh;
}

.routerLink {
  color: var(--text);
  background-color: transparent;
  text-decoration: none;
  transition: color 0.2s ease-in-out;
}

.routerLink:hover {
  color: var(--judgement);
  transition: color 0.2s ease-in-out;
}

@media screen and (max-width: 1000px) {
  nav {
    display: flex;
    flex-direction: row;
    background-color: transparent;
    gap: 2vw;
  }
}

</style>
