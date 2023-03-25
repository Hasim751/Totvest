import { LoadingButton } from '@mui/lab';
import { Box, Button, DialogActions, Grid, IconButton, Tooltip } from '@mui/material';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { boxGridSx } from '../../../utils/CommonSX';
import { useGeneral } from '../../../hooks/database/useGeneral';
import { Address, AddressType } from '../../../@types/address';
import { useErrorFocus } from '../../../hooks/utilityHooks/useErrorFocus';
import { HookForm } from '../../../components/hook-form/HookForm';
import { RHFTextField } from '../../../components/hook-form/RHFTextField';
import Iconify from '../../../components/iconify/Iconify';
import { STATE_DATA } from '../../../_mock/_stateData';

import { yupResolver } from '@hookform/resolvers/yup';
import { NewAddressSchema } from '../../../validation/yupValidation';
import { RHFAutocomplete } from 'src/components/hook-form';

type Props = {
  defaultAddress: Address | null;
  addressType: AddressType;
  handleCloseModal: () => void;
  addAddress: (address: Address) => void;
  editAddress: (address: Address) => void;
  removeAddress: (address_id: string) => void;
};
export const AddressForm: FC<Props> = ({
  defaultAddress,
  addressType,
  handleCloseModal,
  addAddress,
  editAddress,
  removeAddress,
}) => {
  const { getInitialAddress, getPinData } = useGeneral();

  const defaultValues = getInitialAddress(defaultAddress, addressType);

  const methods = useForm({ defaultValues, resolver: yupResolver(NewAddressSchema) });
  const {
    reset,
    handleSubmit,
    setValue,
    getValues,
    setFocus,
    formState: { isSubmitting, errors },
  } = methods;

  useErrorFocus({ errors, setFocus });

  const handelPinCode = async ({ target }: any) => {
    const data = await getPinData(target.value as string);
    if (data?.state) {
      setValue('state', data.state);
      setValue('city', data.city);
    }
  };

  const onSubmit = async (data: Address) => {
    if (defaultAddress) {
      editAddress(data);
    } else {
      addAddress(data);
    }
    reset(getInitialAddress(null, addressType));
    handleCloseModal();
  };
  return (
    <HookForm methods={methods}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} margin={3}>
          <Grid item xs={12} md={12} margin={2}>
            <RHFTextField name="businessAddress" label="Business Address" required />
          </Grid>
          <Box sx={boxGridSx} margin={2}>
            <RHFTextField name="pinCode" label="Pin Code" onKeyUp={handelPinCode} required />
            <RHFAutocomplete
              name="state"
              label="State"
              optionLabel="stateName"
              options={STATE_DATA}
            />
            <RHFTextField name="city" label="City" required />
          </Box>
          <DialogActions>
            {defaultAddress && (
              <Tooltip title="Delete Address">
                <IconButton
                  onClick={() => {
                    removeAddress(getValues('addressId'));
                    handleCloseModal();
                  }}
                  color="error"
                >
                  <Iconify icon="eva:trash-2-outline" width={20} height={20} />
                </IconButton>
              </Tooltip>
            )}
            <Box sx={{ flexGrow: 1 }} />

            <Button variant="outlined" color="inherit" onClick={handleCloseModal}>
              Cancel
            </Button>

            <LoadingButton
              type="button"
              variant="contained"
              loading={isSubmitting}
              onClick={handleSubmit(onSubmit)}
            >
              {!defaultAddress ? 'Add' : 'Save'}
            </LoadingButton>
          </DialogActions>
        </Grid>
      </Grid>
    </HookForm>
  );
};
