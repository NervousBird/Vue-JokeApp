export interface IJoke {
    error: boolean,
    category: string,
    type: string,
    joke?: string,
    setup?: string,
    delivery?: string,
    flags: {
        nsfw: boolean,
        religious: boolean,
        political: boolean,
        racist: boolean,
        sexist: boolean,
        explicit: boolean
    },
    safe: boolean,
    id: number,
    lang: string,
}