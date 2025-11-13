import { Card, CardContent, Typography, Stack, Chip } from "@mui/material";
import { useMemo } from "react";
import type { Announcement } from "../types";

interface AnnouncementCardProps {
  announcement: Announcement;
}

const AnnouncementCard = ({ announcement }: AnnouncementCardProps) => {
  const createdAt = useMemo(() => {
    if (!announcement.createdAt) return "-";
    return new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(new Date(announcement.createdAt));
  }, [announcement.createdAt]);

  const content = announcement.content || "";

  const semesterName =
    typeof announcement.semesterId === "object"
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ? (announcement.semesterId as any).name
      : undefined;

  return (
    <Card elevation={0} variant="outlined">
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6" fontWeight={600}>
            {announcement.title}
          </Typography>
          <Chip label={createdAt} size="small" />
        </Stack>

        {semesterName && (
          <Typography variant="caption" color="text.secondary">
            Semester: {semesterName}
          </Typography>
        )}

        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AnnouncementCard;
