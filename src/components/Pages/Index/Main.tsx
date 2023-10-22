"use client";
import HighlightText from "@/components/Text/HighlightText/HighlightText";
import selectorStyles from "./Selector.module.scss"
import wrapperStyles from "./Wrapper.module.scss"
import styles from "./Main.module.scss"


import { useRef, useState } from "react";
import { Location, Place } from "@/var/types";
import locationAutoComplete from "@/modules/locationAutoComplete";




const selectors: { icon: string, action: () => void }[] = [
    {
        icon: "bx bxs-car",
        action: () => { }
    },
    {
        icon: "bx bxs-plane",
        action: () => { }
    },
    {
        icon: "bx bxs-train",
        action: () => { }
    },
    {
        icon: "bx bxs-bus",
        action: () => { }
    }
]




type LocationSuggestionsProps = {
    suggestions?: Place[],
    setter: (value: Place) => void
}

function LocationSuggestions({suggestions=[], setter}: LocationSuggestionsProps): JSX.Element {
    
    return <div className={`flex v ${styles.suggestions} ${suggestions.length === 0 ? styles.hidden : ""}`}>
        {
            suggestions.map((item, key) => {
                return <div className={styles.suggestionsObject} key={key} onClick={() => {setter(item)}}>
                    <h3>
                        {item.name}
                    </h3>
                </div>
            })
        }
    </div>
}

function LocationInput({ text, id, ...props }: JSX.IntrinsicElements["input"] & { text: string, id: string }): JSX.Element {

    const [suggestions, setSuggestions] = useState<Place[]>([]);
    const ref = useRef<HTMLInputElement>(null);
    

    return <div className={styles.input}>
        <input 
            className={styles.input} 
            type="text" 
            placeholder={text}
            id={id}
            ref={ref}
            onInput={async (e)=>{
                const places = await locationAutoComplete(e.currentTarget.value);
                setSuggestions(places);
            }} 

            //on onfocus
            // onBlur={()=>{
            //     setSuggestions([]);
            // }}
            

            {...props} 
        />
        <div className={styles.inputBar} />
        <LocationSuggestions setter={(place: Place)=>{
            const input = document.getElementById(id) as HTMLInputElement;
            input.value = place.name;
            input.setAttribute("place_id", place.id);
            setSuggestions([]);

        }} suggestions={suggestions} />
    </div>
}

function TravelSelector({originSetter, destinationSetter}: {originSetter: (value: Location) => void, destinationSetter: (value: Location) => void}): JSX.Element {
    return <div className={`flex v gap-05 ${selectorStyles.travel}`}>
        <LocationInput text="Where did you travel from?" id="origin" />
        <LocationInput text="Where did you travel to?" id="destination" />
    </div>
}


function Selector(): JSX.Element {
    const [origin, setOrigin] = useState<Location>({});
    const [destination, setDestination] = useState<Location>({});
    const [travelType, setTravelType] = useState<"car" | "plane" | "train" | "bus">("car");

    
    return <div className={`flex gap2 items-center justify-between ${selectorStyles.main}`}>
        <div className="flex gap1 center">
            <div className={`flex center gap1 ${selectorStyles.selector}`}>
                {
                    selectors.map((item, key) => {
                        return <i key={key} className={`flex center ${selectorStyles.icon} ${item.icon}`} onClick={item.action} />
                    })
                }
            </div>
            <TravelSelector originSetter={setOrigin} destinationSetter={setDestination} />
        </div>
        <button className={`flex center gap05`}>
            <i className='bx bxs-sad' />
            <h3>
                Check
            </h3>
        </button>

    </div>
}


export default function (): JSX.Element {
    return <div className="flex v center">
        <div className={`flex v gap2 ${wrapperStyles.main}`} style={{ marginTop: "10rem" }}>
            <h2 className="center">
                Check out your <HighlightText>CO2</HighlightText> foot print
            </h2>
            <p className="center">
                Depending on how many kilometers you travel by car or by plane, we calculate the amount of CO2 emissions you produced and the consequences for our loved world.
            </p>
            <Selector />
        </div>
    </div>
}