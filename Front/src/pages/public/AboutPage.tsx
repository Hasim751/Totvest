import { Helmet } from 'react-helmet-async';
// @mui
import { Divider } from '@mui/material';
import { AboutHero, AboutTeam, AboutTestimonials, AboutVision, AboutWhat } from 'src/sections/about';
// sections

// ----------------------------------------------------------------------

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title> About us | TotVest</title>
      </Helmet>

      <AboutHero />

      <AboutWhat />


      <Divider orientation="vertical" sx={{ my: 10, mx: 'auto', width: 2, height: 40 }} />

     

      <AboutTestimonials />
    </>
  );
}
