import { Box, TextField } from '@mui/material';
import React from 'react';

interface ComponentProps {
  title: string;
  callback?: Function;
}

export default function RoomInput({title, callback}: ComponentProps) {
  const [num, setNum] = React.useState<number | null>(null);

  return (
    <Box>
      <TextField
        type="number"
        id="outlined-basic"
        label={title}
        variant="outlined"
        onChange={(e) => setNum(e.target.value as unknown as number)}
        value={num}
      />
    </Box>
  );
}
