import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

type RFHSelectTypes = {
  name: string;
  defaultValue?: string | number ;
  options: { value: string; name: string }[];
  label: string;
};
export function RFHSelectField({ name, options, defaultValue, label, ...other }: RFHSelectTypes) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...rest }, fieldState: { error } }) => (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{label}</InputLabel>
          <Select
            defaultValue={defaultValue}
            label="Type"
            {...rest}
            labelId="demo-simple-select-label"
            id="select"
            {...other}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
}
