<script setup lang="ts">
import type { IJoke } from '@/joke';
import { ref } from 'vue';

const jokeData = ref<IJoke>();
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

// Simple GET request using fetch
const searchString = ref('Any')

const changeString = () => {
    if(searchString.value === 'Any') {
        searchString.value = 'Programming'
    } else {
        searchString.value = 'Any'
    }
}

const fetchData = () => {
    //.../joke/({category}?)({blacklistFlags={flags}}&)type={type}
  fetch(`https://v2.jokeapi.dev/joke/${searchString.value}`)
    .then(response => response.json())
    .then(data => jokeData.value = data)
}

</script>

<template>

    <div>
        <h1>New Jokes!</h1>
    </div>
    <form>
        <!-- Just need to make a function to print the right string -->
        <label for="any">Search only Programming</label>
        <input type="checkbox" name="any" @click="changeString">
    </form>
    <div>
      <p>{{ jokeData?.setup }}</p>
      <p>{{ jokeData?.delivery }}</p>
      <p>{{ jokeData?.joke }}</p>
      <!-- <p>{{ jokeData?.flags.racist }}</p> -->
      <button @click="fetchData">New Joke!</button>
    </div>

</template>

<style scoped>

</style>