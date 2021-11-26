import { Dialog, DialogTitle } from "@material-ui/core"
import React from "react"

export default function LogoutDialog(props: { open: boolean }) {
    return(<Dialog open={props.open}>
        <DialogTitle id="sign-out-dialog">Successfully Signed out!</DialogTitle>
    </Dialog>)
}
