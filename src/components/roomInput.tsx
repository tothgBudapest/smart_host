import { Grid, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import ROOM_TYPE from '@/constants/room-types.constant';
import AccountCircle from '@mui/icons-material/AccountCircle';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import SavingsIcon from '@mui/icons-material/Savings';
import { useTranslation } from 'next-i18next';
import { useStores } from '@/stores/stores';
import { observer } from 'mobx-react';

interface ComponentProps {
    type: keyof typeof ROOM_TYPE;
}

const RoomInput = ({ type }: ComponentProps) => {
    const { occupancyStore } = useStores();
    const { t } = useTranslation();
    const [value, setValue] = React.useState('');

    React.useEffect(() => {
        if (!occupancyStore.occupancyResult) {
            setValue('');
        }
    }, [occupancyStore.occupancyResult]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = Number.parseInt(e.target.value);
        setValue(e.target.value);
        switch (type) {
            case ROOM_TYPE.PREMIUM:
                occupancyStore.setPremiumFreeRooms(val);
                return;
            case ROOM_TYPE.ECONOMY:
                occupancyStore.setEconomyFreeRooms(val);
                return;
            default:
                return;
        }
    };
    return (
        <Grid container direction='row' justifyContent='center' alignItems='flex-end'>

            {type === ROOM_TYPE.PREMIUM &&
                <WorkspacePremiumIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            }
            {type === ROOM_TYPE.ECONOMY &&
                <SavingsIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            }
            <TextField
                type='number'
                data-testid={`index_input_${type.toLowerCase()}`}
                id='outlined-basic'
                label={t(type.toLowerCase())}
                variant='standard'
                onChange={handleChange}
                value={value}
            />
        </Grid>
    );
};

export default observer(RoomInput);
