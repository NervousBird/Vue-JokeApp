<script setup lang="ts">
import MyJokes from '@/components/MyJokes.vue';
import { useCreateJoke } from '@/useCreateJoke';
import { computed, onMounted, ref } from 'vue';
import { useLocalStorage } from '@/useLocalStorage';

const { favouritesArray } = useLocalStorage('myJokes')
const categoryString = ref('miscellaneous')
const categoryFlag = ref<string[]>([])
const categoryType = ref('twopart')
const setup = ref('')
const delivery = ref('')
const joke = ref('')
let id = favouritesArray.value.length
const misc = ref()

const submitNewJoke = () => {
    if (categoryType.value === 'twopart') {
        return (categoryString.value === '' || setup.value === '' || delivery.value === '' ? alert('Please fill in the fields.') : createJoke()) 
    }
    return (joke.value === '' ? alert('Please fill in the fields.') : createJoke())
}

const createJoke = () => {
    const newJoke = useCreateJoke(categoryType, categoryString, categoryFlag, setup, delivery, joke, id)
    favouritesArray.value.push(newJoke.value)
    localStorage.setItem('myJokes', JSON.stringify(favouritesArray.value))
    id++
    setup.value = ''
    delivery.value = ''
    joke.value = ''
}

const typeTwoParts = computed(() => {
    return (categoryType.value === 'twopart' ? true : false)
})

const typeOnePart = computed(() => {
    return (categoryType.value === 'single' ? true : false) 
})

const deleteJoke = (id: number) => {
    favouritesArray.value.splice(id, 1)
    localStorage.setItem('myJokes', JSON.stringify(favouritesArray.value))
}

onMounted(() => {
    misc.value.checked = true
})

</script>

<template>
    <div class="container-title">
        <h1>My Jokes!</h1>
    </div>
    <div class="container">
        <div class="container-categories">
            <h2>Select Categories:</h2>
            <form>
                <label for="programming">Programming</label>
                <input type="radio" name="programming" id="programming" value="Programming" v-model="categoryString" />
                <label for="miscellaneous">Miscellaneous</label>
                <input ref="misc" type="radio" name="miscellaneous" id="miscellaneous" value="Miscellaneous"
                    v-model="categoryString" />
                <label for="dark">Dark</label>
                <input type="radio" name="dark" id="dark" value="Dark" v-model="categoryString" />
                <label for="pun">Pun</label>
                <input type="radio" name="pun" id="pun" value="Pun" v-model="categoryString" />
                <label for="spooky">Spooky</label>
                <input type="radio" name="spooky" id="spooky" value="Spooky" v-model="categoryString" />
                <label for="christmas">Christmas</label>
                <input type="radio" name="christmas" id="christmas" value="Christmas" v-model="categoryString" />
            </form>
        </div>
        <div class="container-flags">
            <h2>Select Flags:</h2>
            <form>
                <label for="all">All</label>
                <input ref="allFlags" type="checkbox" name="all" id="all" value="all" v-model="categoryFlag" />
                <label for="nsfw">NSFW</label>
                <input type="checkbox" name="nsfw" id="nsfw" value="nsfw" v-model="categoryFlag" />
                <label for="religious">Religious</label>
                <input type="checkbox" name="religious" id="religious" value="religious" v-model="categoryFlag" />
                <label for="political">Political</label>
                <input type="checkbox" name="political" id="political" value="political" v-model="categoryFlag" />
                <label for="racist">Racist</label>
                <input type="checkbox" name="racist" id="racist" value="racist" v-model="categoryFlag" />
                <label for="sexist">Sexist</label>
                <input type="checkbox" name="sexist" id="sexist" value="sexist" v-model="categoryFlag" />
                <label for="explicit">Explicit</label>
                <input type="checkbox" name="explicit" id="explicit" value="explicit" v-model="categoryFlag" />
            </form>
        </div>
        <div class="container-type">
            <h2>Select Type:</h2>
            <form>
                <label for="single">One-liner</label>
                <input type="radio" name="single" id="single" value="single" v-model="categoryType" />
                <label for="twopart">Two-parter</label>
                <input type="radio" name="twopart" id="twopart" value="twopart" v-model="categoryType" />
            </form>
        </div>
    </div>
    <!-- <JokeFilters @update-filters="updateFilter" /> -->
    <div class="container-input">
        <label v-if="typeTwoParts" for="setup">Setup</label>
        <input v-if="typeTwoParts" type="text" name="setup" id="setup" v-model="setup">
        <label v-if="typeTwoParts" for="delivery">Delivery</label>
        <input v-if="typeTwoParts" type="text" name="delivery" id="delivery" v-model="delivery">
        <label v-if="typeOnePart" for="joke">Joke</label>
        <input v-if="typeOnePart" type="text" name="joke" id="joke" v-model="joke">
    </div>
    <div class="container-button">
        <button @click="submitNewJoke">Add Joke</button>
    </div>
    <MyJokes :joke-info-array="favouritesArray" @delete-joke="deleteJoke" />
</template>

<style scoped>

.container {
    display: flex;
    flex-direction: column;
    justify-self: center;
    background-color: var(--background);
    padding-left: 15px;
    padding-right: 15px;
    padding-bottom: 30px;
    border: 2px solid var(--subtext);
    border-radius: 10px;
    max-width: 75vw;
    box-shadow: 0px 4px 4px 2px var(--subtext);
}

.container-button {
    justify-content: center;
    text-align: center;
}

.container-categories,
.container-flags,
.container-type {
    display: block;
    justify-content: center;
    align-items: baseline;
    text-align: center;
    gap: 10px;
}

.container-input {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: center;
    margin: 30px;
    padding: 10px;
    gap: 10px;
}

form {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 10px;

}

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

input[type='text'] {
    max-width: 800px;
    min-width: 500px;
    padding: 10px;
}

</style>