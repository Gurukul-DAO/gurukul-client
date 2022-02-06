import { Alert, Button, Chip, Container, Snackbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { useParams } from "react-router-dom";
import GuruABI from "../abis/GuruABI";
import GurukulABI from "../abis/GurukulABI";
import { creatorStake } from "../constants";
import { guruContractAddress, gurukulContractAddress } from "../credentials";

export default function CourseDetails() {
    let { courseId } = useParams();
    const [course, setCourse] = useState(undefined);
    const [isCompleted, setIsCompleted] = useState(undefined);
    const [isInProgress, setIsInProgress] = useState(undefined);
    const [isMounted, setIsMounted] = useState(false);

    const [successSnackState, setSuccessSnackState] = useState(false);
    const [errorSnackState, setErrorSnackState] = useState(false);

    const { enableWeb3, isWeb3Enabled, user } = useMoralis();

    const { data: allCourses, fetch: fetchAllCourses } = useWeb3ExecuteFunction({
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

    const { fetch: joinCourse } = useWeb3ExecuteFunction({
        abi: GurukulABI,
        contractAddress: gurukulContractAddress,
        functionName: "joinCourse",
        params: {
            courseId: courseId,
        },
    });

    const { data, fetch: completeCourse, isFetching, isLoading } = useWeb3ExecuteFunction({
        abi: GurukulABI,
        contractAddress: gurukulContractAddress,
        functionName: "completeCourse",
        params: {
            courseId: courseId,
        },
    });

    const { fetch: fetchApproveTokens } = useWeb3ExecuteFunction({
        abi: GuruABI,
        contractAddress: guruContractAddress,
        functionName: "approve",
        params: {
            spender: gurukulContractAddress,
            amount: creatorStake
        }
    })


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

            if (allCourses) {
                allCourses.forEach(course => {
                    if (course[1].eq(courseId)) {
                        setCourse(course);
                    }
                });
            }

            if (allCourses && allCoursesStudentList && completedCoursesList) {
                for (let course of allCourses) {

                    if (course[1].eq(courseId)) {
                        let inProgress = false;
                        let isCompleted = false;

                        for (let studentCourseId of allCoursesStudentList) {
                            if (course[1].eq(studentCourseId)) {
                                inProgress = true;
                                break;
                            }
                        }

                        for (let completedCourseId of completedCoursesList) {
                            if (course[1].eq(completedCourseId)) {
                                isCompleted = true;
                                break;
                            }
                        }

                        setIsInProgress(inProgress);
                        setIsCompleted(isCompleted);
                        break;
                    }
                }
            }
        };

        if (!isMounted || !course || isCompleted === undefined || isInProgress === undefined) {
            init();
            setIsMounted(true);
        }

    }, [enableWeb3, isWeb3Enabled, allCourses, fetchAllCourses, courseId, allCoursesStudentList, completedCoursesList, user, fetchAllStudentCourses, fetchCompletedCourses, course, isCompleted, isInProgress, isMounted]);

    const renderActions = () => {
        if (isInProgress=== false && isCompleted === false) {
            return <Button variant="outlined" onClick={() => {
                fetchApproveTokens({ throwOnError: true })
                    .then(async () => {
                        await joinCourse({ throwOnError: true })
                    })
                    .then(() => {
                        setIsMounted(false);
                        setSuccessSnackState(true);
                    })
                    .catch((error) => { console.error(error); setErrorSnackState(true) });
            }}>Buy for $GURU 50 </Button>
        } else if (isInProgress && !isCompleted) {
            return <div>
                <Chip sx={{ fontSize: 15, height: 25 }} color="success" label="Course In Progress" variant="outlined" /><br />
                <Button variant="contained" onClick={() => {
                    fetchApproveTokens({ throwOnError: true })
                        .then(async () => {
                            await completeCourse({ throwOnError: true })
                        })
                        .then(() => {
                            setSuccessSnackState(true);
                        })
                        .catch((error) => {
                            console.error(error);
                            setErrorSnackState(true)
                        }
                        );
                }}>Complete Course</Button>
            </div>
        } else if (isCompleted) {
            return <Chip sx={{ fontSize: 15, height: 25 }} color="success" label="Course Completed" variant="outlined" />
        }
    }

    return (
        <Container sx={{ mt: 2 }}>
            <Typography variant="h4">{course && course[2]}</Typography>
            {renderActions()}

            <Snackbar open={successSnackState} autoHideDuration={5000} onClose={() => setSuccessSnackState(false)}>
                <Alert severity="success" sx={{ width: '100%' }}>Successfull transaction!</Alert>
            </Snackbar>
            <Snackbar open={errorSnackState} autoHideDuration={5000} onClose={() => setErrorSnackState(false)}>
                <Alert severity="error" sx={{ width: '100%' }}>Transaction failed!</Alert>
            </Snackbar>
        </Container>);
}