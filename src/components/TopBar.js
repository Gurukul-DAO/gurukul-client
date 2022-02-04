import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import WalletButton from "./WalletButton";

export default function TopBar() {


  return (
    <Box sx={{ flexGrow: 1, boxShadow: 3 }}>
      <AppBar position="static">
        <Toolbar sx={{ boxShadow: 3 }}>
          <Typography align="left" variant="h4" component="div">
            Gurukul
          </Typography>

          <Box sx={{ flexGrow: 1 }}></Box>

          <Box sx={{ flexGrow: 1 }}>
            <WalletButton />
            <Button
              color="secondary"
              style={{ float: "right", marginRight: "15px" }}
              variant="outlined"
              disabled
            >
              MY DASHBOARD
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
