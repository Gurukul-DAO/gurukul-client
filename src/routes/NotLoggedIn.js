import { Box } from "@mui/system";

export default function NotLoggedIn() {
    return (
        <Box sx={{pt:10}}>
            <h2>Welcome to Gurukul!</h2>
            <div>
                The next-generation community and marketplace for educational content!<br />
                To interact with the platform, please sign in.
            </div>
        </Box>
    )
}