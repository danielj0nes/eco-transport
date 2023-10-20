import Logo from "@/components/Logo/Logo";
import Main from "@/components/Pages/Index/Main";
import { Translations } from "@/i18n/translations";
import { getLocale } from "nitlix-i18n"



export default function(){
    return <>
        <Logo />
        <Main />
    </>
}
