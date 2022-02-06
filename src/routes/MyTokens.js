import { Chip, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import GuruABI from "../abis/GuruABI";
import GurukulABI from "../abis/GurukulABI";
import { guruContractAddress, gurukulContractAddress } from "../credentials";

export default function MyTokens() {
    const [guruOwn, setGuruOwn] = useState(undefined);
    const [guruStacked, setGuruStaked] = useState(undefined);

    const { enableWeb3, isWeb3Enabled, user } = useMoralis();

    const { data: guruBalance, fetch: getGuruBalance } = useWeb3ExecuteFunction({
        abi: GuruABI,
        contractAddress: guruContractAddress,
        functionName: "balanceOf",
        params: {
            account: user.attributes.ethAddress
        }
    })

    const { data: allCoursesStudentList, fetch: getAllStudentCourses } = useWeb3ExecuteFunction({
        abi: GurukulABI,
        contractAddress: gurukulContractAddress,
        functionName: "getStudentCourse",
        params: {
            studentAddress: user.attributes.ethAddress,
        },
    });

    useEffect(() => {
        if (!isWeb3Enabled) {
            enableWeb3();
        }
        const init = async () => {
            if (user) {
                getGuruBalance();
                getAllStudentCourses();
            }
            
            setGuruOwn(guruBalance);

            if(allCoursesStudentList) {
                setGuruStaked(allCoursesStudentList.length*50);
            }
        };

        if (!guruOwn || !guruStacked) {
            init();
        }
    }, [user, enableWeb3, isWeb3Enabled, getGuruBalance, guruBalance, guruOwn, guruStacked, allCoursesStudentList, getAllStudentCourses, allCoursesStudentList]);


    return (
        <Container sx={{ mt: 5 }}>
            <Grid container spacing={10} alignItems="center">
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Chip sx={{ fontSize: 30, height: 45 }} size="large" color="success" label="$GURU OWN" variant="outlined" /><br />
                    <Chip sx={{ fontSize: 15 }} color="success" label={"$GURU ".concat(guruOwn / Math.pow(10, 18))} variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Chip sx={{ fontSize: 30, height: 45 }} color="primary" label="$GURU STAKED" variant="outlined" /><br />
                    <Chip sx={{ fontSize: 15 }} color="primary" label={"$GURU ".concat(guruStacked ? guruStacked: 0)} variant="outlined" />
                </Grid>
            </Grid>
        </Container>)
}