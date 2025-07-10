<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const categoryString = ref(['Any'])
const categoryFlag = ref(['nsfw', 'religious', 'political', 'racist', 'sexist', 'explicit'])
const categoryType = ref('both')
// These are potential bonus filters, don't know if I even wanna use them
// const categoryLanguage = ref('en')
// const searchInput = ref('')
// const jokeNumber = ref()
// .../joke/({category}?) ({blacklistFlags={flags}}&) type={type}
let filterString = ''
// This is just to set the category to 'Any' imnmediately
const anyCategory = ref()
const jokeType = ref()

const emit = defineEmits<{
  (event: 'updateFilters', info: string): void
}>()

// .../joke/({category}?) ({blacklistFlags={flags}}&) type={type}
const createFilterString = () => {
  filterString = categoryString.value.toString()
  if (categoryFlag.value.length !== 0) {
    filterString += '?' + 'blacklistFlags=' + categoryFlag.value.toString()
  }
  if (categoryType.value !== 'both' && filterString.includes('?')) {
    filterString += '&' + 'type=' + categoryType.value
  } else if (categoryType.value !== 'both') {
    filterString += '?' + 'type=' + categoryType.value
  }
}

// Watch to set the category inputs to select or deselect 'Any' automatically
watch(categoryString, (newInput, oldInput) => {
  // Untick 'Any' if there is a specific category/categories selected
  if (oldInput.includes('Any') && categoryString.value.length > 1) {
    return (categoryString.value = categoryString.value.filter((i: string) => i !== 'Any'))
  }
  // Untick all other categories when clicking 'Any' as they're not needed
  if (!oldInput.includes('Any') && newInput.includes('Any')) {
    return (categoryString.value = categoryString.value.filter((i: string) => i === 'Any'))
  }
  // Fail safe, default to 'any' if none are selected
  if (newInput.length === 0) {
    return categoryString.value.push('Any')
  }
  createFilterString()
})

// Don't like duplicating this, but it works for now
watch(categoryFlag, (newInput, oldInput) => {
  if (newInput.includes('all') && !oldInput.includes('all')) {
    categoryFlag.value = []
    return categoryFlag.value.push('nsfw', 'religious', 'political', 'racist', 'sexist', 'explicit')
  }
  // Untick all other categories when clicking 'Any' as they're not needed
  if (oldInput.includes('all') && newInput.includes('all')) {
    return (categoryFlag.value = categoryFlag.value.filter((i: string) => i !== 'all'))
  }
  createFilterString()
})

watch(categoryType, () => {
  createFilterString()
})

onMounted(() => {
  anyCategory.value.checked = true
  jokeType.value.checked = true
  createFilterString()
  emit('updateFilters', filterString)
})
</script>

<template>
  <form @change="emit('updateFilters', filterString)">
    <p>Select Categories:</p>
    <!-- Just need to make a function to print the right string -->
    <label for="any">Any</label>
    <input ref="anyCategory" type="checkbox" name="any" value="Any" v-model="categoryString" />
    <label for="programming">Programming</label>
    <input type="checkbox" name="programming" value="Programming" v-model="categoryString" />
    <label for="miscellaneous">Miscellaneous</label>
    <input type="checkbox" name="miscellaneous" value="Miscellaneous" v-model="categoryString" />
    <label for="dark">Dark</label>
    <input type="checkbox" name="dark" value="Dark" v-model="categoryString" />
    <label for="pun">Pun</label>
    <input type="checkbox" name="pun" value="Pun" v-model="categoryString" />
    <label for="spooky">Spooky</label>
    <input type="checkbox" name="spooky" value="Spooky" v-model="categoryString" />
    <label for="christmas">Christmas</label>
    <input type="checkbox" name="christmas" value="Christmas" v-model="categoryString" />
  </form>
  <form @change="emit('updateFilters', filterString)">
    <p>Select Blacklist Flags:</p>
    <label for="all">All</label>
    <input ref="allFlags" type="checkbox" name="all" value="all" v-model="categoryFlag" />
    <label for="nsfw">NSFW</label>
    <input type="checkbox" name="nsfw" value="nsfw" v-model="categoryFlag" />
    <label for="religious">Religious</label>
    <input type="checkbox" name="religious" value="religious" v-model="categoryFlag" />
    <label for="political">Political</label>
    <input type="checkbox" name="political" value="political" v-model="categoryFlag" />
    <label for="racist">Racist</label>
    <input type="checkbox" name="racist" value="racist" v-model="categoryFlag" />
    <label for="sexist">Sexist</label>
    <input type="checkbox" name="sexist" value="sexist" v-model="categoryFlag" />
    <label for="explicit">Explicit</label>
    <input type="checkbox" name="explicit" value="explicit" v-model="categoryFlag" />
  </form>
  <!-- <form @change="emit('updateFilters', filterString)">
        <p>Select Language:</p>
        <select v-model="categoryLanguage">
            <option>en</option>
            <option>cs</option>
            <option>es</option>
            <option>de</option>
            <option>fr</option>
            <option>pt</option>
        </select>
    </form> -->
  <form @change="emit('updateFilters', filterString)">
    <p>Select Type:</p>
    <label for="both">Both</label>
    <input ref="jokeType" type="radio" name="1" value="both" v-model="categoryType" />
    <label for="both">One-liner</label>
    <input type="radio" name="2" value="single" v-model="categoryType" />
    <label for="both">Two-parter</label>
    <input type="radio" name="3" value="twopart" v-model="categoryType" />
  </form>
  <!-- <form @change="emit('updateFilters', filterString)">
        <p>Search for Joke Containing:</p>
        <input v-model="searchInput" placeholder="type here">
    </form>
    <form @change="emit('updateFilters', filterString)">
        <p>Search Joke by Number:</p>
        <input v-model.number="jokeNumber" placeholder="between 0-1300">
    </form> -->
</template>

<style scoped></style>
