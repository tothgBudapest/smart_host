import { Box } from '@mui/material';
import { useStores } from '@/stores/stores';
import { observer } from 'mobx-react';

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Grow from '@mui/material/Grow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getStaticProps({ locale }: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale))
        }
    };
}

const OccupancyTable = () => {
    const { occupancyStore } = useStores();
    const { t } = useTranslation();
    const occupancyData = occupancyStore.getOccupancyData;
    return (

        <Box sx={{ display: 'flex' }}>
            <Grow in={!!occupancyData}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                        <TableHead>
                            <TableRow>
                                <TableCell>{t('room_type')}</TableCell>
                                <TableCell align='right'>{t('free_rooms')}</TableCell>
                                <TableCell align='right'>{t('usage')}</TableCell>
                                <TableCell align='right'>{t('profit')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {occupancyData?.map((row) => (
                                <TableRow
                                    key={row.type}
                                    data-testid={`${row.type.toLowerCase()}_row`}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component='th' scope='row'>
                                        {row.type}
                                    </TableCell>
                                    <TableCell data-testid={`${row.type.toLowerCase()}_free_rooms`} align='right'>{row?.freeRooms}</TableCell>
                                    <TableCell data-testid={`${row.type.toLowerCase()}_usage`} align='right'>{row?.usage}</TableCell>
                                    <TableCell data-testid={`${row.type.toLowerCase()}_profit`} align='right'>{row?.profit.toLocaleString('de-DE', {
                                        style: 'currency',
                                        currency: 'EUR',
                                        maximumFractionDigits: 0
                                    })}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grow>
        </Box>
    );
};


export default observer(OccupancyTable);
