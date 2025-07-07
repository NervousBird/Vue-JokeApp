<script setup lang="ts">
import type { IJoke } from '@/joke'
import { onMounted, ref } from 'vue'

const favouritesArray = ref([])
const storedFavourites = localStorage.getItem('favourites')
const jokeData = ref<IJoke>()
const favouritesInfo = ref<IJoke[]>([])

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

const fetchData = () => {
    favouritesArray.value.forEach(async id => {
        const data = await fetch(`https://v2.jokeapi.dev/joke/Any?idRange=${id}`)
            .then(response => response.json())
            .then(data => favouritesInfo.value.push(data))
    })
}

// FIX THIS TO WORK ON THIS PAGE
const addToFavourites = (joke: IJoke,id: number) => {
    favouritesArray.value = favouritesArray.value.filter((number: number) => number !== id)
    favouritesInfo.value = favouritesInfo.value.filter((item) => item !== joke)
    localStorage.setItem('favourites', JSON.stringify(favouritesArray.value))
}
    
onMounted(loadFavouriteStorage)
onMounted(fetchData)

</script>

<template>

    <div>
        <h1>Favourites</h1>
    </div>
    <div>
        <h3>Sort</h3>
        <button>Rank</button>
        <button>Id</button>
        <button>Type</button>
        <button>Category</button>
        <button>Unsorted</button>
    </div>
    <ul v-for="fav in favouritesInfo" :key="fav.id">
        <li>
            <p>{{ fav.setup }}</p>
            <p>{{ fav.delivery }}</p>
            <p>{{ fav.joke }}</p>
            <p>{{ fav.category }}</p>
            <p>{{ fav.id }}</p>
            <button @click="addToFavourites(fav, fav.id)">Get this shit out of here!</button>
        </li>
    </ul>

</template>

<style scoped>

</style>