import type { IFavourite } from '@/favourite'
import type { IJoke } from '@/joke'
import { onMounted, ref } from 'vue'

export function getFavouriteAPIData(filterString: string) {
    const favouritesArray = ref<IFavourite[]>([])
    const storedFavourites = localStorage.getItem('favourites')
    const jokeInfoArray = ref<IJoke[]>([])

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

    const fetchData = async () => {
        // filtering based on if the joke is favourited or not
        const favouritesIDs = favouritesArray.value.filter(item => item.favourite === true).map(item => item.id)
        favouritesIDs.forEach(async id => {
            const data = await fetch(`https://v2.jokeapi.dev/joke/Any?idRange=${id}`)
                .then(response => response.json())
                // push to the array (this will be the array used to display data)
                .then(data => jokeInfoArray.value.push(data))
        })
    }

    onMounted(loadFavouriteStorage)
    onMounted(fetchData)

    return {jokeInfoArray, favouritesArray}
}