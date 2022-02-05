import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { theme } from "../Theme";

export default function CourseCard({ courseId, courseName, imageUrl }) {

    return (
        <Card
        sx={{
          minWidth: 350,
          maxWidth: 600,
          backgroundColor: theme.palette.background.paper,
        }}
        variant="outlined"
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="300"
            image={imageUrl}
            alt= {courseName}
          />
          <CardContent>
            <Typography variant="h5" component="div">
              {courseName}
            </Typography>
          </CardContent>
        </CardActionArea>

      </Card>

    );
}