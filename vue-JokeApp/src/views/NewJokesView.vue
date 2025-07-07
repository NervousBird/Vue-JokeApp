<script setup lang="ts">
import JokeFilters from '@/components/JokeFilters.vue';
import type { IFavourite } from '@/favourite';
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
const jokeData = ref<IJoke>()
const favouritesArray = ref([])
const storedFavourites = localStorage.getItem('favourites')
const favourite = ref(false)
const jokeRating = ref([])

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

const loadFavouriteStorage = () => {
    if(storedFavourites && storedFavourites !== 'undefined') {
        try {
            favouritesArray.value = JSON.parse(storedFavourites)
        } catch(error) {
            console.log('Error parsing localStorage "favouritesArray:"', error)
            localStorage.removeItem('favourites')
        }
    }
}

const checkFavourite = () => {
    if(favouritesArray.value.includes(jokeData.value.id)) {
        favourite.value = true
    } else {
        favourite.value = false
    }
}

const addToFavourites = () => {
    if(jokeData.value === undefined) {
        return alert('Load a joke first.')
    }
    if(!favouritesArray.value.includes(jokeData.value.id)) {
        favouritesArray.value.push(jokeData.value.id)
        localStorage.setItem('favourites', JSON.stringify(favouritesArray.value))
        checkFavourite()
    } else {
        favouritesArray.value = favouritesArray.value.filter((number: number) => number !== jokeData.value.id)
        localStorage.setItem('favourites', JSON.stringify(favouritesArray.value))
        checkFavourite()
    }
}

const updateRanking = () => {

}

watch(jokeData, () => {
    checkFavourite()
})

onMounted(loadFavouriteStorage)

</script>

<template>
    <div>
        <h1>New Jokes!</h1>
    </div>
    <!-- Joke filter here -->
    <JokeFilters @update-filters="updateFilter" />
    <!--  -->
    <div>
      <h3>{{ jokeData?.setup }}</h3>
      <h3>{{ jokeData?.delivery }}</h3>
      <h3>{{ jokeData?.joke }}</h3>
      <h4>{{ favourite }}</h4>
      <form @change="updateRanking">
        <input type="checkbox" name="ranking1" v-model="jokeRating">
        <input type="checkbox" name="ranking2" v-model="jokeRating">
        <input type="checkbox" name="ranking3" v-model="jokeRating">
        <input type="checkbox" name="ranking4" v-model="jokeRating">
        <input type="checkbox" name="ranking5" v-model="jokeRating">
      </form>
      <button @click="addToFavourites">I love this!</button>
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