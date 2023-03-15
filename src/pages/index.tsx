import { Stack, Container, Box, Button, Typography, Grid, TextField } from '@mui/material';
import PsychologyIcon from '@mui/icons-material/Psychology';
import OccupancyTable from '@/components/occupancyTable';
import RoomInput from '@/components/roomInput';
import { GITHUB_GUESTS_MOCK_URL } from '@/constants/resources-url.constant';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import calculateRoomOccupancy from '@/utils/roomCalculator';
import { useStores } from '@/stores/stores';
import { observer } from 'mobx-react';
import ROOM_TYPE from '@/constants/room-types.constant';
import { useTranslation } from 'next-i18next';

interface PageProps {
    guests: string;
}

export async function getStaticProps({ locale }: any) {
    const res = await fetch(GITHUB_GUESTS_MOCK_URL);
    const guests = await res.json();
    return {
        props: {
            ...(await serverSideTranslations(locale)),
            guests
        }
    };
}

const Home = (props: PageProps) => {
    const { occupancyStore } = useStores();
    const { t } = useTranslation();
    let result = null;

    const getGuests = () => {
        return JSON.parse(JSON.stringify(props.guests).replaceAll('\\s', ''));
    };

    const clearHandler = () => {
        occupancyStore.clear();
    };

    const calcHandler = () => {
        if (occupancyStore.freePremiumRooms && occupancyStore.freeEconomyRooms) {
            result = calculateRoomOccupancy(getGuests(), occupancyStore.freePremiumRooms, occupancyStore.freeEconomyRooms);
            occupancyStore.setOccupancyData({
                premium: {
                    usage: result.occupiedPremiumRooms,
                    profit: result.premiumProfit
                },
                economy: {
                    usage: result.occupiedEconomyRooms,
                    profit: result.economyProfit
                }
            });
        }
    };

    return (
        <Container maxWidth='lg'>
            <Stack mt={5} spacing={3} direction='column' justifyContent='center' alignItems='center'>
                <Grid container alignItems='center' justifyContent='center' spacing={2}>
                    <Grid item>
                        <Typography data-testid="index_title" variant='h3' color='primary'>{t('title')}</Typography>
                    </Grid>
                    <Grid item>
                        <PsychologyIcon data-testid={'index_title_icon'} color='primary' sx={{ fontSize: 60 }} />
                    </Grid>
                </Grid>
                <Box>
                    <Typography data-testid={'index_description'}>{t('description')}</Typography>
                </Box>
                <Grid container alignItems='center' justifyContent='center' spacing={4}>
                    <Grid item>
                        <RoomInput type={ROOM_TYPE.PREMIUM} />
                    </Grid>
                    <Grid item>
                        <RoomInput type={ROOM_TYPE.ECONOMY} />
                    </Grid>
                    <Grid item pr={5}>
                        <Button data-testid={'index_calculate_button'} variant='contained' onClick={calcHandler} sx={{ mr: 2 }}>{t('calculate')}</Button>
                        <Button data-testid={'index_clear_button'} variant='outlined' disabled={!occupancyStore.occupancyResult}
                                onClick={clearHandler}>{t('clear')}</Button>
                    </Grid>
                </Grid>
                {occupancyStore.occupancyResult &&
                    <Box p={2}>
                        <OccupancyTable data-testid={'index_occupancy_table'} />
                    </Box>
                }
            </Stack>
        </Container>
    );
};

export default observer(Home);
