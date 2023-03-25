import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function startupCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://tyke-startup-bucket.s3.ap-south-1.amazonaws.com/HILT%20BRANDS%20INDIA%20PRIVATE%20LIMITED/bibo%20%281%29.png"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Bibo
          </Typography>
          <Typography variant="body2" color="text.secondary">
            BIBO stands for free and clear breathing for all and it's a category OTC Pharma brand
            for respiratory wellness. Bibo products have reached more than 3 lakhs houses and has
            got great reviews and followings.
            <br></br>
          </Typography>
          <Typography variant="body2" color="text.primary">
           <p >Raised: 65% </p>
           <p >Min. Subscription: $ 5000 </p>

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
}
