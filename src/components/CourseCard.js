import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Divider, Grid, Typography } from "@mui/material";
import { theme } from "../Theme";

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import LocalAtmTwoToneIcon from '@mui/icons-material/LocalAtmTwoTone';

export default function CourseCard({ courseId, courseName, imageUrl, completed }) {

  let courseActions = [];
  if (completed) {
    courseActions.push(<Divider width="100%"/>)


    courseActions.push(  <CardActions sx={{ padding: 0 }}>
        <Grid container spacing={0}>

        <Grid item xs={6} sm={6} md={6} lg={6} sx={{ margin: 0 }}>
            <Button color="success" sx={{ width: '100%', height: '100%', padding: 0 }} startIcon={<MonetizationOnIcon />}>
              CLAIM $GURU
            </Button >
          </Grid>

          <Grid item xs={6} sm={6} md={6} lg={6} sx={{ margin: 0 }}>
            <Button color="success" sx={{ width: '100%', height: '100%', padding: 0 }} startIcon={<LocalAtmTwoToneIcon />}>
              STAKE $GURU
            </Button >
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Button color="primary" sx={{ width: '100%', height: '100%', padding: 0 }} startIcon={<VerifiedUserIcon />}>
              MINT NFT
            </Button >
          </Grid>

         

        </Grid>
      </CardActions>)
  }

  return (
    <Card
      sx={{
        minWidth: 350,
        maxWidth: 500,
        backgroundColor: theme.palette.background.paper,
      }}
      variant="outlined"
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={imageUrl}
          alt={courseName}
        />
        <CardContent>
          <Typography variant="h5" component="div">
            {courseName}
          </Typography>
        </CardContent>
        
      </CardActionArea>
      {courseActions}

    </Card>

  );
}