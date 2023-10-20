"use client";
import HighlightText from "@/components/Text/HighlightText/HighlightText";
import selectorStyles from "./Selector.module.scss"
import wrapperStyles from "./Wrapper.module.scss"




const selectors: {icon: string, action: () => void}[] = [
    {
        icon: "bx bxs-car",
        action: () => {}
    },
    {
        icon: "bx bxs-plane",
        action: () => {}
    },
    {
        icon: "bx bxs-train",
        action: () => {}
    },
    {
        icon: "bx bxs-bus",
        action: () => {}
    }
]



function LocationInput({text, ...props}: JSX.IntrinsicElements["input"] & {text: string}): JSX.Element {
    return <input type="text" placeholder={text} {...props} />
}

function TravelSelector(): JSX.Element {
    return <div className={`flex v gap-05 ${selectorStyles.travel}`}>
        <LocationInput text="Where did you travel from?" />
        <LocationInput text="Where did you travel to?" />
    </div>
}


function Selector(): JSX.Element {
    return <div className={`flex gap-2 ${selectorStyles.main}`}>
        <div className={`flex center gap1 ${selectorStyles.selector}`}>
            {
                selectors.map((item, key)=>{
                    return <i key={key} className={`flex center ${selectorStyles.icon} ${item.icon}`} onClick={item.action} />
                })
            }
        </div>
    </div>
}


export default function(): JSX.Element {
    return <div className="flex v center">
        <div className={`flex v gap2 ${wrapperStyles.main}`} style={{marginTop: "10rem"}}>
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