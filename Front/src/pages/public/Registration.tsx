import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Box, BoxProps } from '@mui/material';
// sections
import { ComponentHero } from '../../sections/_examples';
import { RegisterForm } from './Register/RegisterForm';


// ----------------------------------------------------------------------

export default function Registration() {
  return (
    <>
      <Helmet>
        <title> Components Overview | Minimal UI</title>
      </Helmet>

      <ComponentHero />
      <RegisterForm />

      <Container sx={{ pt: 10, pb: 15 }}></Container>
    </>
  );
}

// ----------------------------------------------------------------------

function Grid({ children }: BoxProps) {
  return (
    <Box
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(2, 1fr)',
        sm: 'repeat(3, 1fr)',
        md: 'repeat(4, 1fr)',
        lg: 'repeat(6, 1fr)',
      }}
      gap={2.5}
    >
      {children}
    </Box>
  );
}
