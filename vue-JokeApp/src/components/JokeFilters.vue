<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const categoryString = ref(['Any'])
const categoryFlag = ref(['nsfw', 'religious', 'political', 'racist', 'sexist', 'explicit'])
const categoryType = ref('both')
const categoryLanguage = ref('en')
// These are potential bonus filters, don't know if I even wanna use them
// const searchInput = ref('')
// const jokeNumber = ref()
let filterString = ''
const anyCategory = ref()
const jokeType = ref()

const emit = defineEmits<{
  (event: 'updateFilters', info: string): void
}>()

// .../joke/({category}?) (lang={language}) ({blacklistFlags={flags}}&) type={type}
const createFilterString = () => {
  filterString = categoryString.value.toString()
  if(categoryLanguage.value !== 'en') {
    filterString += '?' + 'lang=' + categoryLanguage.value
  }
  if (categoryFlag.value.length !== 0 && filterString.includes('?')) {
    filterString += '&' + 'blacklistFlags=' + categoryFlag.value.toString()
  } else if (categoryFlag.value.length !== 0) {
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

// Flag inputs, automatically select all inputs (apart from all) when you select 'all'
watch(categoryFlag, (newInput, oldInput) => {
  if (newInput.includes('all') && !oldInput.includes('all')) {
    categoryFlag.value = []
    return categoryFlag.value.push('nsfw', 'religious', 'political', 'racist', 'sexist', 'explicit')
  }
  if (oldInput.includes('all') && newInput.includes('all')) {
    return (categoryFlag.value = categoryFlag.value.filter((i: string) => i !== 'all'))
  }
  createFilterString()
})

watch([categoryType, categoryLanguage], () => {
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
  <div class="container">
    <div class="container-categories">
      <h2>Select Categories:</h2>
      <form @change="emit('updateFilters', filterString)">
        <label for="any">Any</label>
        <input ref="anyCategory" type="checkbox" name="any" id="any" value="Any" v-model="categoryString" />
        <label for="programming">Programming</label>
        <input type="checkbox" name="programming" id="programming" value="Programming" v-model="categoryString" />
        <label for="miscellaneous">Miscellaneous</label>
        <input type="checkbox" name="miscellaneous" id="miscellaneous" value="Miscellaneous" v-model="categoryString" />
        <label for="dark">Dark</label>
        <input type="checkbox" name="dark" id="dark" value="Dark" v-model="categoryString" />
        <label for="pun">Pun</label>
        <input type="checkbox" name="pun" id="pun" value="Pun" v-model="categoryString" />
        <label for="spooky">Spooky</label>
        <input type="checkbox" name="spooky" id="spooky" value="Spooky" v-model="categoryString" />
        <label for="christmas">Christmas</label>
        <input type="checkbox" name="christmas" id="christmas" value="Christmas" v-model="categoryString" />
      </form>
    </div>
    <div class="container-flags">
      <h2>Select Blacklist Flags:</h2>
      <form @change="emit('updateFilters', filterString)">
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
    <div class="container-language">
      <h2>Select Language:</h2>
      <form @change="emit('updateFilters', filterString)">
          <select v-model="categoryLanguage">
              <option>en</option>
              <option>cs</option>
              <option>es</option>
              <option>de</option>
              <option>fr</option>
              <option>pt</option>
          </select>
      </form>
    </div>
    
    <div class="container-type">
      <h2>Select Type:</h2>
      <form @change="emit('updateFilters', filterString)">
        <label for="1">Both</label>
        <input ref="jokeType" type="radio" name="1" id="1" value="both" v-model="categoryType" />
        <label for="2">One-liner</label>
        <input type="radio" name="2" id="2" value="single" v-model="categoryType" />
        <label for="3">Two-parter</label>
        <input type="radio" name="3" id="3" value="twopart" v-model="categoryType" />
      </form>
    </div>
    <!-- <form @change="emit('updateFilters', filterString)">
          <p>Search for Joke Containing:</p>
          <input v-model="searchInput" placeholder="type here">
      </form>
      <form @change="emit('updateFilters', filterString)">
          <p>Search Joke by Number:</p>
          <input v-model.number="jokeNumber" placeholder="between 0-1300">
      </form> -->    
  </div>

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
  box-shadow: 0px 4px 8px 2px color-mix(in srgb, var(--subtext), transparent 70%);
}

.container-categories,
.container-language,
.container-flags,
.container-type {
  display: block;
  justify-content: center;
  align-items: baseline;
  text-align: center;
  gap: 10px;
}

form {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 10px;

}

input {
  color: var(--text);
  background-color: var(--favourite);
  border: 3px solid black;
  border-radius: 100%;
  box-sizing: content-box;
}

select {
  min-width: 50px;
  min-height: 30px;
  border-radius: 10px;
  text-align: center;
}

select::picker-icon {
  color: var(--subtext);
}

select:open::picker {
  rotate: 180deg;
}

option {
  display: flex;
  justify-content: flex-start;
  gap: 20px;

  border: 2px solid #ddd;
  background: #eee;
  padding: 10px;
  transition: 0.4s;
}

</style>
