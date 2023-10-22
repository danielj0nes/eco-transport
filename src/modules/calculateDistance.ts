import { Place } from "@/var/types";
import getDirectionLength from "./getDirectionLength";
import getLocation from "./getLocation";


const transitModes = ["bus", "train"]

export default async function(origin: Place, destination: Place, travel: string): Promise<number> {
    if (travel === "plane") {

        const location1 = await getLocation(origin.id);
        const location2 = await getLocation(destination.id);    
        
        const lat1 = location1.latitude, 
            lat2 = location2.latitude, 
            long1 = location1.longitude, 
            long2 = location2.longitude;

        const p = 0.017453292519943295;
        const c = Math.cos;
        const a = 0.5 - c((lat1 - lat2) * p) / 2 + c(lat2 * p) * c((lat1) * p) * (1 - c(((long1 - long2) * p))) / 2;
        const distance = 12742 * Math.asin(Math.sqrt(a));
        return distance;
        
    } else {
        const distance = await getDirectionLength(origin.id, destination.id, transitModes.includes(travel));
        return distance;
    }
}