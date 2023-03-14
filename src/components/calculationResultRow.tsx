import { Box, Grid, TextField, Typography } from '@mui/material';
import React from 'react';

interface ResultProps {
  freeRooms: number;
  roomUsage: number;
  profit: number;
}

interface ComponentProps {
  title: string;
  result: ResultProps | null;
}

export default function CalculationResultRow({title, result}: ComponentProps) {

  return (
    <Grid container alignItems="center" justifyContent="center" spacing={2}>
      <Grid item>
        <Typography>{title}: </Typography>
        <Typography>{result?.freeRooms}</Typography>
      </Grid>
      <Grid item>
        <Typography>Usage: </Typography>
        <Typography>{result?.roomUsage}</Typography>
      </Grid>
      <Grid item>
        <Typography>Profit: </Typography>
        <Typography>{result?.profit}EUR</Typography>
      </Grid>
    </Grid>
  );
}
