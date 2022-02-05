import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SchoolIcon from '@mui/icons-material/School';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { theme } from "../Theme";
import { Link } from "react-router-dom";
import { HistoryEdu } from "@mui/icons-material";

export default function SideNav({ dashboard }) {

  // const [open, setOpen] = useState(false);

  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };

  let navigationItems;
  if (dashboard) {
    navigationItems = <List>

      <ListItemButton component={Link} to={'/dashboard'}>
        <ListItemIcon>
          <SchoolIcon />
        </ListItemIcon>
        <ListItemText
          primary="Enrolled Courses"
        />
      </ListItemButton>

      <ListItemButton component={Link} to={'/my-created-courses'}>
        <ListItemIcon>
          <HistoryEdu />
        </ListItemIcon>
        <ListItemText
          primary="Created Courses"
        />
      </ListItemButton>

      <ListItemButton component={Link} to={'/nfts'}>
        <ListItemIcon>
          <VerifiedUserIcon />
        </ListItemIcon>
        <ListItemText
          primary="My NFT's"
        />
      </ListItemButton>

      <ListItemButton component={Link} to={'/tokens'}>
        <ListItemIcon>
          <MonetizationOnIcon />
        </ListItemIcon>
        <ListItemText
          primary="My $GURU"
        />
      </ListItemButton>
    </List>
  }

  const DrawerHeader = styled("div")(({ theme }) => ({
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
  }));

  return (
    <Drawer
      sx={{
        width: theme.palette.drawer.width,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: theme.palette.drawer.width,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={true}
    >
      <DrawerHeader />
      {navigationItems}
    </Drawer>
  );
}
