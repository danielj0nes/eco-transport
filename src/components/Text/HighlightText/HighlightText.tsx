import styles from "./HighlightText.module.scss"

export default function({className="", children, ...props}: JSX.IntrinsicElements["span"]): JSX.Element {
    return <span className={`${className} ${styles.main}`} {...props}>
        {children}
    </span>
}