import React, {useState} from 'react'
import {Button,} from '@mui/material'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

export default function FormDialogMetric(metricFunction) {
    const [open, setOpen] = React.useState(false)
    const [state, setState] = useState({
        date: new Date(),
    })

    function handleClickOpen() {
        setOpen(true)
    }

    function handleClose() {
        setOpen(false)
    }

    function handleSend(nameParam) {

        setOpen(false)

        var url = 'https://metrics-351617.rj.r.appspot.com/metrics/';
        var data = {name: nameParam};

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));

        reload()
    }

    const handleChange = (event) => {
        event.persist()
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }

    const reload = () => window.location.reload();

    const {
        name,
    } = state

    return (
        <div>
            <Button
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
            >
                Add Metric
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Add Metric</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        onChange={handleChange}
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        name="name"
                        fullWidth={true}
                        value={name}
                        validators={['required']}
                        errorMessages={[
                            'this field is required'
                        ]}
                    />
                </DialogContent>

                <DialogActions>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                    <Button onClick={() => handleSend(name)}
                            color="primary">
                        Send
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
