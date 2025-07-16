import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {AuthProvider} from "@/context/AuthProvider.tsx";
import { ThemeProvider } from './components/theme-provider.tsx'
import {Toaster} from "sonner";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                <App/>
                <Toaster richColors position="top-right"/>
            </ThemeProvider>
        </AuthProvider>
    </StrictMode>,
)
