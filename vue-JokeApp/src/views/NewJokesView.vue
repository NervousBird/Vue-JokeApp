<script setup lang="ts">
import JokeFilters from '@/components/JokeFilters.vue';
import type { IJoke } from '@/joke';
import { onMounted, ref, watch } from 'vue';


// LEAVE THESE EMPTY to ignore
// https://v2.jokeapi.dev/joke/Any << will get ANY joke in english by default
// category = ["Any","Programming","Miscellaneous","Dark","Pun","Spooky","Christmas"]
// .../joke/Misc,Programming?
// flags = {nsfw,religious,political,racist,sexist,explicit}
// .../joke/Any?blacklistFlags=nsfw,racist,explicit
// ?lang= cs, de, en, es, fr, pt
// ?type= single, twopart (leave empty for both)
// ?contains=string (only jokes containing this string)
// idRange=number[-number] (0-55)
// ?amount=number (how many jokes do we want returned? (only ever 1 for now?))
// safe-mode (&safe-mode)
// error: if there is an error
// format=json (only use this)

// Example: .../joke/Programming?blacklistFlags=nsfw&type=twopart
//            {category} ? blacklistFlags= {flags} & type= {type} (ignore format)

const filterString = ref('')
const jokeData = ref<IJoke>();

const updateFilter = (info: any) => {
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

</script>

<template>
    <div>
        <h1>New Jokes!</h1>
    </div>
    <!-- Joke filter here -->
    <JokeFilters @update-filters="updateFilter" />
    <!--  -->
    <div>
      <p>{{ jokeData?.setup }}</p>
      <p>{{ jokeData?.delivery }}</p>
      <p>{{ jokeData?.joke }}</p>
      <p>{{ jokeData?.category }}</p>
      <!-- <p>{{ jokeData?.flags.racist }}</p> -->
      <button @click="fetchData">New Joke!</button>
    </div>
</template>

<style scoped>

form {
    display: flex;
    flex-direction: row;
    gap: 10px;
}

</style>