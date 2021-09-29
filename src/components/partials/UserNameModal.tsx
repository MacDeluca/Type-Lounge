import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@material-ui/core"
import { TransitionProps } from "@material-ui/core/transitions/transition";
import React from "react";
import { forwardRef, useState } from "react";

interface UserNameModalProps {}
export const UserNameModal: React.FC<UserNameModalProps> = () => {
    const [show, setShow] = useState(false)
    const Transition = forwardRef(function Transition(
        props: TransitionProps & {
            children?: React.ReactElement<any, any>;
        },
        ref: React.Ref<unknown>,
        ) {
        return <Slide direction="up" ref={ref} {...props} />;
        });
    return(
        <div>
        <Button variant="outlined" onClick={()=>setShow(true)}>
            Slide in alert dialog
        </Button>
        <Dialog
            open={show}
            TransitionComponent={Transition}
            keepMounted
            onClose={s=>setShow(false)}
            aria-describedby="alert-dialog-slide-description"
        >
        <DialogTitle>{"Allow application to use cookies?"}</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
                This application needs access to cookies to store high scores.
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={s=>setShow(false)}>Disagree</Button>
            <Button onClick={s=>setShow(false)}>Agree</Button>
        </DialogActions>
        </Dialog>
    </div>
        )
}