import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";

const AdminDashboard = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        {t("dashboard.adminTitle", { defaultValue: "Admin Dashboard" })}
      </Typography>

      <Typography variant="subtitle1" mb={4}>
        {t("dashboard.welcomeAdmin", {
          defaultValue: `Welcome back, ${user?.name || "Admin"} 👋`,
        })}
      </Typography>

      {/* Dashboard Cards */}
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: "1fr",
          sm: "1fr 1fr",
          md: "repeat(4, 1fr)",
        }}
        gap={3}
      >
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6">Total Users</Typography>
          <Typography variant="h4">124</Typography>
        </Paper>

        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6">Active Courses</Typography>
          <Typography variant="h4">8</Typography>
        </Paper>

        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6">Pending Tasks</Typography>
          <Typography variant="h4">5</Typography>
        </Paper>

        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6">Announcements</Typography>
          <Typography variant="h4">3</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
