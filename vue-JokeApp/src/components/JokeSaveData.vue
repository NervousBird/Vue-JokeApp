<script setup lang="ts">
import type { IFavourite } from '@/favourite';
import type { IJoke } from '@/joke';
import { onMounted, ref, TransitionGroup, watch } from 'vue';

const props = defineProps<{
  jokeData: IJoke
}>()

const emit = defineEmits<{
    (event: 'updateFavouritesInfo', info: number): void
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
    emit('updateFavouritesInfo', jokeData.id)
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

// Expand this to update when loading a new joke (load the correct rating as well)
watch(() => props.jokeData, (newValue, oldValue) => {
    jokeRating.value = 0
    favourite.value = false
    loadFavouriteStorage()
    checkSavedInfo(props.jokeData)
    console.log('updated data')
}, {immediate: true})

onMounted(loadFavouriteStorage)

</script>

<template>
    <div class="container">
        <div class="rating-container">
        <!-- ratingTotal needs to be a prop, as well as the jokeRating, also an emit function to update on the parent -->
            <span v-for="star in ratingTotal" :key="star" class="star" :class="{ filled: star <= jokeRating }" @click="setRating(star, jokeData)">
                ★
            </span>
        </div>
        <div class="favourite-container">
            <Transition name="bounce">
                <i class="bi bi-heart" v-if="!favourite" @click="toggleFavourite(props.jokeData)"></i>
            </Transition>
            <Transition name="bounce">
                <i class="bi bi-heart-fill" v-if="favourite" @click="toggleFavourite(props.jokeData)"></i>
            </Transition>
        </div>        
    </div>
</template>

<style scoped>

.container {
    display: block;
    /* flex-direction: column; */
    justify-content: center;
    text-align: center;
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

.rating-container,
.favourite-container {
    display: flex;
    justify-content: center;
}

.bi-heart, .bi-heart-fill:hover {
    cursor: pointer;
    color: var(--judgement);
    font-size: 30px;
    position: absolute;
}

.bi-heart-fill, .bi-heart:hover {
    cursor: pointer;
    color: var(--favourite);
    font-size: 30px;
    position: absolute;
}

.grow-move,
.grow-enter-active,
.grow-leave-active {
    transition: all 0.5s ease;
}
.grow-enter-from,
.grow-leave-to {
    opacity: 0;
    transform: translatey(10px);
}
/* .grow-leave-active {
    position: absolute;
} */
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