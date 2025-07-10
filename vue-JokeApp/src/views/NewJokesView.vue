<script setup lang="ts">
import JokeFilters from '@/components/JokeFilters.vue';
import JokeSaveData from '@/components/JokeSaveData.vue';
import type { IJoke } from '@/joke';
import { ref, watch } from 'vue';

const filterString = ref('')
const jokeData = ref<IJoke>()

const updateFilter = (info: string) => {
    filterString.value = info
}

// Simple GET request using fetch
const fetchData = () => {
    //.../joke/({category}?)({blacklistFlags={flags}}&)type={type}
    // Need to create a 'catch' function for the filters
    fetch(`https://v2.jokeapi.dev/joke/${filterString.value}`)
        .then(response => response.json())
        .then(data => jokeData.value = data)
}

// watch(jokeData, () => {
//     jokeData.value = jokeData.value
// })

// onMounted(loadFavouriteStorage)

</script>

<template>
    <div>
        <h1>New Jokes!</h1>
    </div>
     <div>
        <JokeFilters @update-filters="updateFilter" />
     </div>
    <div>
      <h3>{{ jokeData?.setup }}</h3>
      <h3>{{ jokeData?.delivery }}</h3>
      <h3>{{ jokeData?.joke }}</h3>
      <h3>{{ jokeData?.id }}</h3>
      <!-- <h4>{{ favourite }}</h4> -->
      <button @click="fetchData">New Joke!</button>
    </div>
    <div>
        <JokeSaveData v-if="jokeData" :joke-data="jokeData" />
    </div>
</template>

<style scoped>

form {
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.star {
    cursor: pointer;
    font-size: 30px;
}

.star.filled {
    color: orange;
}

.star:hover {
    color: blue;
}

</style>