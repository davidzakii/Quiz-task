import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const mockSchedule = [
  { day: "Monday", course: "Mathematics II", time: "09:00 - 10:30", room: "Room 204" },
  { day: "Tuesday", course: "Physics Lab", time: "11:00 - 12:30", room: "Lab 3" },
  { day: "Wednesday", course: "Computer Science", time: "13:00 - 14:30", room: "Room 108" },
  { day: "Thursday", course: "History of Science", time: "10:00 - 11:30", room: "Auditorium" },
  { day: "Friday", course: "Statistics", time: "09:30 - 11:00", room: "Room 305" },
];

const SchedulePage = () => {
  const { t } = useTranslation();

  return (
    <Paper elevation={0} variant="outlined" sx={{ p: { xs: 2, md: 3 }, overflowX: "auto" }}>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        {t("navigation.schedule")}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Stay on top of your weekly plan and never miss a class.
      </Typography>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>Day</TableCell>
            <TableCell>Course</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Room</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mockSchedule.map((slot) => (
            <TableRow key={`${slot.day}-${slot.course}`}>
              <TableCell>{slot.day}</TableCell>
              <TableCell>{slot.course}</TableCell>
              <TableCell>{slot.time}</TableCell>
              <TableCell>{slot.room}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default SchedulePage;

