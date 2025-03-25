import { Box, Typography, Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useState } from 'react';

interface PlanCardProps {
  plan: {
    name: string;
    price: number;
    period: string;
    features: string[];
  };
}

export const PlanCard = ({ plan }: PlanCardProps) => {
  const [loading, setLoading] = useState(false);

  const handleSelect = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/create-checkout', { method: 'POST' });
      const data = await res.json();
      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        alert('Failed to initiate payment');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: 300,
        height: 500,
        borderRadius: 4,
        p: 4,
        bgcolor: '#F9F9F9',
        boxShadow: '0px 4px 12px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h6" fontWeight={600} color="text.primary">
        {plan.name}
      </Typography>
      <Box display="flex" alignItems="baseline" mt={1}>
        <Typography variant="h4" fontWeight={700} color="text.primary">
          ${plan.price}
        </Typography>
        <Typography variant="subtitle1" ml={1} fontWeight={500} color="text.primary">
          /{plan.period}
        </Typography>
      </Box>


      <Box mt={3} flexGrow={1}>
        {plan.features.map((feature, idx) => (
          <Box key={idx} display="flex" alignItems="center" mb={1}>
            <CheckIcon fontSize="small" color="success" sx={{ mr: 1 }} />
            <Typography variant="body2" color="text.primary">{feature}</Typography>
          </Box>
        ))}
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSelect}
        disabled={loading}
        sx={{ mt: 'auto' }}
      >
        {loading ? 'Redirecting...' : 'Choose Plan'}
      </Button>
    </Box>
  );
};
