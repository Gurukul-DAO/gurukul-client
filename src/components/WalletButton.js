import { Button } from "@mui/material";
import { useMoralis } from "react-moralis";
import { theme } from "../Theme";

export default function WalletButton() {
    const { authenticate, logout, isAuthenticated } = useMoralis();

    let walletButton;

    if (isAuthenticated) {
        walletButton =
            <Button
                style={{ float: "right", color: "rgba(0, 0, 0, 0.75)", borderColor: "rgba(0, 0, 0, 0.35)" }} variant="outlined"
                onClick={() => logout()}
            >
                DISCONNECT
            </Button>;
    } else {
        walletButton =
            <Button
                color="secondary"
                style={{ float: "right" }}
                variant="outlined"
                onClick={() => authenticate({ signingMessage: "GurukulDAO Authentication" })}
            >
                CONNECT
            </Button>;
    }

    return walletButton;
}