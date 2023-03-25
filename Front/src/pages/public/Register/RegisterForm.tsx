import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Card, Grid, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { HookForm, RHFTextField } from 'src/components/hook-form';
import { RHFPhoneNumber } from 'src/components/hook-form/RHFPhoneNumber';
import { RHFSubmitButton } from 'src/components/hook-form/RHFSubmitButton';
import { ButtonAccordion } from 'src/mycomponents/common';
import { AddressRow } from 'src/pages/customer/components/AddressRow';
import { boxGridSx } from 'src/utils/CommonSX';

type Props = {};

export const RegisterForm = (props: Props) => {
  const methods = useForm();

  const {
    handleSubmit,
    setFocus,
    formState: { errors },
  } = methods;

  const onSubmit = () => {};
  return (
    <HookForm methods={methods}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box sx={boxGridSx}>
              <RHFTextField name="customerName" label="Name" required />
              {/* <RHFTextField name="customerPhone" label="Phone Number" required /> */}
              <RHFPhoneNumber name="customerPhone" label="Phone" />
              <RHFTextField name="customerEmail" label="Email Address" required />
            </Box>
            <ButtonAccordion title="Business Details" sx={boxGridSx}>
              <RHFTextField name="customerGST" label="GSTIN" />
              <RHFTextField name="customerPAN" label="PAN Card" />
              <RHFTextField name="customerBusinessName" label="Business Name" />
            </ButtonAccordion>
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <RHFSubmitButton onClick={handleSubmit(onSubmit)}>Submit</RHFSubmitButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </HookForm>
  );
};
