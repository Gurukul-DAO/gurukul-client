import { Container, Divider, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import GurukulABI from "../abis/GurukulABI";
import CourseCard from "../components/CourseCard";
import { gurukulContractAddress } from "../credentials";

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
            imageUrl={course[3]} />
        </Grid>
      ))
    );
  }

  return (
    <Container sx={{ mt: 5 }}>
      <Grid container spacing={2}>

        <Grid item xs={12} sm={12} md={12} lg={12} key='category-1' alignItems="left" justify="left">
          <Typography alignLeft variant='h4' align='left'>Latest Courses</Typography>
          <Divider />
        </Grid>

        {coursesList}

        <Grid item xs={12} sm={12} md={12} lg={12} key='category-1' sx={{ mt: 7 }} alignItems="left" justify="left">
          <Typography alignLeft variant='h4' align='left'>Best Selling</Typography>
          <Divider />
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={4} key='Metaverse'>
          <CourseCard
            courseId='1'
            courseName='Metaverse Course'
            imageUrl='https://cdn.discordapp.com/attachments/938813557120843848/939996731293200394/pexels-harsch-shivam-2007647.png' />
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={4} key='Solidity'>
          <CourseCard
            courseId='1'
            courseName='Solidity Course'
            imageUrl='https://cdn.discordapp.com/attachments/938813557120843848/939997438603825222/pexels-josh-sorenson-1714208.jpg' />
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={4} key='Web3.0 Development'>
          <CourseCard
            courseId='1'
            courseName='Web3.0 Development Course'
            imageUrl='https://cdn.discordapp.com/attachments/938813557120843848/939997717386633268/pexels-thisisengineering-3861969.jpg' />
        </Grid>

      </Grid>
    </Container>
  );
}
