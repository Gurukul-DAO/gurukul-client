import { Chip, Container, Grid } from "@mui/material";

export default function MyTokens() {

    let guruOwn = 4500;
    let guruStaked = 1500;

    return (
        <Container sx={{ mt: 5 }}>
            <Grid container spacing={10} alignItems="center">
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Chip  sx={{fontSize:30, height: 45}} size="large" color="success" label="$GURU OWN" variant="outlined" /><br/>
                    <Chip sx={{fontSize:15}} color="success" label={"$GURU ".concat(guruOwn)} variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Chip sx={{fontSize:30, height: 45}} color="primary" label="$GURU STAKED" variant="outlined" /><br/>
                    <Chip sx={{fontSize:15}} color="primary" label={"$GURU ".concat(guruStaked)} variant="outlined" />
                </Grid>
            </Grid>
        </Container>)
}