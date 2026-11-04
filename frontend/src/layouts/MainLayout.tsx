import { NavLink, Outlet } from 'react-router-dom';
import {
  AppBar,
  Box,
  Chip,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import InsightsIcon from '@mui/icons-material/Insights';
import LockResetIcon from '@mui/icons-material/LockReset';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '@/auth/AuthContext';
import { DateRangeProvider } from '@/context/DateRangeContext';
import sltLogo from '@/assets/slt-logo.png';

const DRAWER_WIDTH = 260;
const HEADER_HEIGHT = 88;

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Executive summary', icon: <DashboardIcon />, end: true },
  { to: '/dashboard/subscribers', label: 'Subscribers', icon: <PeopleIcon /> },
  { to: '/dashboard/risk', label: 'Risk analytics', icon: <InsightsIcon /> },
  { to: '/dashboard/demask', label: 'Demask', icon: <LockResetIcon /> },
];

export default function MainLayout() {
  const { user, logout } = useAuth();

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: 'background.paper',
          color: 'primary.dark',
          borderBottom: '3px solid',
          borderColor: 'secondary.main',
        }}
      >
        <Toolbar sx={{ gap: 2, minHeight: { xs: HEADER_HEIGHT, sm: HEADER_HEIGHT }, px: { xs: 2, sm: 3 } }}>
          {/* Brand block, top left. The company logo goes in the <img> slot above the product name. */}
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 0.9 }}>
            <Box component="img" src={sltLogo} alt="SLT Digital" sx={{ height: 36, width: 'auto', display: 'block' }} />
            <Typography sx={{ fontWeight: 800, fontSize: 15, lineHeight: 1, color: 'primary.dark' }}>
              FraudVision AI
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Chip
            icon={<PersonIcon />}
            label={user}
            variant="outlined"
            sx={{ borderRadius: 20, bgcolor: '#F8FAFC', borderColor: '#D6DFEA', fontWeight: 600 }}
          />
          <Tooltip title="Sign out">
            <IconButton color="inherit" onClick={logout} aria-label="Sign out">
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: DRAWER_WIDTH, boxSizing: 'border-box' },
        }}
      >
        <Toolbar sx={{ minHeight: { xs: HEADER_HEIGHT, sm: HEADER_HEIGHT } }} />
        <List sx={{ px: 1.5, pt: 1.5 }}>
          {NAV_ITEMS.map((item) => (
            <ListItemButton
              key={item.to}
              component={NavLink}
              to={item.to}
              end={item.end}
              sx={{
                borderRadius: 4,
                mb: 0.5,
                py: 1.25,
                color: 'text.primary',
                '& .MuiListItemIcon-root': { color: 'text.secondary', minWidth: 44 },
                '& .MuiListItemText-primary': { fontWeight: 600, fontSize: 16 },
                '&:hover': { bgcolor: 'rgba(0,114,188,0.06)' },
                '&.active': {
                  bgcolor: '#DCEAF8',
                  color: 'primary.dark',
                  '& .MuiListItemIcon-root': { color: 'primary.main' },
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 4, width: `calc(100% - ${DRAWER_WIDTH}px)`, minWidth: 0 }}>
        <Toolbar sx={{ minHeight: { xs: HEADER_HEIGHT, sm: HEADER_HEIGHT } }} />
        <DateRangeProvider>
          <Outlet />
        </DateRangeProvider>
      </Box>
    </Box>
  );
}
