import { Box, Typography } from '@mui/material';

/** Large page title with a one-line description underneath, shared by every page. */
export function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <Box sx={{ mb: 0.5 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.dark', letterSpacing: '-0.5px' }}>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
        {subtitle}
      </Typography>
    </Box>
  );
}
