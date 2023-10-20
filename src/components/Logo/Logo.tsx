import HighlightText from "../Text/HighlightText/HighlightText"



export default function(): JSX.Element {
    return <h2>
        <HighlightText>
            CO<span className="small">2</span>checkyou!
        </HighlightText>
    </h2>
}