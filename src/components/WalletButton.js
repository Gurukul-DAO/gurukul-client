import { Button } from "@mui/material";
import { useMoralis } from "react-moralis";

export default function WalletButton() {
    const { authenticate, logout, isAuthenticated } = useMoralis();

    let walletButton;

    if (isAuthenticated) {
        walletButton =
            <Button
                color="secondary"
                style={{ float: "right" }} variant="outlined"
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