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

    watchEffect(() => {
        loadFavouriteStorage()
    })

    return { favouritesArray }
}