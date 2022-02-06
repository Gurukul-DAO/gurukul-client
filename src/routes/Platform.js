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

    if (!courses) {
      init();
    }

  }, [enableWeb3, isWeb3Enabled, data, fetch, courses]);

  let coursesList = []

  if (courses) {
    coursesList.push(
      courses.map((course, i) => (
        <Grid item xs={12} sm={12} md={6} lg={4} key={i}>
          <CourseCard
            courseId={course.courseId}
            courseName={course.name}
            imageUrl= {course[3]} />
        </Grid>
      ))
    );
  }

  return (
    <Container sx={{ mt: 5 }}>
      <Grid container spacing={2}>
        {coursesList}
      </Grid>
    </Container>
  );
}
