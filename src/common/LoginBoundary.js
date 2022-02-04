import { useMoralis } from "react-moralis";
import NotLoggedIn from "../routes/NotLoggedIn"

export default function LoginBoundary({ children }) {
    let { isAuthenticated } = useMoralis();

    return isAuthenticated ? children : <NotLoggedIn />;
}