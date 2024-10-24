// DashboardFooter.js
import { Box, Container, Typography } from '@mui/material';
import React from 'react';

const DashboardFooter = () => {
  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        color: 'text.secondary',
        py: 3,
        position: 'relative',
        bottom: 0,
        width: '100%',
        borderTop: '1px solid rgba(255, 255, 255, 0.12)',
      }}
    >
      <Container maxWidth="lg">
        <Box mt={3} textAlign="center">
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default DashboardFooter;
