import { ref, watchEffect } from "vue"

export const useLocalStorage = (storage: string) => {
    const favouritesArray = ref()
    const storedFavourites = localStorage.getItem(storage)

    const loadFavouriteStorage = () => {
        if(storedFavourites && storedFavourites !== 'undefined') {
            try {
                favouritesArray.value = JSON.parse(storedFavourites)
            } catch(error) {
                console.log('Error parsing localStorage "favouritesArray:"', error)
                localStorage.removeItem(storage)
            }
        }
    }

    watchEffect(() => {
        loadFavouriteStorage()
    })

    return { favouritesArray }
}