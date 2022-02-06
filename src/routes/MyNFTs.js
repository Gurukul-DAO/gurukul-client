import { Box, Container, Grid, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { getMintedNfts } from "../common/NftPort";
import CourseCard from "../components/CourseCard";

export default function Dashboard() {
    const [tabState, setTabState] = useState(0);
    const { user } = useMoralis();
    const [nftList, setNftList] = useState([]);

    const handleChange = (event, newValue) => {
        setTabState(newValue);
    };

    useEffect(() => {
        async function getNftList() {
            let nfts = await getMintedNfts();
            let responseJson = await nfts.json();
            console.log(responseJson);
            if (responseJson["response"] !== "OK") {
                throw new Error("Error fetching minted NFTs!");
            }

            const userName = user.get("ethAddress").toUpperCase();
            let myNfts = responseJson.minted_nfts.filter(entry => entry.mint_to_address.toUpperCase() === userName);

            setNftList(myNfts);
        }
        getNftList();
    }, [user]);

    return (
        <Container sx={{ mt: 2 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabState} onChange={handleChange}>
                    <Tab label="NFT's Owned" {...a11yProps(0)} />
                    <Tab label="NFT's Unclaimed" {...a11yProps(1)} />
                </Tabs>
            </Box>

            <TabPanel value={tabState} index={0}>
                {nftList && nftList.map(e => <NftCard nft={e} key={`nftcard-${e.token_id}`} />)}
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

function NftCard(props) {
    const [imageUri, setImageUri] = useState("https://i.insider.com/6123e0324932030018457fa3?width=700");
    const [courseName, setCourseName] = useState("Loading...");
    useEffect(() => {
        async function getNftData() {
            let ipfsUri = props.nft.metadata_uri.replace("ipfs://", "https://ipfs.io/ipfs/");
            let metadata = await fetch(ipfsUri);
            let metadataJson = await metadata.json();
            setCourseName(metadataJson.name);
            setImageUri(metadataJson.image);
        }

        getNftData();
    });
    return (
        <Grid item xs={12} sm={12} md={6} lg={4}>
            <CourseCard
                courseName={courseName}
                imageUrl={imageUri}
                nft />
        </Grid>
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