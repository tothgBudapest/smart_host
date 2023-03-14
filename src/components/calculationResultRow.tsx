import { Box, Grid, TextField, Typography } from '@mui/material';
import React from 'react';

interface ComponentProps {
  title: string;
  result: Array<number>;
}

export default function CalculationResultRow({title, result}: ComponentProps) {

  return (
    <Grid container alignItems="center" justifyContent="center" spacing={2}>
      <Grid item>
        <Typography>{title}: </Typography>
        <Typography>{result[0]}</Typography>
      </Grid>
      <Grid item>
        <Typography>Usage: </Typography>
        <Typography>{result[1]}</Typography>
      </Grid>
      <Grid item>
        <Typography>Profit: </Typography>
        <Typography>{result[2]}EUR</Typography>
      </Grid>
    </Grid>
  );
}
