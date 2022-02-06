import { Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import GurukulABI from "../abis/GurukulABI";
import CourseCard from "../components/CourseCard";
import { gurukulContractAddress } from "../credentials";
import { theme } from "../Theme";

export default function Platform() {
  const [courses, setCourses] = useState(undefined);
  const { enableWeb3, isWeb3Enabled } = useMoralis();
  const { data, fetch } = useWeb3ExecuteFunction({
    abi: GurukulABI,
    contractAddress: gurukulContractAddress,
    functionName: "getAllCourses"
  });

  useEffect(() => {
    if (!isWeb3Enabled) {
      enableWeb3();
    }
    const init = async () => {
      fetch();
      setCourses(data);
    };

    init();
  }, [enableWeb3, isWeb3Enabled, data, fetch]);

  let coursesList = []

  if (courses) {
    coursesList.push(
      courses.map((course, i) => (
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <CourseCard
            courseId={course.courseId}
            courseName={course.name}
            imageUrl="https://campustechnology.com/-/media/EDU/CampusTechnology/2019-Images/20191209online.jpg" />
        </Grid>
      ))
    );
  }

  return (
    <Container sx={{ mt: 5 }}>
      <Grid container spacing={2}>
        {coursesList}
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <CourseCard
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
