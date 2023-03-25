import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { MotionViewport, varFade } from 'src/components/animate';
import { HookForm, RHFTextField } from 'src/components/hook-form';
import { RHFPhoneNumber } from 'src/components/hook-form/RHFPhoneNumber';
import { RHFSubmitButton } from 'src/components/hook-form/RHFSubmitButton';
import { boxGridSx } from 'src/utils/CommonSX';
import { m } from 'framer-motion';
import { RFHSelectField } from 'src/components/hook-form/RFHSelectField';
import { useSnackbar } from '../../../components/snackbar';
import { useNavigate } from 'react-router';
import { useUser } from '../../../hooks/database/useUser';
import { useAuthContext } from 'src/auth/useAuthContext';
import { NewUserSchema } from '../../../validation/yupValidation';
import { useErrorFocus } from 'src/hooks/utilityHooks/useErrorFocus';

type Props = {};
export type UserType = 'startup' | 'investor';

export type User = {
  firstName: string;
  lastName: string;
  mobile: string;
  userTyp: UserType;
  avatar?: string;
  address?: string;
  email: string;
  password: string;
};

const options = [
  { value: 'investor', name: 'Investor' },
  { value: 'startup', name: 'Startup' },
];
export const RegisterForm = (props: Props) => {
  const methods = useForm<User>({
    resolver: yupResolver(NewUserSchema),
  });
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { createUser } = useUser();

  const {
    handleSubmit,
    setFocus,
    formState: { errors },
  } = methods;

  const { login } = useAuthContext();

  const onSubmit = async (data: User) => {
    try {
      const res = await createUser(data);
      enqueueSnackbar(res.message, { variant: res.type });
      await login(data.email, data.password);
      navigate('/dashboard/');
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };
  useErrorFocus({ errors, setFocus });

  return (
    <Stack
      component={MotionViewport}
      spacing={20}
      sx={{ marginRight: 20, marginLeft: 20 }}
      justifyContent="center"
      alignContent={'center'}
    >
      <m.div variants={varFade().inUp}>
        <Typography justifyContent={'center'} align="center" variant="h3" sx={{ margin: 3 }}>
          Register
        </Typography>
        <HookForm methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Box sx={boxGridSx}>
                <RHFTextField name="firstName" label="Name" />
                <RHFPhoneNumber name="mobile" label="Mobile" />
                <RHFTextField name="email" label="Email" />
                <RHFTextField name="password" label="Password" type={'password'} />
                <RFHSelectField label="User Type" name="userType" options={options} />
              </Box>
              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <RHFSubmitButton>Submit</RHFSubmitButton>
              </Stack>
            </Grid>
          </Grid>
        </HookForm>
      </m.div>
    </Stack>
  );
};
