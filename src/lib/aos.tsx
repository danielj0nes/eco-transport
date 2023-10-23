"use client"

import "./aos.scss"

import { useEffect } from "react"
import AOS from "aos"


export default function(){
    useEffect(()=>{
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
        })
    })

    return <></>
}