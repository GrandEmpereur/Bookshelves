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

function Sidebar() {
  const [open, setOpen] = useState(false); 
  const [overflow, setOverflow] = useState('hidden');

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
          <ListItemButton>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            {open && <ListItemText primary="Home" />}
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon><LibraryBooksIcon /></ListItemIcon>
            {open && <ListItemText primary="Library" />}
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon><SearchIcon /></ListItemIcon>
            {open && <ListItemText primary="Search" />}
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon><GroupIcon /></ListItemIcon>
            {open && <ListItemText primary="Community" />}
          </ListItemButton>
        </List>
        {/* Box to push Profile and Sign Out to the bottom */}
        <Box sx={{ mt: 'auto', width: '100%' }}>
          <List>
            <ListItemButton>
              <ListItemIcon><AccountCircleIcon /></ListItemIcon>
              {open && <ListItemText primary="Profile" />}
            </ListItemButton>
            <ListItemButton>
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


