import Logo from "@/components/Logo/Logo";
import Facts from "@/components/Pages/Index/Facts/Facts";
import Main from "@/components/Pages/Index/Main";
import { Translations } from "@/i18n/translations";
import { getLocale } from "nitlix-i18n"



export default function(){
    return <>
        <Logo />
        <Main />
        <Facts />
    </>
}
