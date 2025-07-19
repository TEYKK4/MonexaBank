import {useAuth} from "@/context/UseAuth.ts";
import {Navigate} from "react-router-dom";
import React from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const {isAuthenticated} = useAuth()

    if (!isAuthenticated) {
        console.log(isAuthenticated);
        return <Navigate to="/login" replace/>
    }


    return <>{children}</>
}
