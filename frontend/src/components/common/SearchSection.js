import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography
} from '@mui/material';

const SearchSection = ({ 
  title = "RECHERCHE", 
  children
}) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent sx={{ py: 1.5, px: 2.5 }}>
        <Box display="flex" alignItems="center" mb={1}>
          <Typography variant="h6" display="flex" alignItems="center">
            {title}
          </Typography>
        </Box>

        {children}
      </CardContent>
    </Card>
  );
};

export default SearchSection;
