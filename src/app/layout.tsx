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
import { metaGen } from 'nitlix-metagen'
export const metadata = metaGen()

// =====================
// Theme Provider
// =====================
import { themeRetriever } from 'nitlix-themes'
import BodyThemeProvider from '@/themes/BodyThemeProvider'
import themeSettings from "@/themes/settings"
import Logo from '@/components/Logo/Logo'


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
            <body className={`light ${montserrat.className}`}>
                <main className='_eco'>
                    {children} 
                </main>
            </body>
        </html>
    )
}
