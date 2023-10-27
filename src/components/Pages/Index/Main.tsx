"use client";
import HighlightText from "@/components/Text/HighlightText/HighlightText";
import selectorStyles from "./Selector.module.scss"
import wrapperStyles from "./Wrapper.module.scss"
import styles from "./Main.module.scss"


import { useRef, useState, useEffect } from 'react';
import { Location, Place, TravelType } from "@/var/types";
import locationAutoComplete from "@/modules/locationAutoComplete";
import calculateDistance from "@/modules/calculateDistance";
import { ChartOptions } from "chart.js/auto";

import dynamic from "next/dynamic";

const ReactOdometer = dynamic(
    () => import('react-odometerjs'),
    { ssr: false }
)

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    BarController,
    Title
);

import "../../../lib/odometer.scss"
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    BarController,
    Title
} from 'chart.js';

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
        checkFunction,
        ...props
    }: 
    JSX.IntrinsicElements["div"] & {
        originSetter: (value: Place) => void, 
        destinationSetter: (value: Place) => void, 
        travelTypeSetter: (value: TravelType) => void, 
        travelType: TravelType,
        checkFunction: () => void
    }): JSX.Element 
{

    
    return <div className={`flex gap2 items-center justify-between ${selectorStyles.main}`} {...props}>
        <div className="flex gap1 center inner">
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



export const options: ChartOptions<"bar"> = {
    color: "#000",
    indexAxis: 'y' as const,
    maintainAspectRatio: false,
    elements: {
        
        bar: {
            
        }
    },
    responsive: true,
    plugins: {
        legend: {
            position: 'right' as const,
        },
            title: {
            display: true,
            
            text: 'Emmissions produced in comparison to other travel types.',
        },

    },
    font: {
        size: 16,
        family: "Montserrat",
        weight: "bold"
    },
    //use 1s ease in out
    transitions: {
        x: {
            animation: {
                easing: 'easeInOutCubic',
                duration: 2000
            }
        }
    },

    //label x and y axis
    scales: {
        y: {
            title: {
                display: true,
                text: "Type of travel"
            }
        },
        x: {
            title: {
                display: true,
                text: "CO₂ Emissions (kg)"
            }
        }
    }
};

  

function Results(
    {
        distance, 
        footprint,
        visible,
        travelType,
        closeFunction
    }: 
    {
        distance: number,
        footprint: number,
        visible: boolean,
        travelType: TravelType,
        closeFunction: () => void
    }): JSX.Element 


    
{
    const animate = visible ? "aos-animate" : "";
    const refs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
    const resultsRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        refs.forEach((ref, key)=>{
            ref.current?.classList.remove("aos-animate");
        })
    }, [])

    useEffect(()=>{

        
        
        if (visible){
            resultsRef.current?.classList.add(styles.resultsShow);
            setTimeout(()=>{
                resultsRef.current?.classList.add(styles.resultsVisible);
            },50)

            setTimeout(()=>{
                refs.forEach((ref, key)=>{
                    ref.current?.classList.add("aos-animate");
                })
            }, 500)  
        }

        else {
            resultsRef.current?.classList.remove(styles.resultsVisible);
            setTimeout(()=>{
                resultsRef.current?.classList.remove(styles.resultsShow);
            },500)
        }
        
    }, [visible])
    

    const travelTypes = ["train", "bus", "car", "plane"];
    const travelEmmisions = [0.041, 0.105, 0.192, 0.255]

    const index = travelTypes.indexOf(travelType);

    const data = {
        labels: [],
        datasets: [
            {
                label: "CO2 Emissions",
                data: [],
                backgroundColor: [
                    
                ],
            },
        ],
    };


    for (let i = 0; i < travelTypes.length; i++){
        const display = travelTypes[i][0].toUpperCase() + travelTypes[i].slice(1);
        data.labels.push(display as never);
        data.datasets[0].data.push(travelEmmisions[i] * distance as never);
        let color: string = "#E84A4A70";
        if (index == i) color = "#E84A4A";
        data.datasets[0].backgroundColor.push(color as never);
    }


    const trees = parseInt((footprint/21.77).toFixed(0));
    const footprintDisplay = parseFloat(footprint.toFixed(0));
    const distanceDisplay = parseFloat(distance.toFixed(0));
    

    return <div className={`flex v ${styles.results}`} ref={resultsRef}>
        <h2 style={{margin: "2rem 0"}} className={`${animate}`} data-aos="fade-up" data-aos-delay="" ref={refs[0]} >
            Look what you did to the world!
        </h2>
        <div className={styles.resultsGrid}>
            <div className={styles.resultsObject} ref={refs[1]} data-aos="fade-up" data-aos-delay="100">
                <img src="https://images.immediate.co.uk/production/volatile/sites/7/2018/02/Earth-from-space-1-64e9a7c.jpg?resize=768,574" />
                <h3>
                    You've travelled <span className="highlight"><ReactOdometer value={distanceDisplay} duration={1000} />km </span> in total.
                </h3>
            </div>
            <div className={styles.resultsObject} ref={refs[2]} data-aos="fade-up" data-aos-delay="200">
                <img src="https://scx2.b-cdn.net/gfx/news/2023/carbon-emissions-cost.jpg" />
                <h3>
                    Your travels contributed to the release of <span className="highlight"><ReactOdometer value={footprintDisplay} duration={1000} />kg</span> of CO2 into the atmosphere
                </h3>
            </div>
            <div className={styles.resultsObject} ref={refs[3]} data-aos="fade-up" data-aos-delay="300">
                <img src="https://www.lse.ac.uk/granthaminstitute/wp-content/uploads/2018/01/CongoBrazza-credit-Bobulix-Flickr-e1676028067118.jpg" />
                <h3 style={{display: "inline"}}>
                    Over <span className="highlight"><ReactOdometer value={trees} duration={1000} /> {((trees == 1) ? "tree" : "trees")}</span> would be needed to offset your carbon footprint.
                </h3>
            </div>
            <div className={`${styles.resultsObject} ${styles.resultsObjectChart}`} ref={refs[4]} data-aos="fade-up" data-aos-delay="400">
                <div className="flex v gap1">
                    <div className="flex gap05 inner">
                        <h3>
                            {
                                (index == 0) ? "You used the best travel method in terms of CO2 emissions." :
                                "You could've used a better travel method in terms of CO2 emissions."
                            }
                        </h3>
                        <button className={`flex center gap05`} onClick={closeFunction}>
                            <i className='bx bxs-chevrons-right' />
                            <h3>
                                Try another trip?
                            </h3>
                        </button>
                    </div>
                    
                    <div className="chart">
                        <Bar data={data} options={options}/>
                    </div>
                </div>
                
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
        if (origin.id === "0" || destination.id === "0") return;

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
            <h2 className="center" data-aos="fade-up">
                Check out your <HighlightText>CO2</HighlightText> foot print
            </h2>
            <p className="center" data-aos="fade-up" data-aos-delay="100">
                Depending on how many kilometers you travel by car or by plane, we calculate the amount of CO2 emissions you produced and the consequences for our loved world.
            </p>
            <Selector originSetter={setOrigin} destinationSetter={setDestination} travelTypeSetter={setTravelType} travelType={travelType} checkFunction={check} data-aos="fade-up" data-aos-delay="200" />
            <Results distance={distance} footprint={footprint} visible={resultsVisible} travelType={travelType} closeFunction={()=>{setResultsVisible(false)}} />
        </div>
    </div>
}