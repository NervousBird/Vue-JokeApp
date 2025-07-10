<script setup lang="ts">
import JokeSaveData from '@/components/JokeSaveData.vue'
import type { IFavourite } from '@/favourite'
import type { IJoke } from '@/joke'
import { onMounted, ref } from 'vue'

const favouritesArray = ref<IFavourite[]>([])
const storedFavourites = localStorage.getItem('favourites')
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
    const favouritesIDs = favouritesArray.value.filter(item => item.favourite === true).map(item => item.id)
    favouritesIDs.forEach(async id => {
        const data = await fetch(`https://v2.jokeapi.dev/joke/Any?idRange=${id}`)
            .then(response => response.json())
            .then(data => favouritesInfo.value.push(data))
    })
}

const updateFavouritesInfo = (index: number) => {
    favouritesInfo.value = favouritesInfo.value.filter(joke => joke.id !== index)
    // console.log(favouritesInfo)
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
            <JokeSaveData :joke-data="fav" @update-favourites-info="updateFavouritesInfo" />
        </li>
    </ul>

</template>

<style scoped>

</style>