import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  LinearProgress,
  Box,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const mockGrades = [
  { course: "Advanced Mathematics", grade: 92, credits: 3 },
  { course: "Modern Physics", grade: 88, credits: 4 },
  { course: "Data Structures", grade: 95, credits: 3 },
  { course: "History of Science", grade: 78, credits: 2 },
];

const GradebookPage = () => {
  const { t } = useTranslation();

  return (
    <Paper elevation={0} variant="outlined" sx={{ p: { xs: 2, md: 3 }, overflowX: "auto" }}>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        {t("navigation.gradebook")}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Track your performance across all enrolled modules.
      </Typography>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>Course</TableCell>
            <TableCell>Grade</TableCell>
            <TableCell>Credits</TableCell>
            <TableCell>Progress</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mockGrades.map((record) => (
            <TableRow key={record.course}>
              <TableCell>{record.course}</TableCell>
              <TableCell>{record.grade}%</TableCell>
              <TableCell>{record.credits}</TableCell>
              <TableCell>
                <Box display="flex" alignItems="center" gap={2}>
                  <Box flexGrow={1}>
                    <LinearProgress
                      variant="determinate"
                      value={record.grade}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                  <Typography variant="caption">{record.grade}%</Typography>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default GradebookPage;

