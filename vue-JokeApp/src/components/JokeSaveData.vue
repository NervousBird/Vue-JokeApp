<script setup lang="ts">
import type { IFavourite } from '@/favourite';
import type { IJoke } from '@/joke';
import { onMounted, ref, watch } from 'vue';

const props = defineProps<{
  jokeData: IJoke
}>()

// const jokeData = ref<IJoke>()
const favouritesArray = ref<IFavourite[]>([])
const storedFavourites = localStorage.getItem('favourites')
const favourite = ref(false)
const ratingTotal = ref(5)
const jokeRating = ref(0)

// Everything below should be moved onto a component?
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

// Change this to check whether the item in the local storage has {favourite: true}, not just if it exists
const checkFavourite = (jokeData: IJoke) => {
    let favouritesIDs = <number[]>([])
    favouritesArray.value.forEach((fav: IFavourite) => {
        favouritesIDs.push(fav.id)
    })
    if(favouritesIDs.includes(jokeData.id)) {
        favourite.value = true
    } else {
        favourite.value = false
    }
}

// 
const addToFavourites = (jokeData: IJoke) => {
    // Set up an array with just the ids to easily check the info we wanna check
    let favouritesIDs = <number[]>([])
    favouritesArray.value.forEach((fav: IFavourite) => {
        favouritesIDs.push(fav.id)
    })
    // Add to save array only if it doesn't already exist
    if(!favouritesIDs.includes(jokeData.id)) {
        favouritesArray.value.push({
            id: jokeData.id, 
            rating: jokeRating.value, 
            favourite: true,
        })
        localStorage.setItem('favourites', JSON.stringify(favouritesArray.value))
        checkFavourite(jokeData)
    } else {
        // Change this to just edit the data to {favourite: false} instead of removing it
        favouritesArray.value = favouritesArray.value.filter((savedJoke: IFavourite) => savedJoke.id !== jokeData.id)
        localStorage.setItem('favourites', JSON.stringify(favouritesArray.value))
        checkFavourite(jokeData)
    }
}

const setRating = (star: number, jokeData: IJoke) => {
    jokeRating.value = star
    // Run a check here to see if information has been stored already, update OR add to the list
    // Will have to have a similar check for adding to favourites, so it can update??
    let favouritesIDs = <number[]>([])
    favouritesArray.value.forEach((fav: IFavourite) => {
        favouritesIDs.push(fav.id)
    })
    if(!favouritesIDs.includes(jokeData.id)) {
        // Edit the data in the array and ONLY update the rating system
    } else {
        favouritesArray.value.push({
            id: jokeData.id, 
            rating: jokeRating.value, 
            favourite: false,
        })
    }
}

// Write a function that removes jokes with NO favourite and NO rating (probably not even possible to remove the rating?)

// Expand this to update when loading a new joke (load the correct rating as well)
watch(props.jokeData, () => {
    checkFavourite(jokeData)
})

onMounted(loadFavouriteStorage)

</script>

<template>
    <div>
    <!-- ratingTotal needs to be a prop, as well as the jokeRating, also an emit function to update on the parent -->
        <span v-for="star in ratingTotal" :key="star" class="star" :class="{ filled: star <= jokeRating }" @click="setRating(star, jokeData)">★</span>
    </div>
    <div>
      <button v-if="!favourite" @click="addToFavourites(props.jokeData)">I love this!</button>
      <button v-if="favourite" @click="addToFavourites(props.jokeData)">Get this outta here!</button>
    </div>
</template>

<style scoped>

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