import { Autocomplete, TextField, TextFieldProps } from '@mui/material';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type IProps = {
  name: string;
  label: string;
  options: object[];
  optionLabel: string;
};

type Props = IProps & TextFieldProps;

export const RHFAutocomplete: FC<Props> = ({ name, label, options, optionLabel }) => {
  const { control, setValue } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...restField }, fieldState: { error } }) => (
        <Autocomplete
          {...restField}
          options={options}
          getOptionLabel={(option: any) => option[optionLabel]}
          renderInput={(params) => <TextField inputRef={ref} {...params} label={label} error={!!error} />}
          onChange={(event, data) => setValue(restField.name, data)}
        />
      )}
    />
  );
};
