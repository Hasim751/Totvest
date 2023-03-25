import { Helmet } from 'react-helmet-async';
// @mui
import { Divider } from '@mui/material';
import StartupHero from 'src/sections/startup/StartupHero';
import StartupCard from 'src/sections/startup/StartupCard';
// sections

// ----------------------------------------------------------------------

export default function StartUpPage() {
  return (
    <>
      <Helmet>
        <title> StartUp | TotVest</title>
      </Helmet>

      <StartupHero />
     <br/>
      <StartupCard />
     

      <Divider orientation="vertical" sx={{ my: 10, mx: 'auto', width: 2, height: 40 }} />

     

    </>
  );
}
