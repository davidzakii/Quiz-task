import { useEffect, useState } from "react";
import { Alert, Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import AnnouncementCard from "../components/AnnouncementCard";
import { announcementService } from "../services/announcementService";
import type { Announcement } from "../types";

const AnnouncementsPage = () => {
  const { t } = useTranslation();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAnnouncements = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await announcementService.list();
        setAnnouncements(data);
      } catch (err) {
        console.error("Failed to fetch announcements", err);
        setError(t("messages.genericError"));
      } finally {
        setLoading(false);
      }
    };

    void loadAnnouncements();
  }, [t]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="40vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h5" fontWeight={600}>
        {t("navigation.announcements")}
      </Typography>
      {announcements.length === 0 ? (
        <Alert severity="info">{t("dashboard.noAnnouncements")}</Alert>
      ) : (
        announcements.map((announcement) => (
          <AnnouncementCard
            key={announcement._id}
            announcement={announcement}
          />
        ))
      )}
    </Stack>
  );
};

export default AnnouncementsPage;
