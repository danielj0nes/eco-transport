"use server";

import { Location } from "@/var/types";

export default async function getLocation(place_id: string): Promise<Location> {
    const res = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${process.env.GOOGLE_API_KEY}`);
    const data = await res.json();

    const location = data.result.geometry.location;

    return {
        name: data.result.name,
        latitude: location.lat,
        longitude: location.lng
    }
}

