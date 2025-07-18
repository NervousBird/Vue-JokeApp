<script setup lang="ts">
import type { IFavourite } from '@/favourite'
import JokeSaveData from '@/components/JokeSaveData.vue'
import { useFavouriteAPIData } from '@/useFavouriteStorage'

const {jokeInfoArray, favouritesArray} = useFavouriteAPIData('favourites')

// Receive data from the component, and update the local storage accordingly
const receiveFavouritesData = (fav: IFavourite, index: number) => {
    favouritesArray.value[index] = {id: fav.id, rating: fav.rating, favourite: fav.favourite}
    localStorage.setItem('favourites', JSON.stringify(favouritesArray.value))
}

</script>

<template>
    <div class="container-title">
        <h1>Favourites</h1>
        <h3>The place for all the BEST jokes.</h3>
    </div>
    <!-- <div class="container-sorting">
        <h2>Sort</h2>
        <div class="container-sort-buttons">
            <button>Rank</button>
            <button>Id</button>
            <button>Type</button>
            <button>Category</button>
            <button>Unsorted</button>
        </div>
    </div> -->
    <div class="container-favourites">
        <TransitionGroup name="bounce">
            <ul class="container-favourites-cards" v-for="data in jokeInfoArray" key="test">
                <li class="favourite-card">
                    <!-- Calculate what to generate, otherwise empty fields are causing weird spacing -->
                    <h3>{{ data.setup }}</h3>
                    <h3>{{ data.delivery }}</h3>
                    <h3>{{ data.joke }}</h3>
                    <p>{{ data.category }}</p>
                    <p>{{ data.id }}</p>
                    <JokeSaveData :joke-data="data" :favourites-data="favouritesArray" @update-favourites-info="receiveFavouritesData" />
                </li>
            </ul>
        </TransitionGroup>
    </div>
</template>

<style scoped>
ul {
    padding-inline-start: 0px;
}

.container-sorting {
    justify-content: center;
    text-align: center;
}

.container-sort-buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
}

.container-favourites {
    background-color: var(--background);
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-content: flex-start;
    /* align-items: center; */
    text-align: center;
    padding: 10px;
    margin: 10px;
    margin-left: 5vw;
    margin-right: 5vw;
    gap: 20px;
}

.container-favourites-cards {
    display: flex;
    flex-direction: column;
    padding: 0px;
    padding-top: 10px;
    padding-bottom: 10px;
    margin: 0px;
    width: 500px;
}

.favourite-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--background);
    border: 2px solid var(--subtext);
    border-radius: 5%;
    box-shadow: 0px 2px 8px 2px color-mix(in srgb, var(--subtext), transparent 70%);
    padding: 10px;
    padding-top: 20px;
    padding-bottom: 20px;
    margin: 0px;
    gap: 0px;
    transition: background-color 0.2s ease-in-out;
}

.favourite-card:hover {
    background-color: color-mix(in srgb, var(--background), var(--primary) 15%);
    transition: background-color 0.2s ease-in-out;
}

h3 {
    background-color: transparent;
}

p {
    color: var(--subtext);
    background-color: transparent;
    margin: 5px;
}

button {
    background-color: var(--primary);
    color: var(--background);
    border: none;
    border-radius: 10px;
    width: 75px;
    height: 25px;
    transition: background-color 0.2s ease-in-out;
}

button:hover {
    background-color: var(--judgement);
    color: var(--text);
    border: none;
    border-radius: 10px;
    transition: background-color 0.2s ease-in-out;
}

.bounce-enter-active {
    animation: bounce-in 0.5s;
}
.bounce-leave-active {
    animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0.5);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

</style>