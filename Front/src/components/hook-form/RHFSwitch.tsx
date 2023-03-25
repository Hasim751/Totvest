// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Switch, FormControlLabel, FormControlLabelProps } from '@mui/material';

// ----------------------------------------------------------------------

interface Props extends Omit<FormControlLabelProps, 'control'> {
  name: string;
}

export function RHFSwitch({ name, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field } }) => (
        <FormControlLabel
          control={<Switch {...field} inputRef={ref} checked={field.value} />}
          {...other}
        />
      )}
    />
  );
}
