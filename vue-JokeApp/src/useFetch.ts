import { ref, watchEffect, toValue } from 'vue'

export const useFetch = (url: string) => {
    const data = ref(null)
    const error = ref(null)
    const loading = ref(true)

    const fetchData = async () => {
        data.value = null
        error.value = null

        fetch(await toValue(url))
            .then(res => res.json())
            .then(json => (data.value = json))
            .catch(err => (error.value = err))
            .finally(() => (loading.value = false))
    }

    watchEffect(() => {
        fetchData()
    })

    return { data, error, loading }
}