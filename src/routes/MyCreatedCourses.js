import { Add } from "@mui/icons-material";
import { Alert, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Fab, Grid, Snackbar, Tab, Tabs, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import GuruABI from "../abis/GuruABI";
import GurukulABI from "../abis/GurukulABI";
import CourseCard from "../components/CourseCard";
import { creatorStake } from "../constants";
import { guruContractAddress, gurukulContractAddress } from "../credentials";
import { getCreatedPrivateCourses } from "../data/createdCourses";

export default function MyCreatedCourses() {
    const [tabState, setTabState] = useState(0);
    const [successSnackState, setSuccessSnackState] = useState(false);
    const [errorSnackState, setErrorSnackState] = useState(false);
    const [createCourseDialogOpen, setCreateCourseDialogOpen] = useState(false);
    const [newCourseName, setNewCourseName] = useState('');
    const { user, enableWeb3, isWeb3Enabled } = useMoralis();
    const [privateCourseData, setPrivateCourseData] = useState(getCreatedPrivateCourses(user.get("ethAddress")));

    const { data: publishedCourses, fetch: fetchPublicCourses } = useWeb3ExecuteFunction({
        abi: GurukulABI,
        contractAddress: gurukulContractAddress,
        functionName: "getAllCourses"
    });

    const { fetch: fetchCreateCourse } = useWeb3ExecuteFunction({
        abi: GurukulABI,
        contractAddress: gurukulContractAddress,
        functionName: "createCourse"
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

        fetchPublicCourses();
    }, [enableWeb3, isWeb3Enabled, fetchPublicCourses]);

    const handleChange = (event, newValue) => {
        setTabState(newValue);
    };

    return <>
        <Container sx={{ mt: 2 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabState} onChange={handleChange}>
                    <Tab label="Published" {...a11yProps(0)} />
                    <Tab label="Unpublished" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={tabState} index={0}>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    {publishedCourses && publishedCourses
                    .filter(course => course.creator.toUpperCase() === user.attributes.ethAddress.toUpperCase() )
                    .map((course) => <Course course={course} key={course.courseId} />)}
                </Grid>
                <Box sx={{ display: 'flex', float: 'right' }}>
                    <Fab color="primary" aria-label="add" onClick={() => { setNewCourseName(''); setCreateCourseDialogOpen(true) }}>
                        <Add />
                    </Fab>
                </Box>
            </TabPanel>
            <TabPanel value={tabState} index={1}>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    {privateCourseData.map((course) => <Course course={course} key={course.id} />)}
                </Grid>
            </TabPanel>
        </Container>
        <NewCourseDialog
            open={createCourseDialogOpen}
            newCourseName={newCourseName}
            handleChange={(event) => setNewCourseName(event.target.value)}
            handleClose={() => setCreateCourseDialogOpen(false)}
            handleSubmit={() => {
                setCreateCourseDialogOpen(false);
                fetchApproveTokens({ throwOnError: true })
                    .then(
                        () => fetchCreateCourse({
                            params: { params: { name: newCourseName } },
                            throwOnError: true
                        })
                    )
                    .then(() => {
                        setSuccessSnackState(true);
                        fetchPublicCourses();
                    })
                    .catch((error) => { console.error(error); setErrorSnackState(true) });
            }} />
        <Snackbar open={successSnackState} autoHideDuration={5000} onClose={() => setSuccessSnackState(false)}>
            <Alert severity="success" sx={{ width: '100%' }}>Course creation successful!</Alert>
        </Snackbar>
        <Snackbar open={errorSnackState} autoHideDuration={5000} onClose={() => setErrorSnackState(false)}>
            <Alert severity="error" sx={{ width: '100%' }}>Course creation failed!</Alert>
        </Snackbar>
    </>;
}

function Course(props) {
    return (
        <>
            <Grid item xs={12} sm={12} md={6} lg={4}>
                <CourseCard
                    courseId={props.course.courseId}
                    courseName={props.course.name}
                    imageUrl="https://campustechnology.com/-/media/EDU/CampusTechnology/2019-Images/20191209online.jpg" />
            </Grid>
        </>
    );
}

function NewCourseDialog(props) {
    return (
        <Dialog open={props.open}>
            <DialogTitle>Create Course</DialogTitle>
            <DialogContent>
                <TextField
                    placeholder="Course name"
                    value={props.newCourseName}
                    onChange={props.handleChange}
                    required />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.handleClose()}>Cancel</Button>
                <Button onClick={() => props.handleSubmit()} disabled={!props.newCourseName}>OK</Button>
            </DialogActions>
        </Dialog>
    )
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
                <>{children}</>
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

// function Course(props) {
//     return (
//         <Card>
//             {props.course.name}
//             {props.course.videos.map(video =>
//                 <Video video={video} key={video.id} />
//             )}
//         </Card>
//     );
// }

// function Video(props) {
//     const [videoModalOpen, setVideoModalOpen] = useState(false);
//     const [videoWatched, setVideoWatched] = useState(false);

//     return (
//         <>
//             <Card sx={{ width: 200, height: 300, float: 'left', margin: 1 }}>
//                 <CardActionArea>
//                     <CardMedia
//                         component="img"
//                         height="194"
//                         image={"https://img.youtube.com/vi/" + props.video.youtubeId + "/0.jpg"}
//                         alt="Preview image"
//                         onClick={() => setVideoModalOpen(true)}
//                     />
//                 </CardActionArea>
//                 <CardContent>
//                     {props.video.name}
//                     {videoWatched && <Check />}
//                 </CardContent>
//             </Card>
//             <WatchVideoDialog
//                 video={props.video}
//                 open={videoModalOpen}
//                 handleClose={() => setVideoModalOpen(false)}
//                 handleVideoWatched={() => setVideoWatched(true)}
//             />
//         </>
//     )
// }
