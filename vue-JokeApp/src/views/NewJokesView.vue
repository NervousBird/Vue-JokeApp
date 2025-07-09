<script setup lang="ts">
import JokeFilters from '@/components/JokeFilters.vue';
import JokeSaveData from '@/components/JokeSaveData.vue';
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
const favouritesArray = ref<IFavourite[]>([])
const storedFavourites = localStorage.getItem('favourites')
const favourite = ref(false)
const ratingTotal = ref(5)
const jokeRating = ref(0)

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

// // Everything below should be moved onto a component?
// const loadFavouriteStorage = () => {
//     if(storedFavourites && storedFavourites !== 'undefined') {
//         try {
//             favouritesArray.value = JSON.parse(storedFavourites)
//         } catch(error) {
//             console.log('Error parsing localStorage "favouritesArray:"', error)
//             localStorage.removeItem('favourites')
//         }
//     }
// }

// // Change this to check whether the item in the local storage has {favourite: true}, not just if it exists
// const checkFavourite = (jokeData: IJoke) => {
//     let favouritesIDs = <number[]>([])
//     favouritesArray.value.forEach((fav: IFavourite) => {
//         favouritesIDs.push(fav.id)
//     })
//     if(favouritesIDs.includes(jokeData.id)) {
//         favourite.value = true
//     } else {
//         favourite.value = false
//     }
// }

// // 
// const addToFavourites = (jokeData: IJoke) => {
//     // Set up an array with just the ids to easily check the info we wanna check
//     let favouritesIDs = <number[]>([])
//     favouritesArray.value.forEach((fav: IFavourite) => {
//         favouritesIDs.push(fav.id)
//     })
//     // Don't need, just hide when there is no joke loaded
//     // if(jokeData === undefined) {
//     //     return alert('Load a joke first.')
//     // }
//     if(!favouritesIDs.includes(jokeData.id)) {
//         favouritesArray.value.push({
//             id: jokeData.id, 
//             rating: jokeRating.value, 
//             favourite: true,
//         })
//         localStorage.setItem('favourites', JSON.stringify(favouritesArray.value))
//         checkFavourite(jokeData)
//     } else {
//         // Change this to just edit the data to {favourite: false} instead of removing it
//         favouritesArray.value = favouritesArray.value.filter((savedJoke: IFavourite) => savedJoke.id !== jokeData.id)
//         localStorage.setItem('favourites', JSON.stringify(favouritesArray.value))
//         checkFavourite(jokeData)
//     }
// }

// const setRating = (star: number, jokeData: IJoke) => {
//     jokeRating.value = star
//     // Run a check here to see if information has been stored already, update OR add to the list
//     // Will have to have a similar check for adding to favourites, so it can update??
//     let favouritesIDs = <number[]>([])
//     favouritesArray.value.forEach((fav: IFavourite) => {
//         favouritesIDs.push(fav.id)
//     })
//     if(!favouritesIDs.includes(jokeData.id)) {
//         // Edit the data in the array and ONLY update the rating system
//     } else {
//         favouritesArray.value.push({
//             id: jokeData.id, 
//             rating: jokeRating.value, 
//             favourite: false,
//         })
//     }
// }

// // Write a function that removes jokes with NO favourite and NO rating (probably not even possible to remove the rating?)

// // Expand this to update when loading a new joke (load the correct rating as well)
// watch(jokeData, () => {
//     checkFavourite(jokeData)
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
      <h4>{{ favourite }}</h4>
      <button @click="fetchData">New Joke!</button>
    </div>
    <div>
        <JokeSaveData v-if="jokeData" :joke-data="jokeData" />
    </div>
    <!-- <div v-if="jokeData">
        <span v-for="star in ratingTotal" :key="star" class="star" :class="{ filled: star <= jokeRating }" @click="setRating(star, jokeData)">★</span>
    </div>
    <div v-if="jokeData">
      <button v-if="!favourite" @click="addToFavourites(jokeData)">I love this!</button>
      <button v-if="favourite" @click="addToFavourites(jokeData)">Get this outta here!</button>
    </div> -->
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