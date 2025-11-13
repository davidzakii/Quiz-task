import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const mockCourses = [
  {
    id: "course-1",
    title: "Advanced Mathematics",
    instructor: "Dr. Sarah Milton",
    progress: "80% complete",
  },
  {
    id: "course-2",
    title: "Modern Physics",
    instructor: "Prof. James Carter",
    progress: "45% complete",
  },
  {
    id: "course-3",
    title: "Data Structures",
    instructor: "Dr. Maria Gomez",
    progress: "60% complete",
  },
];

const CoursesPage = () => {
  const { t } = useTranslation();

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h5" fontWeight={600}>
          {t("navigation.courses")}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Review your enrolled courses and track your completion status.
        </Typography>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
          gap: 3,
        }}
      >
        {mockCourses.map((course) => (
          <Card key={course.id} elevation={0} variant="outlined">
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                {course.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Instructor: {course.instructor}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Progress: {course.progress}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Stack>
  );
};

export default CoursesPage;

