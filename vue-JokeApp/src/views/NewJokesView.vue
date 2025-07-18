<script setup lang="ts">
import JokeFilters from '@/components/JokeFilters.vue';
import JokeSaveData from '@/components/JokeSaveData.vue';
import type { IFavourite } from '@/favourite';
import { useFetch } from '@/useFetch';
import { useLocalStorage } from '@/useLocalStorage';
import { ref } from 'vue';

const { favouritesArray } = useLocalStorage('favourites')
const filterString = ref('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit')
const filterInfo = ref('')
const {data, error} = useFetch(filterString)

const updateFilter = (info: string) => {
    filterString.value = ('https://v2.jokeapi.dev/joke/' + info)
    filterInfo.value = filterString.value
}

const fetchData = () => {
    filterString.value = ''
    filterString.value = filterInfo.value
}

const receiveFavouritesData = (fav: IFavourite, index: number) => {
    // If it already exists in favouritesArray, update values
    if(index >= 0) {
        favouritesArray.value[index] = {id: fav.id, rating: fav.rating, favourite: fav.favourite}
    } 
    // Otherwise add to the Array and save
    else if(fav.favourite === true || fav.rating > 0) {
        favouritesArray.value.push({id: fav.id, rating: fav.rating, favourite: fav.favourite})
    }
    localStorage.setItem('favourites', JSON.stringify(favouritesArray.value))
}

</script>

<template>
    <div class="container-title">
        <h1>New Jokes!</h1>
    </div>
    <JokeFilters @update-filters="updateFilter" />
    <div v-if="error">Opps! Error encountered: {{ error.message }}</div>
    <TransitionGroup name="bounce">
        <div v-if="data" class="container-joke">
            <h3>{{ data?.setup }}</h3>
            <h3>{{ data?.delivery }}</h3>
            <h3>{{ data?.joke }}</h3>
        </div>
    </TransitionGroup>
    <div class="container-buttons">
        <JokeSaveData v-if="data" :joke-data="data" :favourites-data="favouritesArray" @update-favourites-info="receiveFavouritesData" />
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