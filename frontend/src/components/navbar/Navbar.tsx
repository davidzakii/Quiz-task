import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Stack,
  Avatar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n/i18n";

interface NavbarProps {
  userName?: string;
  onLogout: () => void;
  onMenuClick: () => void;
}

const Navbar = ({ userName, onLogout, onMenuClick }: NavbarProps) => {
  const { t, i18n: i18nInstance } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const initials = userName
    ?.split(" ")
    .map((part) => part[0]?.toUpperCase())
    .join("")
    .slice(0, 2);

  const currentLanguage = i18nInstance.language || "en";
  const toggleLanguage = () => {
    const newLang = currentLanguage === "en" ? "ar" : "en";
    void i18n.changeLanguage(newLang);
  };

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Toolbar sx={{ gap: 2, minHeight: 80 }}>
        <IconButton
          onClick={onMenuClick}
          color="inherit"
          sx={{ display: { xs: "inline-flex", md: "none" } }}
          aria-label="Open navigation menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600 }}>
          {t("dashboard.greeting", { name: userName })}
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Button
            variant="outlined"
            size="small"
            onClick={toggleLanguage}
            sx={{ minWidth: 60 }}
          >
            {currentLanguage === "en" ? "AR" : "EN"}
          </Button>
          <Avatar sx={{ bgcolor: "primary.main" }}>{initials || "ED"}</Avatar>
          {!isMobile && (
            <Typography variant="body2" color="text.secondary">
              {userName}
            </Typography>
          )}
          <Button variant="contained" color="primary" onClick={onLogout}>
            {t("auth.logout")}
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
