import { Box, Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import { useStores } from '@/stores/stores';
import ROOM_TYPE from '@/constants/room-types.constant';
import { observer } from 'mobx-react';

interface ResultProps {
  freeRooms: number;
  roomUsage: number;
  profit: number;
}

interface ComponentProps {
  roomType: keyof typeof ROOM_TYPE;
}

const CalculationResultRow = ({roomType}: ComponentProps) => {
  const { occupancyStore } = useStores();
  const occupancy = occupancyStore.getOccupancyByRoomType(roomType);

  return (
    <Grid container alignItems="center" justifyContent="center" spacing={2}>
      <Grid item>
        <Typography>{roomType}</Typography>
        <Typography>{occupancy?.freeRooms}</Typography>
      </Grid>
      <Grid item>
        <Typography>Usage: </Typography>
        <Typography>{occupancy?.usage}</Typography>
      </Grid>
      <Grid item>
        <Typography>Profit: </Typography>
        <Typography>{occupancy?.profit}EUR</Typography>
      </Grid>
    </Grid>
  );
}

export default observer(CalculationResultRow);
