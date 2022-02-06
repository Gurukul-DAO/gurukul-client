import { Button, Chip, Container, Typography } from "@mui/material";
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

    const { fetch: completeCourse } = useWeb3ExecuteFunction({
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
                allCourses.forEach(course => {
                    allCoursesStudentList.forEach(studentCourseId => {
                        if (course[1].eq(courseId)) {
                            if (course[1].eq(studentCourseId)) {
                                let isCompleted = false
                                completedCoursesList.forEach(completedCourseId => {
                                    if (completedCourseId.eq(studentCourseId)) {
                                        isCompleted = true;
                                    }
                                });
                                if (isCompleted) {
                                    setIsCompleted(true);
                                    setIsInProgress(false);
                                } else {
                                    setIsCompleted(false);
                                    setIsInProgress(true)
                                }
                            }
                        }
                    });
                })
            }
        };

        if (!course || isCompleted === undefined || isInProgress === undefined) {
            init();
        }

    }, [enableWeb3, isWeb3Enabled, allCourses, fetchAllCourses, courseId, allCoursesStudentList, completedCoursesList, user, fetchAllStudentCourses, fetchCompletedCourses, course, isCompleted, isInProgress]);

    const renderActions = () => {
        if (!isInProgress && !isCompleted) {
            return <Button variant="outlined" onClick={() => {
                fetchApproveTokens({ throwOnError: true })
                joinCourse({ throwOnError: true })
            }}>Buy for $GURU 50 </Button>
        } else if (isInProgress) {
            return <div>
                <Chip sx={{ fontSize: 15, height: 25 }} color="success" label="Course In Progress" variant="outlined" /><br />
                <Button variant="contained" onClick={() => {
                    fetchApproveTokens({ throwOnError: true })
                    completeCourse({ throwOnError: true })
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
        </Container>);
}