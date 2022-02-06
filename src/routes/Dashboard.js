import { Box, Container, Grid, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import GurukulABI from "../abis/GurukulABI";
import CourseCard from "../components/CourseCard";
import { gurukulContractAddress } from "../credentials";


export default function Dashboard() {
    const [tabState, setTabState] = useState(0);
    const [courses, setCourses] = useState(undefined);

    const { enableWeb3, isWeb3Enabled} = useMoralis();

    const { data, fetch } = useWeb3ExecuteFunction({
        abi: GurukulABI,
        contractAddress: gurukulContractAddress,
        functionName: "getAllCourses"
    });

    const handleChange = (event, newValue) => {
        setTabState(newValue);
    };

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

    if(courses) {
        coursesList.push(
            courses.map((course, i) => (
                <Grid item xs={12} sm={12} md={6} lg={4}>
                <CourseCard
                    id={course.id}
                    courseName={course.name}
                    imageUrl="https://campustechnology.com/-/media/EDU/CampusTechnology/2019-Images/20191209online.jpg" />
            </Grid>
            ))
        );
    }

    
    return (
        <Container sx={{ mt: 2 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabState} onChange={handleChange}>
                    <Tab label="In Progress" {...a11yProps(0)} />
                    <Tab label="Completed" {...a11yProps(1)} />
                </Tabs>
            </Box>

            <TabPanel value={tabState} index={0}>
                {/* <Grid item xs={12} sm={12} md={6} lg={4}>
                    <CourseCard
                        id="0"
                        courseName="First Course"
                        imageUrl="https://campustechnology.com/-/media/EDU/CampusTechnology/2019-Images/20191209online.jpg" />
                </Grid> */}
                {coursesList}
            </TabPanel>

            <TabPanel value={tabState} index={1}>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                    <CourseCard
                        id="1"
                        courseName="First Completed Course"
                        imageUrl="https://elearning.ihtsdotools.org/pluginfile.php/16835/mod_book/chapter/1798/figure_at_finish_line_13179.png"
                        completed />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                    <CourseCard
                        id="2"
                        courseName="Second Completed Course"
                        imageUrl="https://flfilmacademy.com/wp-content/uploads/2015/08/Course-Completed.png"
                        completed />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                    <CourseCard
                        id="3"
                        courseName="Third Completed Course"
                        imageUrl="https://knilt.arcc.albany.edu/images/6/6a/Course_completion.png"
                        completed />
                </Grid>
            </TabPanel>

        </Container>);
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    {children}
                </Grid>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

// async function getAllCourses() {
    // let options = {
    //     contractAddress: "0x64cf7010Aaf511e69216Cd099271DAC604Ee9005",
    //     functionName: "getAllCourses",
    //     abi: GurukulABI
    // };



    

    // return ShowUniswapObserveValues
    // const { data, error, fetch, isFetching, isLoading } = useWeb3ExecuteFunction({
    //     abi: GurukulABI,
    //     contractAddress: usdcEthPoolAddress,
    //     functionName: "observe",
    //     params: {
    //       secondsAgos: [0, 10],
    //     },
    //   });

    // const response = await Moralis.executeFunction(options);

    // console.log(response);
// }