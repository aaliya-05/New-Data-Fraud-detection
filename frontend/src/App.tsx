import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import MainLayout from '@/layouts/MainLayout';
import { ExecutiveSummaryPage } from '@/pages/ExecutiveSummaryPage';
import { SubscribersPage } from '@/pages/SubscribersPage';
import { RiskAnalyticsPage } from '@/pages/RiskAnalyticsPage';
import { DemaskPage } from '@/pages/DemaskPage';
import { LoginPage } from '@/pages/LoginPage';
import { AuthProvider, RequireAuth } from '@/auth/AuthContext';

const theme = createTheme({
  palette: {
    mode: 'light',
    background: { default: '#F1F5F9', paper: '#FFFFFF' },
    primary: { main: '#0072BC', dark: '#004F8C', light: '#3D9BDB', contrastText: '#FFFFFF' },
    secondary: { main: '#6CB33F', dark: '#4F9226', contrastText: '#FFFFFF' },
    success: { main: '#4F9F2F' },
    warning: { main: '#F59E0B' },
    error: { main: '#D32F2F' },
    text: { primary: '#1B2A3B', secondary: '#5B6B7D' },
    divider: '#E1E8F0',
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    subtitle1: { fontWeight: 700 },
    subtitle2: { fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          border: '1px solid #E3EAF2',
          boxShadow: '0 1px 3px rgba(16, 42, 67, 0.06)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        outlined: { borderColor: '#E3EAF2', borderRadius: 14 },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          backgroundColor: '#F8FAFC',
          '& .MuiOutlinedInput-notchedOutline': { borderColor: '#D6DFEA' },
        },
      },
    },
    MuiButton: {
      styleOverrides: { root: { borderRadius: 10 } },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { borderColor: '#EDF1F6', padding: '12px 16px' },
        head: { backgroundColor: '#F6F9FC', fontWeight: 700, color: '#1B2A3B' },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: { backgroundColor: '#F1F5F9', borderRight: '1px solid #E1E8F0' },
      },
    },
  },
});

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: 1 } },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                  path="/dashboard"
                  element={
                    <RequireAuth>
                      <MainLayout />
                    </RequireAuth>
                  }
                >
                  <Route index element={<ExecutiveSummaryPage />} />
                  <Route path="subscribers" element={<SubscribersPage />} />
                  <Route path="risk" element={<RiskAnalyticsPage />} />
                  <Route path="demask" element={<DemaskPage />} />
                </Route>
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </LocalizationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
