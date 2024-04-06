const GIPHY_API_KEY = "r3QZ0sC98TeMhsh6yy0E98aeuO8ANw7t"

export async function returnGifSrc(query) {
    const rawData = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${GIPHY_API_KEY}&tag=${query}`, {
        mode: "cors"
    })
    const data = await rawData.json()
    return data.data.images.original.url
}