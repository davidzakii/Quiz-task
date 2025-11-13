import { useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";

import Sidebar, { type SidebarItem } from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import { useAuth } from "../context/AuthContext";

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const navItems = useMemo<SidebarItem[]>(() => {
    const items: SidebarItem[] = [
      { path: "/dashboard/home", label: t("navigation.home") },
      { path: "/dashboard/schedule", label: t("navigation.schedule") },
      { path: "/dashboard/courses", label: t("navigation.courses") },
      { path: "/dashboard/gradebook", label: t("navigation.gradebook") },
      { path: "/dashboard/performance", label: t("navigation.performance") },
      {
        path: "/dashboard/announcements",
        label: t("navigation.announcements"),
      },
    ];

    if (user?.role === "admin") {
      items.unshift({
        path: "/dashboard/admin",
        label: t("navigation.dashboard"),
      });
    }

    return items;
  }, [t, user]);

  const handleCloseMobileNav = () => setMobileNavOpen(false);

  const username = user?.name || user?.email || t("dashboard.userFallback");

  return (
    <>
      <Box
        component="section"
        minHeight="100vh"
        bgcolor="background.default"
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(12, 1fr)" },
        }}
      >
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            gridColumn: { md: "span 4" },
            minHeight: "100%",
            bgcolor: "background.paper",
            borderRight: { md: 1 },
            borderColor: "divider",
          }}
        >
          <Sidebar items={navItems} variant="permanent" />
        </Box>
        <Box
          sx={{
            gridColumn: { xs: "1 / -1", md: "span 8" },
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Navbar
            userName={username}
            onLogout={logout}
            onMenuClick={() => setMobileNavOpen(true)}
          />
          <Box component="main" flexGrow={1} px={{ xs: 2, md: 1 }} py={3}>
            <Outlet />
          </Box>
        </Box>
      </Box>
      <Sidebar
        items={navItems}
        variant="temporary"
        open={mobileNavOpen}
        onClose={handleCloseMobileNav}
        onNavigate={handleCloseMobileNav}
      />
    </>
  );
};

export default DashboardLayout;
