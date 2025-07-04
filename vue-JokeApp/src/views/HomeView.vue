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
  <div>
    <p>{{ info }}</p>
    <button @click="getInfo">GetInfo</button>
  </div>
</template>

<style scoped>

</style>
