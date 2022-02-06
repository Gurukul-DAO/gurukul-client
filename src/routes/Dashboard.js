import { Box, Container, Grid, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import GurukulABI from "../abis/GurukulABI";
import CourseCard from "../components/CourseCard";
import { gurukulContractAddress } from "../credentials";


export default function Dashboard() {
    const [tabState, setTabState] = useState(0);
    const [completedCourses, setCompletedCourses] = useState(undefined);
    const [inProgressCourses, setInProgressCourses] = useState(undefined);

    const { enableWeb3, isWeb3Enabled, user } = useMoralis();

    const { data: allCoursesList, fetch: fetchAllCourses } = useWeb3ExecuteFunction({
        abi: GurukulABI,
        contractAddress: gurukulContractAddress,
        functionName: "getAllCourses"
    });

    const { data: completedCoursesList, fetch: fetchCompletedCourses } = useWeb3ExecuteFunction({
        abi: GurukulABI,
        contractAddress: gurukulContractAddress,
        functionName: "getStudentCompletedCourses",
        params: {
            studentAddress: user.attributes.ethAddress,
        },
    });

    const { data: allCoursesStudentList, fetch: fetchAllStudentCourses } = useWeb3ExecuteFunction({
        abi: GurukulABI,
        contractAddress: gurukulContractAddress,
        functionName: "getStudentCourse",
        params: {
            studentAddress: user.attributes.ethAddress,
        },
    });

    const handleChange = (event, newValue) => {
        setTabState(newValue);
    };

    useEffect(() => {
        if (!isWeb3Enabled) {
            enableWeb3();
        }
        const init = async () => {
            fetchAllCourses();

            if (user) {
                fetchAllStudentCourses();
                fetchCompletedCourses();
            }

            //Set in progress courses
            if (allCoursesList && allCoursesStudentList && completedCoursesList) {
                let tempInProgressCourses = new Set();
                let tempCompletedCourses = new Set();
                allCoursesList.forEach(course => {
                    allCoursesStudentList.forEach(studentCourseId => {
                        if (course[1].eq(studentCourseId)) {
                            let isCompleted = false
                            completedCoursesList.forEach(completedCourseId => {
                                if(completedCourseId.eq(studentCourseId)) {
                                    isCompleted = true;
                                }
                            });
                            if(isCompleted) {
                                tempCompletedCourses.add(course);
                            } else {
                                tempInProgressCourses.add(course);
                            }
                        }
                    });
                })
                setCompletedCourses(Array.from(tempCompletedCourses));
                setInProgressCourses(Array.from(tempInProgressCourses));
            }
        };

        if(!completedCourses || !inProgressCourses) {
            init();
        }

    }, [user, enableWeb3, isWeb3Enabled, completedCoursesList, allCoursesList, allCoursesStudentList, fetchCompletedCourses, fetchAllCourses, fetchAllStudentCourses, completedCourses, inProgressCourses]);

    let completedCoursesComponents = [];
    let inProgressCoursesComponents = [];


    if (completedCourses) {
        completedCoursesComponents.push(
            completedCourses.map((course, i) => (
                <Grid item xs={12} sm={12} md={6} lg={4} key={course.courseId}>
                    <CourseCard
                        completed
                        key={course.courseId.toNumber()}
                        courseId={course.courseId}
                        courseName={course.name}
                        imageUrl={course.imageURL} />
                </Grid>
            ))
        );
    }

    if (inProgressCourses) {
        inProgressCoursesComponents.push(
            inProgressCourses.map((course, i) => (
                <Grid item xs={12} sm={12} md={6} lg={4} key={course.courseId}>
                    <CourseCard
                        key={course.courseId}
                        courseId={course.courseId}
                        courseName={course.name}
                        imageUrl={course.imageURL} />
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
                {inProgressCoursesComponents}
            </TabPanel>

            <TabPanel value={tabState} index={1}>
                {completedCoursesComponents}
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