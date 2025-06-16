import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

function Recommendations() {
  const location = useLocation();
  const navigate = useNavigate();
  const recommendations = location.state?.recommendations || [];

  const handleCompare = () => {
    // TODO: Implement comparison view
  };

  const handleRestart = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Credit Card Recommendations
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Button
          variant="contained"
          startIcon={<CompareArrowsIcon />}
          onClick={handleCompare}
          sx={{ mr: 2 }}
        >
          Compare Cards
        </Button>
        <Button
          variant="outlined"
          startIcon={<RestartAltIcon />}
          onClick={handleRestart}
        >
          Start Over
        </Button>
      </Box>

      <Grid container spacing={3}>
        {recommendations.map((card, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {card.name}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {card.issuer}
                </Typography>
                <Typography variant="h5" color="primary" gutterBottom>
                  {card.annualFee}
                </Typography>
                <Typography variant="body2" paragraph>
                  {card.description}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Key Benefits:
                  </Typography>
                  <ul>
                    {card.benefits.map((benefit, idx) => (
                      <li key={idx}>
                        <Typography variant="body2">{benefit}</Typography>
                      </li>
                    ))}
                  </ul>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Card Name</TableCell>
              <TableCell>Annual Fee</TableCell>
              <TableCell>Rewards Rate</TableCell>
              <TableCell>Welcome Bonus</TableCell>
              <TableCell>Credit Score Required</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recommendations.map((card, index) => (
              <TableRow key={index}>
                <TableCell>{card.name}</TableCell>
                <TableCell>{card.annualFee}</TableCell>
                <TableCell>{card.rewardsRate}</TableCell>
                <TableCell>{card.welcomeBonus}</TableCell>
                <TableCell>{card.creditScoreRequired}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Recommendations; 