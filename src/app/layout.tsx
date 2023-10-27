// =====================
// Global CSS Imports
// =====================
import './globals.scss'
import './flame.scss'

// =====================
// Theme CSS Imports
// =====================
import '@/themes/themes.scss'

// =====================
// Google Font (Inter)
// =====================
import { Montserrat } from 'next/font/google'
const montserrat = Montserrat({ subsets: ['latin'] })

// =====================
// Metadata Export
// =====================
import { metaGen, setDefaults } from 'nitlix-metagen'
setDefaults({
    title: "EcoTransport - Your commute in carbon' from",
    description: "EcoTransport - a web app that helps you to calculate your carbon footprint based on where and how you travelled! Visit us today, and find out what is stopping us from saving this planet!",
})
export const metadata = metaGen();

// =====================
// Theme Provider
// =====================
import { themeRetriever } from 'nitlix-themes'
import BodyThemeProvider from '@/themes/BodyThemeProvider'
import themeSettings from "@/themes/settings"
import Logo from '@/components/Logo/Logo'
import Aos from '@/lib/aos'


// =====================
// Layout Export
// =====================
type LayoutType = {
    children: React.ReactNode
}

export default function RootLayout({ children }: LayoutType) {
    return (
        <html lang="en">
            <head>
                <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
            </head>
            <BodyThemeProvider className={montserrat.className} themeRetriever={themeRetriever(themeSettings)}>
                <Aos />
                <main className='_eco'>
                    {children}
                </main>
            </BodyThemeProvider>
        </html>
    )
}
