import { useMemo } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Card, Grid, Stack } from '@mui/material';
// components
import { HookForm, RHFSelect, RHFTextField } from '../../../components/hook-form';
import { CustForm, CustomerWithAddress } from '../../../@types/customer';
import { ButtonAccordion } from '../../../mycomponents/common';
import { AddressRow } from './AddressRow';
import { boxGridSx } from '../../../utils/CommonSX';
import { useAddress } from '../../../hooks/utilityHooks/useAddress';
import { useErrorFocus } from '../../../hooks/utilityHooks/useErrorFocus';
import { RHFSubmitButton } from '../../../components/hook-form/RHFSubmitButton';
import { useCustomer } from '../../../hooks/database/useCustomer';
import { NewCustomerSchema } from '../../../validation';
import { RHFPhoneNumber } from '../../../components/hook-form/RHFPhoneNumber';
import { useSnackbar } from '../../../components/snackbar';
import { useNavigate } from 'react-router';
// ----------------------------------------------------------------------

type Props = {
  isEdit: boolean;
  currentCustomer?: CustForm;
};

export default function CustomerForm({ isEdit, currentCustomer }: Props) {
  const { createCustomer } = useCustomer();
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar();


  const BillingAddresses = useAddress([], 'Billing');
  const methods = useForm<CustForm>({
    resolver: yupResolver(NewCustomerSchema),
  });

  const {
    handleSubmit,
    setFocus,
    formState: { errors },
  } = methods;

  useErrorFocus({ errors, setFocus });

  // useEffect(() => {
  //   reset(defaultValues);
  // }, [isEdit, currentCustomer]);

  const onSubmit = async (data: CustForm) => {
    const FormData: CustomerWithAddress = { ...data, addresses: [...BillingAddresses.addresses] };
    try {
      const res = await createCustomer(FormData);
      enqueueSnackbar(res.message, { variant: res.type });
    navigate("/dashboard/customer/list");
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  return (
    <HookForm methods={methods}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box sx={boxGridSx}>
              <RHFTextField name="campaignName" label="Name" required />
              {/* <RHFTextField name="customerPhone" label="Phone Number" required /> */}
              <RHFTextField name="tenure" label="Tenure" required />
            </Box>
            <ButtonAccordion title="Business Details" sx={boxGridSx}>
              <RHFTextField name="customerGST" label="GSTIN" />
              <RHFTextField name="customerPAN" label="PAN Card" />
              <RHFTextField name="customerBusinessName" label="Business Name" />
            </ButtonAccordion>
            <ButtonAccordion title="Address" sx={boxGridSx}>
              <AddressRow addressesObject={BillingAddresses} title="Add Billing Address" />
            </ButtonAccordion>
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <RHFSubmitButton onClick={handleSubmit(onSubmit)}>
                {!isEdit ? 'Add' : 'Save Changes'}
              </RHFSubmitButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </HookForm>
  );
}