import { ref, watchEffect, toValue } from 'vue'

export const useFetch = (url: string) => {
    const data = ref(null)
    const error = ref(null)

    const fetchData = () => {
        data.value = null
        error.value = null

        fetch(toValue(url))
            .then(res => res.json())
            .then(json => (data.value = json))
            .catch(err => (error.value = err))
    }

    watchEffect(() => {
        fetchData()
    })

    return { data, error }
}