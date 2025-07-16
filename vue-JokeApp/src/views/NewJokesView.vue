<script setup lang="ts">
import JokeFilters from '@/components/JokeFilters.vue';
import JokeSaveData from '@/components/JokeSaveData.vue';
import type { IFavourite } from '@/favourite';
import type { IJoke } from '@/joke';
import { onMounted, ref } from 'vue';

const favouritesArray = ref<IFavourite[]>([])
const storedFavourites = localStorage.getItem('favourites')

const filterString = ref('')
const jokeData = ref<IJoke>()

const updateFilter = (info: string) => {
    filterString.value = info
}

const fetchData = async () => {
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

const receiveFavouritesData = (fav: IFavourite, index: number) => {
    if(index >= 0) {
        favouritesArray.value[index] = {id: fav.id, rating: fav.rating, favourite: fav.favourite}
    } else if(fav.favourite === true || fav.rating > 0) {
        favouritesArray.value.push({id: fav.id, rating: fav.rating, favourite: fav.favourite})
    }
    localStorage.setItem('favourites', JSON.stringify(favouritesArray.value))
}

onMounted(loadFavouriteStorage)

</script>

<template>
    <div class="container-title">
        <h1>New Jokes!</h1>
    </div>
    <JokeFilters @update-filters="updateFilter" />
    <TransitionGroup name="bounce">
        <div v-if="jokeData" class="container-joke">
            <h3>{{ jokeData?.setup }}</h3>
            <h3>{{ jokeData?.delivery }}</h3>
            <h3>{{ jokeData?.joke }}</h3>
        </div>
    </TransitionGroup>
    <div class="container-buttons">
        <JokeSaveData v-if="jokeData" :joke-data="jokeData" :favourites-data="favouritesArray" @update-favourites-info="receiveFavouritesData" />
        <button @click="fetchData">New Joke!</button>
    </div>
</template>

<style scoped>

button {
    background-color: var(--primary);
    color: var(--background);
    border: none;
    border-radius: 10px;
    padding: 10px;
    font-size: 1.2rem;
    width: 150px;
    height: 50px;
    transition: background-color 0.2s ease-in-out;
}

button:hover {
    background-color: var(--judgement);
    color: var(--text);
    border: none;
    border-radius: 10px;
    padding: 10px;
    transition: background-color 0.2s ease-in-out;
}

.container-joke {
    text-align: center;
    padding: 10px;
    margin: 30px;
    overflow: hidden;
    max-width: 800px;
    justify-self: center;
}

.container-buttons {
    display: flex;
    flex-direction: column;
    justify-self: center;
    align-items: center;
    text-align: center;
    padding: 10px;
    margin: 10px;
    gap: 20px;
    width: 200px;
}

.bounce-enter-active {
    animation: bounce-in 0.5s;
}
.bounce-leave-active {
    animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

</style>