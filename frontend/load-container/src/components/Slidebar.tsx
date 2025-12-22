import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import LibraryBooksRoundedIcon from "@mui/icons-material/LibraryBooksRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import BookRoundedIcon from "@mui/icons-material/BookRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import { useLayoutContext } from "../root.component";

export default function Slidebar() {
  const { role } = useLayoutContext();

  const navigate = useNavigate();

  const iconMap: { [key: string]: React.ReactNode } = {
    // Admin Icons
    Dashboard: <DashboardCustomizeRoundedIcon />,
    "Manage Librarians": <AdminPanelSettingsRoundedIcon />,
    "Manage Books": <LibraryBooksRoundedIcon />,
    "Audit System": <LibraryBooksRoundedIcon />,
    Reports: <AssessmentRoundedIcon />,

    // User/Member Icons
    "My Books": <BookRoundedIcon />,
    "Search Books": <SearchRoundedIcon />,
    "Request New Books": <AutoAwesomeRoundedIcon />,

    // Librarian Icons
    "Manage Members": <PeopleRoundedIcon />,
    "Issued Books": <AddCircleRoundedIcon />,
  };

  const navItems = (role: string) => {
    const items: { [key: string]: string[] } = {
      admin: ["Dashboard", "Manage Librarians"],
      member: ["Dashboard", "Search Books", "My Books"],
      librarian: [
        "Dashboard",
        "Manage Books",
        "Manage Members",
        "Issued Books",
      ],
    };
    return items[role] || [];
  };

  const DrawerList = (
    <Box sx={{ width: 250, padding: 2 }} role="presentation">
      <List>
        {navItems(role).map((text: string) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(`${role}/${text.toLowerCase().replace(/\s+/g, "-")}`);
              }}
              sx={{
                "&:hover": {
                  backgroundColor: "#1a1a1a",
                },
              }}
            >
              <ListItemIcon sx={{ color: "#ffffff" }}>
                {iconMap[text] || <DashboardCustomizeRoundedIcon />}
              </ListItemIcon>
              <ListItemText
                primary={text}
                sx={{
                  "& .MuiTypography-root": {
                    color: "#ffffff",
                    fontFamily: "Montserrat, sans-serif",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 250,
        "& .MuiDrawer-paper": {
          backgroundColor: "#000000",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 4,
          px: 2,
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Box
          sx={{
            width: 48,
            height: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "12px",
          }}
        >
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="28px"
            height="28px"
            viewBox="0 0 11 11"
          >
            <path
              fill="white"
              d="M0,1v7c3.26,0,5.4902,2,5.4902,2S7.76,8,11,8V1C7,1,5.4902,2.7246,5.4902,2.7246S4,1,0,1z M1,2c1.1953-0.0313,
                  3.053,0.4015,4,1.3477L5.5,4L6,3.3477C6.9615,2.4183,8.8009,1.9878,10,2v5C8,7,6.6456,7.8564,5.4902,8.7812C4.3506,
                  7.8533,3,7,1,7V2z M2,3.3027v0.1816c0.8234,0.1688,2.0997,0.6868,3,1.1758V4.4316C4.0828,3.9535,2.8241,3.46,2,
                  3.3027z M9,3.3027C8.1759,3.46,6.9172,3.9535,6,4.4316v0.2285c0.9003-0.489,2.1766-1.007,3-1.1758V3.3027z M2,
                  4.2227v0.1816c0.8217,0.1539,2.0985,0.6584,3,1.1328V5.3418C4.0827,4.8663,2.8238,4.3752,2,4.2227z M9,
                  4.2227C8.1762,4.3752,6.9173,4.8663,6,5.3418v0.1953c0.9015-0.4744,2.1783-0.9789,3-1.1328V4.2227z M2,
                  5.1172v0.1816c0.8216,0.1547,2.0984,0.659,3,1.1328V6.2363C4.0825,5.7614,2.8236,5.2707,2,5.1172z M9,5.1172C8.1764,
                  5.2707,6.9175,5.7614,6,6.2363v0.1953c0.9016-0.4738,2.1784-0.9781,3-1.1328V5.1172z M2,6v0.1816C2.8201,6.322,4.097,
                  6.811,5,7.2695V7.1191C4.0825,6.6445,2.8236,6.1538,2,6z M9,6C8.1764,6.1538,6.9175,6.6445,6,7.1191v0.1504C6.903,
                  6.811,8.1799,6.322,9,6.1816V6z"
            />
          </svg>
        </Box>
        <Typography
          variant="h6"
          sx={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 600,
            color: "#ffffff",
            letterSpacing: 1.2,
            fontSize: "0.95rem",
          }}
        >
          GTN LIBRARY
        </Typography>
      </Box>
      <Divider sx={{ backgroundColor: "#ffffff", opacity: 0.2 }} />
      {DrawerList}
    </Drawer>
  );
}
