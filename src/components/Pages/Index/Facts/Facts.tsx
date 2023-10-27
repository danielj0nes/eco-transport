import styles from "./Facts.module.scss"


const facts: {text: string, image: string, source: string}[] = [
    {
        text: "In order to stop climate change, a single person should only generate a maximum of 0.6T of CO2 per year.",
        image: "https://burst.shopifycdn.com/photos/person-silhouette-looking-at-a-sunset.jpg?width=925&format=pjpg&exif=0&iptc=0",
        source: "https://www.umweltbundesamt.de/daten/klima/treibhausgas-emissionen-in-der-europaeischen-union#pro-kopf-emissionen"
    },
    {
        text: "An average person though, unfortunately generates 7.2T of CO2 each year.",
        image: "https://confidencial.digital/wp-content/uploads/2022/11/Bosawas1.jpg",
        source: "https://www.bafu.admin.ch/bafu/en/home/topics/climate/in-brief.html"
    }
]


function Fact({
    text,
    image,
    source,
    ...props
}: JSX.IntrinsicElements["div"] & {
    text: string,
    image: string,
    source: string
}){
    return <div className={styles.fact} {...props}>
        <img src={image} />
        <h3>
            {text} <a href={source} target="_blank">(Source)</a>
        </h3>
    </div>
}



export default function(){
    return <div className={`${styles.main} flex gap2`}>
        {
            facts.map((fact, index) => <Fact key={index} {...fact} />)
        }
    </div>
}