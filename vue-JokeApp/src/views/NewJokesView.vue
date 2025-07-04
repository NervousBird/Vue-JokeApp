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

const categoryString = ref([])

const changeString = () => {
    if(searchString.value === 'Any') {
        searchString.value = 'Programming'
    } else {
        searchString.value = 'Any'
    }
}

const setCategoryString = () => {
    categoryString.value.toString()
}

const fetchData = () => {
    //.../joke/({category}?)({blacklistFlags={flags}}&)type={type}
if(categoryString.value.toString() === '') {
    categoryString.value.push('Any')
}
  fetch(`https://v2.jokeapi.dev/joke/${categoryString.value.toString()}`)
    .then(response => response.json())
    .then(data => jokeData.value = data)
}

</script>

<template>
    <div>
        <h1>New Jokes!</h1>
    </div>
    <!-- Joke filter here -->
    <form>
        <!-- Just need to make a function to print the right string -->
        <label for="any">Any</label>
        <input type="checkbox" name="any" value="Any" v-model="categoryString">
        <label for="programming">Programming</label>
        <input type="checkbox" name="programming" value="Programming" v-model="categoryString">
        <label for="miscellaneous">Miscellaneous</label>
        <input type="checkbox" name="miscellaneous" value="Miscellaneous" v-model="categoryString">
        <label for="dark">Dark</label>
        <input type="checkbox" name="dark" value="Dark" v-model="categoryString">
        <label for="pun">Pun</label>
        <input type="checkbox" name="pun" value="Pun" v-model="categoryString">
        <label for="spooky">Spooky</label>
        <input type="checkbox" name="spooky" value="Spooky" v-model="categoryString">
        <label for="christmas">Christmas</label>
        <input type="checkbox" name="christmas" value="Christmas" v-model="categoryString">
    </form>
    <!--  -->
    <p>{{ categoryString.toString() }}</p>
    <div>
      <p>{{ jokeData?.setup }}</p>
      <p>{{ jokeData?.delivery }}</p>
      <p>{{ jokeData?.joke }}</p>
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