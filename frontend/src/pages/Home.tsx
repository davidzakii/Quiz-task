import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

import AnnouncementCard from "../components/AnnouncementCard";
import { announcementService } from "../services/announcementService";
import { quizService } from "../services/quizService";
import { semesterService } from "../services/semesterService";
import type { Announcement, Quiz, Semester } from "../types";

const HomePage = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [semesterQuizzes, setSemesterQuizzes] = useState<Quiz[]>([]);
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [selectedSemester, setSelectedSemester] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [semesterLoading, setSemesterLoading] = useState(false);
  const [semesterError, setSemesterError] = useState<string | null>(null);

  // 🔹 Load all dashboard data
  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      setError(null);
      try {
        const [quizzesData, announcementsData, semestersData] =
          await Promise.all([
            quizService.list(),
            announcementService.list(),
            semesterService.list(),
          ]);

        setQuizzes(quizzesData);
        setAnnouncements(announcementsData);
        setSemesters(semestersData);

        const defaultSemester =
          quizzesData.find((quiz) => quiz.semesterId)?.semesterId ?? "";
        setSelectedSemester(defaultSemester);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    void loadDashboard();
  }, []);

  // 🔹 Fetch quizzes by semester
  const handleStartQuiz = useCallback(async () => {
    if (!selectedSemester) {
      setSemesterError("No semester selected.");
      return;
    }
    setSemesterLoading(true);
    setSemesterError(null);
    try {
      const data = await quizService.listBySemester(selectedSemester);
      setSemesterQuizzes(data);
    } catch (err) {
      console.error(err);
      setSemesterError("Failed to fetch semester quizzes.");
    } finally {
      setSemesterLoading(false);
    }
  }, [selectedSemester]);

  useEffect(() => {
    if (!selectedSemester) return;
    void handleStartQuiz();
  }, [selectedSemester, handleStartQuiz]);

  // 🔹 Semester options
  const semesterOptions = useMemo(
    () =>
      semesters.map((s) => ({
        value: s._id ?? "",
        label: s.name,
      })),
    [semesters]
  );

  const selectedSemesterLabel = useMemo(
    () =>
      semesterOptions.find((o) => o.value === selectedSemester)?.label ?? "",
    [semesterOptions, selectedSemester]
  );

  if (loading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="60vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Stack spacing={3}>
      {/* Exam Time */}
      <Card elevation={0} variant="outlined">
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h5" fontWeight={600}>
              Exam Time
            </Typography>
            {quizzes.length === 0 ? (
              <Alert severity="info">No quizzes available.</Alert>
            ) : (
              <List disablePadding>
                {quizzes.slice(0, 5).map((quiz, idx) => (
                  <Box key={quiz._id}>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={quiz.title}
                        secondary={
                          <>
                            {quiz.semesterId &&
                              semesters.find((s) => s._id === quiz.semesterId)
                                ?.name &&
                              `Semester: ${
                                semesters.find((s) => s._id === quiz.semesterId)
                                  ?.name
                              } • `}
                            {quiz.durationMinutes
                              ? `${quiz.durationMinutes} min`
                              : ""}
                            {quiz.scheduledAt && (
                              <>
                                <br />
                                {new Intl.DateTimeFormat(undefined, {
                                  dateStyle: "medium",
                                  timeStyle: "short",
                                }).format(new Date(quiz.scheduledAt))}
                              </>
                            )}
                          </>
                        }
                      />
                    </ListItem>
                    {idx < Math.min(quizzes.length, 5) - 1 && (
                      <Divider component="li" />
                    )}
                  </Box>
                ))}
              </List>
            )}
          </Stack>
        </CardContent>
      </Card>

      {/* Announcements & Semester Quizzes */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 3,
        }}
      >
        {/* Announcements */}
        <Box>
          <Stack spacing={2}>
            <Typography variant="h6" fontWeight={600}>
              Announcements
            </Typography>
            {announcements.length === 0 ? (
              <Alert severity="info">No announcements available.</Alert>
            ) : (
              <Stack spacing={2}>
                {announcements.slice(0, 5).map((announcement) => (
                  <AnnouncementCard
                    key={announcement._id}
                    announcement={announcement}
                  />
                ))}
              </Stack>
            )}
          </Stack>
        </Box>

        {/* Semester Quizzes */}
        <Box>
          <Stack spacing={2}>
            <Typography variant="h6" fontWeight={600}>
              Start Quiz
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="semester-select-label">
                Select Semester
              </InputLabel>
              <Select
                labelId="semester-select-label"
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(String(e.target.value))}
              >
                {semesterOptions.length === 0 ? (
                  <MenuItem value="" disabled>
                    No semesters available
                  </MenuItem>
                ) : (
                  semesterOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              onClick={() => void handleStartQuiz()}
              disabled={semesterLoading || !selectedSemester}
            >
              {semesterLoading ? (
                <CircularProgress size={24} />
              ) : (
                "Load Quizzes"
              )}
            </Button>

            {semesterError && <Alert severity="error">{semesterError}</Alert>}

            {selectedSemester &&
              !semesterLoading &&
              semesterQuizzes.length > 0 && (
                <Card elevation={0} variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight={600}>
                      Quizzes for {selectedSemesterLabel}
                    </Typography>
                    <List disablePadding>
                      {semesterQuizzes.map((quiz, idx) => (
                        <Box key={quiz._id}>
                          <ListItem>
                            <ListItemText
                              primary={quiz.title}
                              secondary={
                                quiz.scheduledAt
                                  ? new Intl.DateTimeFormat(undefined, {
                                      dateStyle: "medium",
                                      timeStyle: "short",
                                    }).format(new Date(quiz.scheduledAt))
                                  : quiz.description
                              }
                            />
                          </ListItem>
                          {idx < semesterQuizzes.length - 1 && (
                            <Divider component="li" />
                          )}
                        </Box>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              )}
          </Stack>
        </Box>
      </Box>
    </Stack>
  );
};

export default HomePage;
