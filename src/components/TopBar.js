import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useMoralis } from "react-moralis";
import { Link } from "react-router-dom";
import { theme } from "../Theme";
import WalletButton from "./WalletButton";

export default function TopBar() {

  const { isAuthenticated } = useMoralis();

  let myDashboardButton;
  let myCoursesButton;
  if (isAuthenticated) {
    myDashboardButton = <Button component={Link} to={'/dashboard'} style={{ float: "right", marginRight: "15px" }} variant="outlined">
      MY DASHBOARD
    </Button>

    myCoursesButton = <Button component={Link} to={'/my-created-courses'} style={{ float: "right", marginRight: "15px" }} variant="outlined">
      MY COURSES
    </Button>
  }

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

            {myDashboardButton}
            {myCoursesButton}

          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
