import { Helmet } from 'react-helmet-async';
// @mui
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from '@mui/material';
import StartupHero from 'src/sections/startup/StartupHero';
import { boxGridSx } from 'src/utils/CommonSX';
import { useUser } from 'src/hooks/database/useUser';
import { useQuery } from '@tanstack/react-query';
import { Campaign } from 'src/@types/user';
// sections

// ----------------------------------------------------------------------

export default function StartUpPage() {
  const { getAllCampaigns } = useUser();
  const { data } = useQuery(['campaigns'], getAllCampaigns, {
    initialData: [],
    refetchOnWindowFocus: false,
  });
  console.log(data);
  return (
    <>
      <Helmet>
        <title> StartUp | TotVest</title>
      </Helmet>

      <StartupHero />
      <br />

      <Box
        sx={{
          display: 'grid',
          columnGap: 2,
          rowGap: 3,
          gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' },
          margin: 5
        }}
      >
        {data.map((item: any) => {
          return (
            <Card sx={{ maxWidth: 345 }} key={item.campaignId}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://tyke-startup-bucket.s3.ap-south-1.amazonaws.com/HILT%20BRANDS%20INDIA%20PRIVATE%20LIMITED/bibo%20%281%29.png"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.campaignName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                    <br></br>
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    <p>Raised: 65% </p>
                    <p>Min. Subscription: $ {item.minSubscription} </p>
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Invent Now
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </Box>

      <Divider orientation="vertical" sx={{ my: 10, mx: 'auto', width: 2, height: 40 }} />
    </>
  );
}
