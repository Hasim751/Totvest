import { useMemo } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Card, Grid, Stack } from '@mui/material';
// components

import { useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';
import { useErrorFocus } from 'src/hooks/utilityHooks/useErrorFocus';
import { useUser } from 'src/hooks/database/useUser';
import { Campaign } from 'src/@types/user';
import { HookForm, RHFTextField } from 'src/components/hook-form';
import { RHFPhoneNumber } from 'src/components/hook-form/RHFPhoneNumber';
import { ButtonAccordion } from 'src/mycomponents/common';
import { boxGridSx } from 'src/utils/CommonSX';
import { RHFSubmitButton } from 'src/components/hook-form/RHFSubmitButton';
// ----------------------------------------------------------------------

export function CampaignForm() {
  const { addCampaign } = useUser();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm<Campaign>({});

  const {
    handleSubmit,
    setFocus,
    formState: { errors },
  } = methods;

  useErrorFocus({ errors, setFocus });

  const onSubmit = async (data: Campaign) => {
    try {
      const res = await addCampaign(data);
      enqueueSnackbar(res.message, { variant: res.type });
      navigate('/startup');
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
              <RHFTextField name="campaignName" label="Campaign Name" required />
              <RHFTextField name="tenure" label="Tenure" />
              <RHFTextField name="minSubscription" label="Min Subscription" required />
            </Box>
            <ButtonAccordion
              title="Add Details"
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
              }}
            >
              <RHFTextField
                fullWidth
                multiline
                name="description"
                minRows={5}
                label="Description"
              />
            </ButtonAccordion>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <RHFSubmitButton onClick={handleSubmit(onSubmit)}>Add</RHFSubmitButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </HookForm>
  );
}
