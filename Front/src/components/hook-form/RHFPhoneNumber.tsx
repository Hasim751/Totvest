import MuiPhoneNumber from 'material-ui-phone-number';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
  name: string;
  label: string;
};

export const RHFPhoneNumber: FC<Props> = ({ name, label }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ...field }, fieldState: { error } }) => (
        <MuiPhoneNumber
          defaultCountry={'in'}
          {...field}
          variant="outlined"
          label={label}
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  );
};
