import { Cancel, Check } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import YouTube from "react-youtube";

export function WatchVideoDialog(props) {
    const [videoEnded, setVideoEnded] = useState(false);

    return (
        <Dialog
            open={props.open}
            onClose={() => props.handleClose()}
            maxWidth={false}>
            <DialogTitle>
                {props.video.name}
            </DialogTitle>
            <DialogContent>
                <YouTube
                    videoId={props.video.youtubeId}
                    onEnd={() => setVideoEnded(true)}
                    opts={{ playerVars: { autoplay: 0, modestbranding: 1 } }} />
            </DialogContent>
            <DialogActions>
                <Button disabled={!videoEnded} onClick={() => { props.handleVideoWatched(); props.handleClose() }}><Check />Mark watched</Button>
                <Button onClick={() => props.handleClose()}><Cancel /> Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}