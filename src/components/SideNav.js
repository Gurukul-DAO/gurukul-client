import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { theme } from "../Theme";

export default function SideNav() {

  // const [open, setOpen] = useState(false);

  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };

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
      <List>

        <ListItemButton        >
          <ListItemIcon>
            <UnpublishedIcon />
          </ListItemIcon>
          <ListItemText
            primary="Unpublished"
          />
        </ListItemButton>

        <ListItemButton        >
          <ListItemIcon>
            <CheckCircleIcon />
          </ListItemIcon>
          <ListItemText
            primary="Published"
          />
        </ListItemButton>

        <ListItemButton        >
          <ListItemIcon>
            <MonetizationOnIcon />
          </ListItemIcon>
          <ListItemText
            primary="My $GURU"
          />
        </ListItemButton>

        {/* <ListItem button>

          <ListItemText primary="Unpublished" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText primary="Published" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText primary="My $GURU" />
        </ListItem> */}

      </List>
    </Drawer>
  );
}
