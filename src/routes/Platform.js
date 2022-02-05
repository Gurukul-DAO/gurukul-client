import { Box, Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import CourseCard from "../components/CourseCard";
import { theme } from "../Theme";

export default function Platform() {
  return (
    <Container sx={{ mt: 5 }}>
      <Grid container spacing={2}>

        <Grid item xs={12} sm={12} md={6} lg={4}>
          <CourseCard
            id="1"
            courseName="First Course"
            imageUrl="https://campustechnology.com/-/media/EDU/CampusTechnology/2019-Images/20191209online.jpg" />
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Card
            sx={{
              minWidth: 350,
              maxWidth: 600,
              backgroundColor: theme.palette.background.paper,
            }}
            variant="outlined"
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="300"
                image="https://akm-img-a-in.tosshub.com/indiatoday/images/bodyeditor/202009/e-learning_digital_education-1200x1080.jpg"
                alt="course preview"
              />
              <CardContent>
                <Typography variant="h5" component="div" color="white">
                  Second Course
                </Typography>
              </CardContent>
            </CardActionArea>

          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>

          <Card
            sx={{
              minWidth: 350,
              maxWidth: 600,
              backgroundColor: theme.palette.background.paper,
            }}
            variant="outlined"
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="300"
                image="https://void-of-course.com/wp-content/uploads/2020/08/Online-Courses-735x400.jpg"
                alt="course preview"
              />
              <CardContent>
                <Typography variant="h5" component="div" color="white">
                  Third Course
                </Typography>
              </CardContent>
            </CardActionArea>

          </Card>
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={4}>

          <Card
            sx={{
              minWidth: 350,
              maxWidth: 600,
              backgroundColor: theme.palette.background.paper,
            }}
            variant="outlined"
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="300"
                image="https://void-of-course.com/wp-content/uploads/2020/08/Online-Courses-735x400.jpg"
                alt="course preview"
              />
              <CardContent>
                <Typography variant="h5" component="div" color="white">
                  Fourth Course
                </Typography>
              </CardContent>
            </CardActionArea>

          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
