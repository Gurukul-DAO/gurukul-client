import { Box, Card, CardContent, CardMedia, Collapse, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { useMoralis } from "react-moralis";
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
            {publishedCourseData.map((course) => <Course course={course} />)}
        </TabPanel>
        <TabPanel value={tabState} index={1}>
            {privateCourseData.map((course) => <Course course={course} />)}
        </TabPanel>
    </>;
}

function Course(props) {
    const [expanded, setExpanded] = useState(true);

    return (
        <Card>
            <h4>{props.course.name}</h4>
            <CardContent>
                {props.course.videos.map(video =>
                    <Card sx={{ width: 200, height: 300, float: 'left', margin: 1 }}>
                        <CardMedia
                            component="img"
                            height="194"
                            image={"https://img.youtube.com/vi/" + video.youtubeId + "/0.jpg"}
                            alt="Preview image"
                        />
                        <CardContent>
                            {video.name}
                        </CardContent>
                    </Card>
                )}
            </CardContent>
        </Card>
    );
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

