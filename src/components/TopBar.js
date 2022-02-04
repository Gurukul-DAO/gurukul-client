import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

export default function TopBar({ connectWallet, isConnected }) {
  let connectBtn;

  if (isConnected) {
    connectBtn = (
      <Button color="success" style={{ float: "right" }} variant="outlined">
        WALLET
      </Button>
    );
  } else {
    connectBtn = (
      <Button
        color="secondary"
        style={{ float: "right" }}
        variant="outlined"
        onClick={connectWallet}
      >
        CONNECT
      </Button>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, boxShadow: 3 }}>
      <AppBar position="static">
        <Toolbar sx={{ boxShadow: 3 }}>
          <Typography align="left" variant="h4" component="div">
            Gurukul
          </Typography>

          <Box sx={{ flexGrow: 1 }}></Box>

          <Box sx={{ flexGrow: 1 }}>
            {connectBtn}
            <Button
              color="secondary"
              style={{ float: "right", marginRight: "15px" }}
              variant="outlined"
              disabled
              onClick={connectWallet}
            >
              MY DASHBOARD
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
