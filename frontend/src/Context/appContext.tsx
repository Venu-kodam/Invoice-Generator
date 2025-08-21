import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import { toast } from "sonner";

interface AppContextType {
    navigate: NavigateFunction;
    token: string | null;
    setToken: (token: string) => void;
    logout: () => void;
    API_BASE_URL: string;
}

// Props for the provider
interface AppContextProviderProps {
    children: ReactNode;
}


const AppContext = createContext<AppContextType | null>(null)

export default function AppContextProvider({ children }: AppContextProviderProps) {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string
    const navigate = useNavigate()
    const [token, setToken] = useState(localStorage.getItem('token'))

    //function to logout
    const logout = () => {
        localStorage.removeItem('token')
        toast.error("User Logged out")
        setToken('')
    }

    useEffect(()=>{
        setToken(token)
    },[token])
    const value: AppContextType = {
        navigate, token, setToken, API_BASE_URL,logout
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )

}

export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppContextProvider");
    }
    return context;
}