import { Box, IconButton, Paper } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CustomMenu from "./Menu";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  role?: string;
}

const Header = ({ role = "member" }: HeaderProps) => {
  const navigate = useNavigate();

  const handleNotificationClick = () => {
    console.log("Notification clicked");
  };

  const handleProfileClick = () => {
    navigate(`/${role}/profile`);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/auth/signin");
  };

  const profileMenuItems = [
    {
      label: "Profile",
      onClick: handleProfileClick,
    },
    {
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  return (
    <Paper
      sx={{
        mb: 0,
        bgcolor: "#fff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}></Box>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          {/* <IconButton size="small" onClick={handleNotificationClick} title="Notifications">
            <NotificationsIcon />
          </IconButton> */}
          <CustomMenu items={profileMenuItems} variant="text" size="small" />
        </Box>
      </Box>
    </Paper>
  );
};

export default Header;
