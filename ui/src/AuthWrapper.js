import {useContext, useMemo, useState} from "react";
import {AuthContext} from "./AuthContext";
import Typography from "@mui/material/Typography";
import {Container} from "@mui/material";

export function AuthState({children}) {
    // https://dmitripavlutin.com/react-context-and-usecontext/
    const [username, setUsername] = useState(null);
    const authState = useMemo(
        () => ({username, setUsername}),
        [username]
    );

    return (
        <AuthContext.Provider value={authState}>
            {children}
        </AuthContext.Provider>
    );
}

export default function AuthWrapper({children}) {
    const {username} = useContext(AuthContext);

    return username === null ?
        <Container maxWidth="sm" sx={{p: 2}}>
            <Typography variant="h4">Please login</Typography>
        </Container>
        :
        children;
}
