import { ref } from "vue"
import type { IJoke } from "./joke"

export const useCreateJoke = (categoryType, categoryString, categoryFlag, setup, delivery, joke, id) => {
    const newJoke = ref<IJoke>()

    if (categoryType.value === 'single') {
        newJoke.value = {
            error: false,
            category: categoryString.value,
            type: categoryType.value,
            joke: joke.value,
            flags: {
                nsfw: categoryFlag.value.includes('nsfw'),
                religious: categoryFlag.value.includes('religious'),
                political: categoryFlag.value.includes('political'),
                racist: categoryFlag.value.includes('racist'),
                sexist: categoryFlag.value.includes('sexist'),
                explicit: categoryFlag.value.includes('explicit')
            },
            safe: true, // Should check if there's any flags otherwise this can remain true
            id: id++,
            lang: 'en',
        }
    } else {
        newJoke.value = {
            error: false,
            category: categoryString.value,
            type: categoryType.value,
            setup: setup.value,
            delivery: delivery.value,
            flags: {
                nsfw: categoryFlag.value.includes('nsfw'),
                religious: categoryFlag.value.includes('religious'),
                political: categoryFlag.value.includes('political'),
                racist: categoryFlag.value.includes('racist'),
                sexist: categoryFlag.value.includes('sexist'),
                explicit: categoryFlag.value.includes('explicit')
            },
            safe: true, // Should check if there's any flags otherwise this can remain true
            id: id++,
            lang: 'en',
        }
    }
    return newJoke
}