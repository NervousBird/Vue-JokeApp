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
    <Transition name="fade">
      <RouterView />
    </Transition>
  </div>
  
  <Footer />
</template>

<style scoped>
.router-view {
  min-height: 70vh;
}

nav {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
  gap: 60px;
  background-color: color-mix(in srgb, var(--primary), var(--background)50%);
  box-shadow: -1px -1px 8px 1px color-mix(in srgb, var(--text), var(--background)70%);
  padding: 20px;
  margin-bottom: 30px;
  
}

.routerLink {
  color: var(--text);
  background-color: transparent;
  text-decoration: none;
  transition: scale 0.1s ease-in-out;
}

.routerLink:hover {
  scale: 1.05;
  color: var(--secondary);
  transition: scale 0.1s ease-in-out;
}

.fade-move,
.fade-enter-active,
.fade-leave-active {
    transition: all 5s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

</style>
