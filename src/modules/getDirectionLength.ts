export default async function (origin: string, destination: string, transit: boolean): Promise<number> {
    const transitString = transit ? "&mode=transit" : "";
    const res = await fetch(`https://maps.googleapis.com/maps/api/directions/json?destination=place_id:${destination}&origin=place_id:${origin}${transitString}&key=${process.env.GOOGLE_API_KEY}`)
    const data = await res.json()

    return data.routes[0].legs[0].distance.value / 1000;
}