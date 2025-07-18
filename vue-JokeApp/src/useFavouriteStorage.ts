import type { IJoke } from '@/joke'
import { onMounted, ref } from 'vue'
import { useLocalStorage } from './useLocalStorage'

export function useFavouriteAPIData(filterString: string) {
    const { favouritesArray } = useLocalStorage(filterString)
    const jokeInfoArray = ref<IJoke[]>([])

    const fetchData = async () => {
        // filtering based on if the joke is favourited or not
        const favouritesIDs = favouritesArray.value.filter((item: { favourite: boolean }) => item.favourite === true).map((item: { id: any }) => item.id)
        favouritesIDs.forEach(async (id: any) => {
            const data = await fetch(`https://v2.jokeapi.dev/joke/Any?idRange=${id}`)
                .then(response => response.json())
                // push to the array (this will be the array used to display data)
                .then(data => jokeInfoArray.value.push(data))
        })
    }

    onMounted(fetchData)

    return {jokeInfoArray, favouritesArray}
}