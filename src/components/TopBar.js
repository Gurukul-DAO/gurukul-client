import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useMoralis } from "react-moralis";
import { Link } from "react-router-dom";
import { theme } from "../Theme";
import WalletButton from "./WalletButton";

export default function TopBar() {

  const { isAuthenticated } = useMoralis();

  return (
    <Box
      sx={{
        flexGrow: 1,
        boxShadow: 3,
        position: "relative",
        zIndex: theme.zIndex.drawer + 1,
      }}
    >
      <AppBar position="static">
        <Toolbar sx={{ boxShadow: 3 }}>
          <Typography align="left" variant="h4" component={Link} to={'/'} style={{ color: theme.palette.text.primary, textDecoration: 'none' }}>
            Gurukul
          </Typography>

          <Box sx={{ flexGrow: 1 }}>
            <WalletButton />

            {isAuthenticated && <Button component={Link} to={'/dashboard'} style={{ float: "right", marginRight: "15px" }} color="secondary" variant="outlined">
              MY DASHBOARD
            </Button>}
            {isAuthenticated && <Button component={Link} to={'/'} style={{ float: "right", marginRight: "15px" }} variant="text">
              EXPLORE
            </Button>}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
