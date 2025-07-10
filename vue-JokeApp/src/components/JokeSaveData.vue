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
// also check for the rating
const checkSavedInfo = (jokeData: IJoke) => {
    const favouritesIDs = favouritesArray.value.map(item => item.id)
    if(favouritesIDs.includes(jokeData.id)) {
        const index = favouritesArray.value.findIndex((favourite) => favourite.id === jokeData.id)
        favourite.value = favouritesArray.value[index].favourite || false
        jokeRating.value = favouritesArray.value[index].rating || 0
    }
}

const toggleFavourite = (jokeData: IJoke) => {
    // Hopefully not needed? Figure out to search through complex arrays
    const favouritesIDs = favouritesArray.value.map(item => item.id)
    if(!favouritesIDs.includes(jokeData.id)) {
        favouritesArray.value.push({
            id: jokeData.id,
            rating: jokeRating.value,
            favourite: true,
        })
        localStorage.setItem('favourites', JSON.stringify(favouritesArray.value))
        checkSavedInfo(jokeData)
    } else {
        const index = favouritesArray.value.findIndex((favourite) => favourite.id === jokeData.id)
        if(favouritesArray.value[index].favourite === false) {
            favouritesArray.value[index].favourite = true
        } else {
            favouritesArray.value[index].favourite = false
        }
        localStorage.setItem('favourites', JSON.stringify(favouritesArray.value))
        checkSavedInfo(jokeData)
    }
}

const setRating = (star: number, jokeData: IJoke) => {
    jokeRating.value = star
    const favouritesIDs = favouritesArray.value.map(item => item.id)
    if(!favouritesIDs.includes(jokeData.id)) {
        // Edit the data in the array and ONLY update the rating system
        favouritesArray.value.push({
            id: jokeData.id, 
            rating: jokeRating.value, 
            favourite: false,
        })
        localStorage.setItem('favourites', JSON.stringify(favouritesArray.value))
        checkSavedInfo(jokeData)
    } else {
        const index = favouritesArray.value.findIndex((favourite) => favourite.id === jokeData.id)
        favouritesArray.value[index].rating = jokeRating.value
        localStorage.setItem('favourites', JSON.stringify(favouritesArray.value))
        checkSavedInfo(jokeData)
    }
}

// Write a function that removes jokes with NO favourite and NO rating (probably not even possible to remove the rating?)

// Expand this to update when loading a new joke (load the correct rating as well)
watch(() => props.jokeData, (newValue, oldValue) => {
    // console.log('update joke data')
    favourite.value = false
    jokeRating.value = 0
    checkSavedInfo(props.jokeData)
})

onMounted(loadFavouriteStorage)

</script>

<template>
    <div>
    <!-- ratingTotal needs to be a prop, as well as the jokeRating, also an emit function to update on the parent -->
        <span v-for="star in ratingTotal" :key="star" class="star" :class="{ filled: star <= jokeRating }" @click="setRating(star, jokeData)">★</span>
    </div>
    <div>
      <button v-if="!favourite" @click="toggleFavourite(props.jokeData)">I love this!</button>
      <button v-if="favourite" @click="toggleFavourite(props.jokeData)">Get this outta here!</button>
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