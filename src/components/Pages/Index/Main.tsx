"use client";
import HighlightText from "@/components/Text/HighlightText/HighlightText";
import selectorStyles from "./Selector.module.scss"
import wrapperStyles from "./Wrapper.module.scss"
import styles from "./Main.module.scss"


import { useRef, useState } from "react";
import { Location, Place, TravelType } from "@/var/types";
import locationAutoComplete from "@/modules/locationAutoComplete";
import calculateDistance from "@/modules/calculateDistance";
import ReactOdometer from "react-odometerjs";
import '../../../lib/odometer.scss'


const selectors: { icon: string, name: TravelType, action: () => void }[] = [
    {
        icon: "bx bxs-car",
        name: "car",
        action: () => { }
    },
    {
        icon: "bx bxs-plane",
        name: "plane",
        action: () => { }
    },
    {
        icon: "bx bxs-train",
        name: "train",
        action: () => { }
    },
    {
        icon: "bx bxs-bus",
        name: "bus",
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

function LocationInput({ text, id, setter, ...props }: JSX.IntrinsicElements["input"] & { text: string, id: string, setter: (value: Place) => void }): JSX.Element {

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
            setter(place);
            setSuggestions([]);

        }} suggestions={suggestions} />
    </div>
}

function TravelSelector({originSetter, destinationSetter}: {originSetter: (value: Place) => void, destinationSetter: (value: Place) => void}): JSX.Element {
    return <div className={`flex v gap-05 ${selectorStyles.travel}`}>
        <LocationInput text="Where did you travel from?" id="origin" setter={originSetter} />
        <LocationInput text="Where did you travel to?" id="destination" setter={destinationSetter} />
    </div>
}



function Selector(
    {   originSetter, 
        destinationSetter, 
        travelTypeSetter, 
        travelType,
        checkFunction
    }: 
    {
        originSetter: (value: Place) => void, 
        destinationSetter: (value: Place) => void, 
        travelTypeSetter: (value: TravelType) => void, 
        travelType: TravelType,
        checkFunction: () => void
    }): JSX.Element 
{

    
    return <div className={`flex gap2 items-center justify-between ${selectorStyles.main}`}>
        <div className="flex gap1 center">
            <div className={`flex center gap1 ${selectorStyles.selector}`}>
                {
                    selectors.map((item, key) => {
                        return <i key={key} className={`flex center ${selectorStyles.icon} ${item.icon} ${(travelType == item.name ? selectorStyles.iconSelected : "")}`} onClick={() => { travelTypeSetter(item.name as TravelType) }} />
                    })
                }
            </div>
            <TravelSelector originSetter={originSetter} destinationSetter={destinationSetter} />
        </div>
        <button className={`flex center gap05`} onClick={checkFunction}>
            <i className='bx bxs-sad' />
            <h3>
                Check
            </h3>
        </button>

    </div>
}


function Results(
    {
        distance, 
        footprint,
        visible
    }: 
    {
        distance: number,
        footprint: number,
        visible: boolean
    }): JSX.Element 
{
    return <div className={`flex v ${styles.results} ${visible ? "" : styles.hidden}`}>
        <h2 style={{margin: "2rem 0"}}>
            Look what you did to the world!
        </h2>
        <div className={styles.resultsGrid}>
            <div className={styles.resultsObject}>
                <img src="https://images.immediate.co.uk/production/volatile/sites/7/2018/02/Earth-from-space-1-64e9a7c.jpg?resize=768,574" />
                <h3>
                    You've travelled <span className="highlight"><ReactOdometer value={parseInt((distance).toFixed(0))} duration={1000} />km*</span>
                </h3>
            </div>
            <div className={styles.resultsObject}>
                <img src="https://scx2.b-cdn.net/gfx/news/2023/carbon-emissions-cost.jpg" />
                <h3>
                    Your travels contributed to the release of <span className="highlight"><ReactOdometer value={parseFloat(footprint.toFixed(0))} duration={1000} />kg*</span> of CO2 into the atmosphere
                </h3>
            </div>
            <div className={styles.resultsObject}>
                <img src="https://www.lse.ac.uk/granthaminstitute/wp-content/uploads/2018/01/CongoBrazza-credit-Bobulix-Flickr-e1676028067118.jpg" />
                <h3 style={{display: "inline"}}>
                    Over <span className="highlight"><ReactOdometer value={parseInt((footprint/0.068).toFixed(0))} duration={1000} /> trees</span> would be needed to offset your carbon footprint.
                </h3>
            </div>
        </div>

    </div>
}



export default function (): JSX.Element {
    const [resultsVisible, setResultsVisible] = useState<boolean>(false);
    const [origin, setOrigin] = useState<Place>({
        name: "E",
        id: "0",
    })
    const [destination, setDestination] = useState<Place>({
        name: "E",
        id: "0",
    })
    const [travelType, setTravelType] = useState<TravelType>("car");

    const [distance, setDistance] = useState<number>(0);
    const [footprint, setFootprint] = useState<number>(0);


    async function check(){
        const {
            distance,
            footprint
        } = await calculateDistance(origin, destination, travelType);

        setDistance(distance);
        setFootprint(footprint);
        setResultsVisible(true);
    }




    return <div className="flex v center">
        <div className={`flex v gap2 ${wrapperStyles.main}`} style={{ marginTop: "10rem" }}>
            <h2 className="center">
                Check out your <HighlightText>CO2</HighlightText> foot print
            </h2>
            <p className="center">
                Depending on how many kilometers you travel by car or by plane, we calculate the amount of CO2 emissions you produced and the consequences for our loved world.
            </p>
            <Selector originSetter={setOrigin} destinationSetter={setDestination} travelTypeSetter={setTravelType} travelType={travelType} checkFunction={check} />
            <Results distance={distance} footprint={footprint} visible={resultsVisible} />
        </div>
    </div>
}