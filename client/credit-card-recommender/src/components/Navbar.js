import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CreditCardIcon from '@mui/icons-material/CreditCard';

function Navbar() {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <CreditCardIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Credit Card Recommender
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Button color="inherit" onClick={() => navigate('/')}>
            Start Over
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 