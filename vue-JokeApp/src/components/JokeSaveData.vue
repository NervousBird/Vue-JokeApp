<script setup lang="ts">
import type { IFavourite } from '@/favourite';
import type { IJoke } from '@/joke';
import { onMounted, onUpdated, ref, watch } from 'vue';

const props = defineProps<{
  jokeData: IJoke
  favouritesData: IFavourite[]
}>()

// This is being used to update the array in favourites, so the item gets removed in real time
const emit = defineEmits<{
    (event: 'updateFavouritesInfo', info: IFavourite, index: number): void
}>()

const ratingTotal = ref(5)
const jokeRating = ref(0)
const favourite = ref(false)
const favouriteEmitData = ref<IFavourite>()
let index = 0

const toggleFavourite = () => {
    if(favourite.value === true) {
        favourite.value = false
    } else {
        favourite.value = true
    }
}

const setRating = (star: number) => {
    jokeRating.value = star
}

const loadInfo = () => {
    console.log(props.jokeData.id)
    index = props.favouritesData.findIndex((favourite) => favourite.id === props.jokeData.id)
    if(index >= 0) {
        jokeRating.value = props.favouritesData[index].rating
        favourite.value = props.favouritesData[index].favourite
        favouriteEmitData.value = props.favouritesData[index]  
    } else {
        jokeRating.value = 0
        favourite.value = false
        favouriteEmitData.value = {id: props.jokeData.id, rating: 0, favourite: false}
    }
}

const emitData = () => {
    index = props.favouritesData.findIndex((favourite) => favourite.id === props.jokeData.id)
    favouriteEmitData.value = {
        id: favouriteEmitData.value.id,
        rating: jokeRating.value, 
        favourite: favourite.value
    }
    emit('updateFavouritesInfo', favouriteEmitData.value, index)
}

// Expand this to update when loading a new joke (load the correct rating as well)
watch([jokeRating, favourite, props.jokeData], () => {
    console.log(props.jokeData.id)
    emitData()
})

onMounted(loadInfo)
onUpdated(loadInfo)

</script>

<template>
    <div class="container">
        <div class="rating-container">
        <!-- ratingTotal needs to be a prop, as well as the jokeRating, also an emit function to update on the parent -->
            <span v-for="star in ratingTotal" :key="star" class="star" :class="{ filled: star <= jokeRating }" @click="setRating(star)">
                <Transition name="bounce">
                    <i class="bi bi-star-fill"></i>
                </Transition>
            </span>
        </div>
        <div class="favourite-container">
            <Transition name="bounce">
                <i class="bi bi-heart" v-if="!favourite" @click="toggleFavourite"></i>
            </Transition>
            <Transition name="bounce">
                <i class="bi bi-heart-fill" v-if="favourite" @click="toggleFavourite"></i>
            </Transition>
        </div>
    </div>
</template>

<style scoped>
* {
    background-color: transparent;
}

.container {
    display: block;
    /* flex-direction: column; */
    justify-content: center;
    text-align: center;
    padding-top: 0px;
    padding-bottom: 30px;
}

.star {
    cursor: pointer;
    color: var(--subtext);
    font-size: 30px;
    animation: bounce-in 0.5s ease-in-out;
}

.star.filled {
    color: var(--judgement);
    animation: bounce-in 0.5s ease-in-out;
}

.star:hover {
    color: var(--favourite);
}

.rating-container,
.favourite-container {
    display: flex;
    justify-content: center;
    gap: 5px;
    padding: 5px;
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