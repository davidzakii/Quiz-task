import {
  Box,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const performanceMetrics = [
  {
    id: "metric-1",
    title: "Overall GPA",
    value: 3.7,
    description: "Keep up the great work! You're above the cohort average.",
    progress: 82,
  },
  {
    id: "metric-2",
    title: "Attendance",
    value: "92%",
    description: "Consistent attendance improves retention and performance.",
    progress: 92,
  },
  {
    id: "metric-3",
    title: "Assignments Submitted",
    value: "18 / 20",
    description: "Complete the remaining assignments to stay on track.",
    progress: 90,
  },
];

const PerformancePage = () => {
  const { t } = useTranslation();

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          {t("navigation.performance")}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Monitor your academic indicators and identify opportunities to
          improve.
        </Typography>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          gap: 3,
        }}
      >
        {performanceMetrics.map((metric) => (
          <Card key={metric.id} elevation={0} variant="outlined">
            <CardContent>
              <Stack spacing={1.5}>
                <Typography variant="h6" fontWeight={600}>
                  {metric.title}
                </Typography>
                <Typography variant="h4" fontWeight={700}>
                  {metric.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {metric.description}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={metric.progress}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Stack>
  );
};

export default PerformancePage;
