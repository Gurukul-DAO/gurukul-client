import { Check } from "@mui/icons-material";
import { Alert, Button, Card, CardActionArea, CardContent, CardMedia, Chip, Container, Grid, Snackbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { useParams } from "react-router-dom";
import GuruABI from "../abis/GuruABI";
import GurukulABI from "../abis/GurukulABI";
import { WatchVideoDialog } from "../components/WatchVideoDialog";
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

    const renderChips = () => {
        if (isInProgress && !isCompleted) {
            return <div>
                <Chip sx={{ fontSize: 15, height: 25 }} color="success" label="Course In Progress" variant="outlined" /><br />
            </div>
        } else if (isCompleted) {
            return <Chip sx={{ fontSize: 15, height: 25 }} color="success" label="Course Completed" variant="outlined" />
        }
    }

    const renderActions = () => {
        if (isInProgress === false && isCompleted === false) {
            return <Button variant="contained" size="large" onClick={() => {
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
                <Button variant="contained" size="large" onClick={() => {
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
        }
    }

    const renderVideos = <Grid container spacing={0}>

    <Grid item xs={12} sm={6} md={6} lg={4} sx={{ margin: 0 }}>
        <Video video={{
            name: "Practice Chords",
            youtubeId: "M7QVNKUry18",
            isPurchased: isInProgress || isCompleted
        }} key={'M7QVNKUry18'} />
    </Grid>

    <Grid item xs={12} sm={6} md={6} lg={4} sx={{ margin: 0 }}>
        <Video video={{
            name: "Chords Basic",
            youtubeId: "1Y-9iPNXFQo",
            isPurchased: isInProgress || isCompleted
        }} key={'1Y-9iPNXFQo'} />
    </Grid>

    <Grid item xs={12} sm={6} md={6} lg={4} sx={{ margin: 0 }}>
        <Video video={{
            name: "Full Song",
            youtubeId: "xeOEwtgKAcI",
            isPurchased: isInProgress || isCompleted
        }} key={'xeOEwtgKAcI'} />
    </Grid>

    <Grid item xs={12} sm={6} md={6} lg={4} sx={{ margin: 0 }}>
        <Video video={{
            name: "Guitar Video Lesson",
            youtubeId: "_-jTPU8xWy0",
            isPurchased: isInProgress || isCompleted
        }} key={'_-jTPU8xWy0'} />
    </Grid>

</Grid>

    return (
        <Container sx={{ mt: 2 }}>
            <Typography variant="h4">{course && course[2]}</Typography>
            {renderChips()}

            <Snackbar open={successSnackState} autoHideDuration={5000} onClose={() => setSuccessSnackState(false)}>
                <Alert severity="success" sx={{ width: '100%' }}>Successfull transaction!</Alert>
            </Snackbar>
            <Snackbar open={errorSnackState} autoHideDuration={5000} onClose={() => setErrorSnackState(false)}>
                <Alert severity="error" sx={{ width: '100%' }}>Transaction failed!</Alert>
            </Snackbar>

            {renderVideos}
            
            {renderActions()}
        </Container>);
}

function Video(props) {
    const [videoModalOpen, setVideoModalOpen] = useState(false);
    const [videoWatched, setVideoWatched] = useState(false);

    return (
        <>
            <Card sx={{ width: 340, height: 250, float: 'left', margin: 1 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="194"
                        image={"https://img.youtube.com/vi/" + props.video.youtubeId + "/0.jpg"}
                        alt="Preview image"
                        onClick={() => setVideoModalOpen(true)}
                    />
                </CardActionArea>
                <CardContent>
                    <Typography variant="h5">{props.video.name} {videoWatched && <Check/>}</Typography>
                </CardContent>
            </Card>
            <WatchVideoDialog
                video={props.video}
                open={props.video.isPurchased && videoModalOpen}
                handleClose={() => setVideoModalOpen(false)}
                handleVideoWatched={() => setVideoWatched(true)}
            />
        </>
    )
}