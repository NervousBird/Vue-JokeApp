import { ref, watchEffect, toValue } from 'vue'
import type { IJoke } from './joke'

export const useFetch = (url: string) => {
    const data = ref<IJoke>()
    const error = ref(null)

    const fetchData = () => {
        // reset before fetching
        // data.value = {}
        // error.value = null

        fetch(toValue(url))
            .then((res) => res.json())
            .then((json) => (data.value = json))
            .catch((err) => (error.value = err))
    }

    watchEffect(() => {
        fetchData()
    })

    return { data, error }
}