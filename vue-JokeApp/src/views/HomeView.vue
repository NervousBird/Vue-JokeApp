<script setup lang="ts">
import { ref } from 'vue';

const info = ref(null)

const getInfo = () => {
  fetch('https://v2.jokeapi.dev/info')
    .then(response => response.json())
    .then(data => info.value = data)
}

</script>

<template>
  <main>
    <h1>Home!</h1>
  </main>
  <div class="container">
    <div class="container-overview">

    </div>
    <div class="container-links">

    </div>
  </div>
</template>

<style scoped>

</style>
