import React from 'react';
import Sidebar from '@/components/Sidebar';
import { Box } from '@mui/material';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Box sx={{ display: 'flex' }}>
          <Sidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: '250px' }}>
            {children}
          </Box>
        </Box>
      </body>
    </html>
  );
};

export default Layout;
