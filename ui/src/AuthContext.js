import {createContext} from "react";

export const AuthContext = createContext({username: null, setUsername: (string) => {}});

