import { Box, Container, Grid, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import CourseCard from "../components/CourseCard";

export default function Dashboard() {
    const [tabState, setTabState] = useState(0);

    const handleChange = (event, newValue) => {
        setTabState(newValue);
    };

    return (
        <Container sx={{ mt: 2 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabState} onChange={handleChange}>
                    <Tab label="NFT's Owned" {...a11yProps(0)} />
                    <Tab label="NFT's Unclaimed" {...a11yProps(1)} />
                </Tabs>
            </Box>

            <TabPanel value={tabState} index={0}>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                    <CourseCard
                        id="0"
                        courseName="NFT for First Course"
                        imageUrl="https://i.insider.com/6123e0324932030018457fa3?width=700" 
                        nft />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4}>
                    <CourseCard
                        id="2"
                        courseName="NFT for Second Course"
                        imageUrl="https://media.alephbusiness.ro//2022/01/nft.jpeg"
                        nft />
                </Grid>
            </TabPanel>

            <TabPanel value={tabState} index={1}>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                    <CourseCard
                        id="1"
                        courseName="NFT for Third Course"
                        imageUrl="https://static.dw.com/image/57342486_303.jpg"
                        nftUnclaimed />
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