import { Check } from "@mui/icons-material";
import { Box, Card, CardActionArea, CardContent, CardMedia, Collapse, Modal, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { useMoralis } from "react-moralis";
import { WatchVideoDialog } from "../components/WatchVideoDialog";
import { getCreatedPrivateCourses, getCreatedPublishedCourses } from "../data/createdCourses";

export default function MyCreatedCourses() {
    const [tabState, setTabState] = useState(0);

    const handleChange = (event, newValue) => {
        setTabState(newValue);
    };

    const { user } = useMoralis();

    const [publishedCourseData, setPublishedCourseData] = useState(getCreatedPublishedCourses(user.get("ethAddress")));
    const [privateCourseData, setPrivateCourseData] = useState(getCreatedPrivateCourses(user.get("ethAddress")));

    return <>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', display: "flex", justifyContent: "center" }}>
            <Tabs value={tabState} onChange={handleChange}>
                <Tab label="Published" {...a11yProps(0)} />
                <Tab label="Unpublished" {...a11yProps(1)} />
            </Tabs>
        </Box>
        <TabPanel value={tabState} index={0}>
            {publishedCourseData.map((course) => <Course course={course} key={course.id} />)}
        </TabPanel>
        <TabPanel value={tabState} index={1}>
            {privateCourseData.map((course) => <Course course={course} key={course.id} />)}
        </TabPanel>
    </>;
}

function Course(props) {


    return (
        <Card>
            {props.course.name}
            {props.course.videos.map(video =>
                <Video video={video} key={video.id} />
            )}
        </Card>
    );
}

function Video(props) {
    const [videoModalOpen, setVideoModalOpen] = useState(false);
    const [videoWatched, setVideoWatched] = useState(false);

    return (
        <>
            <Card sx={{ width: 200, height: 300, float: 'left', margin: 1 }}>
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
                    {props.video.name}
                    {videoWatched && <Check />}
                </CardContent>
            </Card>
            <WatchVideoDialog
                video={props.video}
                open={videoModalOpen}
                handleClose={() => setVideoModalOpen(false)}
                handleVideoWatched={() => setVideoWatched(true)}
            />
        </>
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
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
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

