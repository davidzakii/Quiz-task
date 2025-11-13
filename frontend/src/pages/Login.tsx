import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
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
import {
  useLocation,
  useNavigate,
  type Location as RouterLocation,
} from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useAuth } from "../context/AuthContext";

interface LoginFormState {
  email: string;
  password: string;
}

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, loading } = useAuth();
  const [form, setForm] = useState<LoginFormState>({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const redirectPath = useMemo(() => {
    const state = location.state as { from?: RouterLocation } | null;
    return state?.from?.pathname || "/dashboard";
  }, [location.state]);

  useEffect(() => {
    if (isAuthenticated && !submitting) {
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectPath, submitting]);

  const handleChange =
    (field: keyof LoginFormState) => (event: ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await login(form);
      navigate(redirectPath, { replace: true });
    } catch (err) {
      console.error("Login failed", err);
      setError(t("auth.error"));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading && !isAuthenticated) {
    return (
      <Box
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgcolor="background.default"
      >
        <CircularProgress />
      </Box>
    );
  }

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
            {t("auth.welcome")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("auth.subtitle")}
          </Typography>
        </Stack>

        {error ? <Alert severity="error">{error}</Alert> : null}

        <Stack spacing={2}>
          <TextField
            label={t("auth.email")}
            type="email"
            value={form.email}
            onChange={handleChange("email")}
            placeholder={t("forms.emailPlaceholder")}
            required
            fullWidth
          />
          <TextField
            label={t("auth.password")}
            type="password"
            value={form.password}
            onChange={handleChange("password")}
            placeholder={t("forms.passwordPlaceholder")}
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
          {submitting ? t("auth.loggingIn") : t("auth.login")}
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/register")}
        >
          {t("auth.register") || "Don't have an account? Register"}
        </Button>
      </Paper>
    </Box>
  );
};

export default LoginPage;
