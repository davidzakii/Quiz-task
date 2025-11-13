import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  Alert,
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useAuth } from "../context/AuthContext";

interface RegisterFormState {
  name: string;
  email: string;
  password: string;
}

const RegisterPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { registerUser } = useAuth(); // تأكد أن عندك دالة registerUser في AuthContext
  const [form, setForm] = useState<RegisterFormState>({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange =
    (field: keyof RegisterFormState) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await registerUser(form);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error("Registration failed", err);
      setError(t("auth.error"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      component="section"
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="background.default"
      px={2}
    >
      <Paper
        component="form"
        elevation={6}
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          maxWidth: 420,
          p: { xs: 4, md: 6 },
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Stack spacing={1}>
          <Typography variant="h4" fontWeight={700}>
            {t("auth.createAccount") || "Create Account"}
          </Typography>
        </Stack>

        {error && <Alert severity="error">{error}</Alert>}
        {success && (
          <Alert severity="success">
            {t("auth.registerSuccess") || "Account created! Redirecting..."}
          </Alert>
        )}

        <Stack spacing={2}>
          <TextField
            label="Name"
            value={form.name}
            onChange={handleChange("name")}
            required
            fullWidth
          />
          <TextField
            label="Email"
            type="email"
            value={form.email}
            onChange={handleChange("email")}
            required
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={form.password}
            onChange={handleChange("password")}
            required
            fullWidth
          />
        </Stack>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disabled={submitting}
        >
          {submitting ? <CircularProgress size={24} /> : "Register"}
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/login")}
        >
          Back to Login
        </Button>
      </Paper>
    </Box>
  );
};

export default RegisterPage;
