"use server";
import axios from 'axios';

export default async function(lat1: number, long1: number, lat2: number, long2: number, travel: string): Promise < number > {
    if (travel === "plane") {
        const p = 0.017453292519943295;
        const c = Math.cos;
        const a = 0.5 - c((lat1 - lat2) * p) / 2 + c(lat2 * p) * c((lat1) * p) * (1 - c(((long1 - long2) * p))) / 2;
        const distance = 12742 * Math.asin(Math.sqrt(a));
        return distance;
    } else {
        const apiKey = 'YOUR_API_KEY';
        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${lat1},${long1}&destination=${lat2},${long2}&key=${apiKey}`;

        try {
            const response = await axios.get(url);
            const distance = response.data.routes[0].legs[0].distance.value / 1000; // Convert to kilometers
            return distance;
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to calculate distance using Google Maps Directions API');
        }
    }
}