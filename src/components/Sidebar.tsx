"use client"

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SearchIcon from '@mui/icons-material/Search';
import GroupIcon from '@mui/icons-material/Group';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { usePathname, useRouter } from 'next/navigation';

const Sidebar = () => {
  const [open, setOpen] = useState<boolean>(false); 
  const [overflow, setOverflow] = useState<string>('hidden');
  const router  = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setOverflow('auto');
      }, 300); 
      return () => clearTimeout(timer);
    } else {
      setOverflow('hidden');
    }
  }, [open]);

  return (
    <Box
      sx={{
        width: open ? 250 : 50,
        height: '100vh',
        position: 'fixed',
        transition: 'width 0.3s',
        overflow: overflow 
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Paper elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <List component="nav" aria-label="main mailbox folders">
          <ListItemButton 
            selected={pathname === '/'} 
            onClick={() => router.push('/')}
          >
            <ListItemIcon><HomeIcon /></ListItemIcon>
            {open && <ListItemText primary="Home" />}
          </ListItemButton>
          <ListItemButton
            selected={pathname === '/library'} 
            onClick={() => router.push('/library')} 
         >
            <ListItemIcon><LibraryBooksIcon /></ListItemIcon>
            {open && <ListItemText primary="Library" />}
          </ListItemButton>
          <ListItemButton 
            selected={pathname === '/search'} 
            onClick={() => router.push('/search')}
          >
            <ListItemIcon><SearchIcon /></ListItemIcon>
            {open && <ListItemText primary="Search" />}
          </ListItemButton>
          <ListItemButton
            selected={pathname === '/community'} 
            onClick={() => router.push('/community')}
          >
            <ListItemIcon><GroupIcon /></ListItemIcon>
            {open && <ListItemText primary="Community" />}
          </ListItemButton>
        </List>
        <Box sx={{ mt: 'auto', width: '100%' }}>
          <List>
            <ListItemButton 
              selected={pathname === '/profile'} 
              onClick={() => router.push('/profile')}
            >
              <ListItemIcon><AccountCircleIcon /></ListItemIcon>
              {open && <ListItemText primary="Profile" />}
            </ListItemButton>
            <ListItemButton 
              selected={pathname === '/signout'}
              onClick={() => router.push('/signout')}
            >
              <ListItemIcon><ExitToAppIcon /></ListItemIcon>
              {open && <ListItemText primary="Sign Out" />}
            </ListItemButton>
          </List>
        </Box>
      </Paper>
    </Box>
  );
}

export default Sidebar;
