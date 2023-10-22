"use server";

import keys from "@/var/keys";
import { Place } from "@/var/types";

export default async function locationAutoComplete(location: string): Promise<Place[]>{
    const res = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${location}&key=${keys.google}`);
    const data = await res.json();

    return data.predictions.map((prediction: any) => {
        return {
            name: prediction.description,
            id: prediction.place_id
        }
    });
}