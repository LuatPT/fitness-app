import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

export default function DateTimePickers() {
  const [value, setValue] = React.useState<Date | null>(
    new Date(),
  );

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  return (
    <div className="container" style={{maxWidth: "500px"}}>
    <LocalizationProvider dateAdapter={AdapterMoment }>
      <Stack spacing={3}>
        <DesktopDatePicker
          label="Day"
          inputFormat="MM/dd/yyyy"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
    </div>
  );
}
