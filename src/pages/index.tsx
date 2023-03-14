import { Stack, Container, Box, Button, Typography, Grid, TextField } from '@mui/material';
import PsychologyIcon from '@mui/icons-material/Psychology';
import CalculationResultRow from '@/components/calculationResultRow';
import RoomInput from '@/components/roomInput';
import { GITHUB_GUESTS_MOCK_URL } from '@/constants/resources-url.constant';
import React from 'react';
import calculateRoomOccupancy from '@/utils/roomCalculator';
import { useStores } from '@/stores/stores';
import { observer } from 'mobx-react';
import ROOM_TYPE from '@/constants/room-types.constant';

interface ResultProps {
  freeRooms: number;
  roomUsage: number;
  profit: number;
}

interface PageProps {
  guests: string;
}

export async function getStaticProps() {
  const res = await fetch(GITHUB_GUESTS_MOCK_URL);
  const guests = await res.json();
  return {
    props: {
      guests,
    },
  }
}

const Home = (props: PageProps) => {
  const { occupancyStore } = useStores();
  const guests = JSON.parse(JSON.stringify(props.guests).replaceAll("\\s", ""));
  let result = null;

  const calcHandler = () => {
    if(occupancyStore.freePremiumRooms && occupancyStore.freeEconomyRooms) {
      result = calculateRoomOccupancy(guests, occupancyStore.freePremiumRooms, occupancyStore.freeEconomyRooms);
      occupancyStore.setOccupancyData({
        premium: {
          usage: result.occupiedPremiumRooms,
          profit: result.premiumProfit
        },
        economy: {
          usage: result.occupiedEconomyRooms,
          profit: result.economyProfit
        }
      })
    }
  }

  const clearHandler = () => {
    occupancyStore.clear();
  }

  return (
    <Container maxWidth="lg">
      <Stack mt={5} spacing={4} direction="column" justifyContent="center" alignItems="center">
        <Grid container alignItems="center" justifyContent="center" spacing={2}>
          <Grid item>
            <Typography variant="h2">Smart Host</Typography>
          </Grid>
          <Grid item>
            <PsychologyIcon sx={{ fontSize: 70 }} />
          </Grid>
        </Grid>
        <Box>
          <Typography>Find out how much you can make with your available rooms!</Typography>
        </Box>
        <Grid container alignItems="center" justifyContent="center" spacing={2}>
          <Grid item>
            <RoomInput type={ROOM_TYPE.PREMIUM}/>
          </Grid>
          <Grid item>
            <RoomInput type={ROOM_TYPE.ECONOMY}/>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={calcHandler}>Calculate</Button>
            <Button onClick={clearHandler}>Clear</Button>
          </Grid>
        </Grid>
        {occupancyStore.occupancyResult &&
            <>
                <Typography>Results</Typography>
                <CalculationResultRow roomType={ROOM_TYPE.PREMIUM}/>
                <CalculationResultRow roomType={ROOM_TYPE.ECONOMY}/>
            </>
        }
      </Stack>
    </Container>
  );
};

export default observer(Home);
