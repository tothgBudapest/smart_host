import { Stack, Container, Box, Button, Typography, Grid, TextField } from '@mui/material';
import PsychologyIcon from '@mui/icons-material/Psychology';
import CalculationResultRow from '@/components/calculationResultRow';
import { GITHUB_GUESTS_MOCK_URL } from '@/constants/resources-url.constant';
import React from 'react';
import calculateRoomOccupancy from '@/utils/roomCalculator';

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

export default function Home(props: PageProps) {
  const [premium, setPremium] = React.useState<number>(0);
  const [economy, setEconomy] = React.useState<number>(0);
  const [premiumResult, setPremiumResult] = React.useState<ResultProps | null>(null);
  const [economyResult, setEconomyResult] = React.useState<ResultProps | null>(null);
  const guests = JSON.parse(JSON.stringify(props.guests).replaceAll("\\s", ""));
  let result = null;

  const calcHandler = () => {
    result = calculateRoomOccupancy(guests, premium, economy);
    setPremiumResult({freeRooms: premium, roomUsage: result.occupiedPremiumRooms, profit: result.premiumProfit});
    setEconomyResult({freeRooms: economy, roomUsage: result.occupiedEconomyRooms, profit: result.economyProfit});
  }

  const clearHandler = () => {
    setEconomy(0);
    setEconomyResult(null);
    setPremium(0);
    setPremiumResult(null);
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
            <TextField
              type="number"
              id="outlined-basic"
              label={'Premium Rooms'}
              variant="outlined"
              onChange={(e) => setPremium(e.target.value as unknown as number)}
              value={premium}
            />
          </Grid>
          <Grid item>
            <TextField
              type="number"
              id="outlined-basic"
              label={'Economy Rooms'}
              variant="outlined"
              onChange={(e) => setEconomy(e.target.value as unknown as number)}
              value={economy}
            />
          </Grid>
          <Grid item>
            <Button onClick={calcHandler}>Calculate</Button>
            <Button onClick={clearHandler}>Clear</Button>
          </Grid>
        </Grid>
        {premiumResult && economyResult &&
            <>
                <Typography>Results</Typography>
                <CalculationResultRow title="Premium Rooms" result={premiumResult}/>
                <CalculationResultRow title="Economy Rooms" result={economyResult}/>
            </>
        }
      </Stack>
    </Container>
  );
};
