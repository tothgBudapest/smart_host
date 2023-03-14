import { Box, TextField } from '@mui/material';
import React from 'react';

interface ComponentProps {
  title: string;
  callback?: Function;
}

export default function RoomInput({title, callback}: ComponentProps) {
  const [num, setNum] = React.useState<string>();

  return (
    <Box>
      <TextField
        type="number"
        id="outlined-basic"
        label={title}
        variant="outlined"
        onChange={(e) => setNum(e.target.value)}
        value={num}
      />
    </Box>
  );
}
