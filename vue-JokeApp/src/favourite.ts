export interface IFavourite {
    id: number,         // Joke id (to pull and compare info from API)
    rating: number,     // The rating given to the joke by the user (default is 0)
    favourite: boolean, // Whether or not the user has favourited the joke
}