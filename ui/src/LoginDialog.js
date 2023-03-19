import {Button, Dialog, DialogTitle, TextField} from "@mui/material";
import {useState} from "react";

export default function LoginDialog({handleClose, open}) {
    const [value, setValue] = useState("");

    function onClick() {
        if (value) {
            handleClose(value);
        }
    }

    function onEnter(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            onClick();
        }
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Log in</DialogTitle>
            <div>
                <TextField sx={{ m: 2 }} variant="outlined" label="username" onKeyDown={onEnter} onChange={(e) => setValue(e.target.value)}/>
                <Button sx={{ m: 2 }} variant="contained" onClick={onClick}>Log in</Button>
            </div>
        </Dialog>
    )
}
