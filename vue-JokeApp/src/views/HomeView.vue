<script setup lang="ts">
import { ref } from 'vue';

const jokeData = ref(null);

// Simple GET request using fetch
const fetchData = () => {
  fetch('https://v2.jokeapi.dev/joke/Any?format=json')
    .then(response => response.json())
    .then(data => jokeData.value = data.setup + data.delivery);
}

</script>

<template>
  <main>
    <h1>Home!</h1>

    <div>
      <p>{{ jokeData }}</p>
      <button @click="fetchData">Get API Info</button>
    </div>
  </main>
</template>
