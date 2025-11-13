import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Stack,
} from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import type { ReactNode } from "react";

export interface SidebarItem {
  label: string;
  path: string;
  icon?: ReactNode;
}

interface SidebarProps {
  items: SidebarItem[];
  variant: "permanent" | "temporary";
  open?: boolean;
  onClose?: () => void;
  onNavigate?: () => void;
}

const drawerWidth = 280;

const Sidebar = ({ items, variant, open = false, onClose, onNavigate }: SidebarProps) => {
  const location = useLocation();

  const content = (
    <Box
      role="navigation"
      sx={{
        width: { xs: drawerWidth, md: "100%" },
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
      }}
    >
      <Toolbar sx={{ minHeight: 80 }}>
        <Stack spacing={0.5}>
          <Typography variant="h5" fontWeight={600}>
            Edu Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your academic life
          </Typography>
        </Stack>
      </Toolbar>
      <List sx={{ flexGrow: 1 }}>
        {items.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.path !== "/dashboard" && location.pathname.startsWith(item.path));

          return (
            <ListItemButton
              key={item.path}
              component={NavLink}
              to={item.path}
              selected={isActive}
              onClick={onNavigate}
              sx={{
                borderRadius: 2,
                mx: 2,
                my: 0.5,
                "&.Mui-selected": {
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  "&:hover": {
                    bgcolor: "primary.dark",
                  },
                },
              }}
            >
              {item.icon ? (
                <Box component="span" sx={{ display: "inline-flex", mr: 2 }}>
                  {item.icon}
                </Box>
              ) : null}
              <ListItemText primary={item.label} />
            </ListItemButton>
          );
        })}
      </List>
      <Box component="footer" px={3} py={2}>
        <Typography variant="caption" color="text.secondary">
          © {new Date().getFullYear()} Edu Dashboard
        </Typography>
      </Box>
    </Box>
  );

  if (variant === "permanent") {
    return (
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          height: "100%",
          borderRight: 1,
          borderColor: "divider",
        }}
      >
        {content}
      </Box>
    );
  }

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        display: { xs: "block", md: "none" },
        "& .MuiDrawer-paper": {
          width: drawerWidth,
        },
      }}
    >
      {content}
    </Drawer>
  );
};

export default Sidebar;
