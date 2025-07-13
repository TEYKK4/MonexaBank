import React, {createContext} from "react";
import type {AuthContextType} from "@/context/types.ts";

export const AuthContext: React.Context<AuthContextType | undefined> = createContext<AuthContextType | undefined>(undefined);
