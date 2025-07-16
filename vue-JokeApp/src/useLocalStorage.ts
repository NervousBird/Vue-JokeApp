import { ref, watchEffect } from "vue"
import type { IFavourite } from "./favourite"

export const useLocalStorage = () => {
    const favouritesArray = ref<IFavourite[]>([])
    const storedFavourites = localStorage.getItem('favourites')

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

    watchEffect(() => {
        loadFavouriteStorage()
    })

    return { favouritesArray }
}