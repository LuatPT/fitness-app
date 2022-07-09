import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

export default function DateTimePickers(props) {
  const {handleChange} = props;
  const [value, setValue] = React.useState<Date | null>(
    new Date(),
  );

  const handleChangeDatePicker =  (newValue: Date | null) => {
    setValue(newValue);
    handleChange(newValue) 
  };

  return (
    <div className="container" style={{maxWidth: "500px"}}>
    <LocalizationProvider dateAdapter={AdapterDateFns }>
      <Stack spacing={3}>
        <DesktopDatePicker
          label="Day"
          inputFormat="dd/MM/yyyy"
          value={value}
          onChange={handleChangeDatePicker}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
    </div>
  );
}
