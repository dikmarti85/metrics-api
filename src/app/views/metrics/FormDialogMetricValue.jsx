import React, {useState} from 'react'
import {Button, Grid, Icon,} from '@mui/material'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DialogTitle from '@mui/material/DialogTitle'
import {DatePicker} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

export default function FormDialogMetricValue (metric){
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

    function handleSend(valueParam, dateParam) {

        setOpen(false)

        var url = 'https://metrics-351617.rj.r.appspot.com/metrics/value';
        var data = {value: valueParam,
                     time: dateParam,
                     metric: { id: metric.metric}
                    };

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));

    }

    const handleChange = (event) => {
        event.persist()
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }

    const handleDateChange = (date) => {

        setState({...state, date})
    }


    const {
        value,
        date,
    } = state

    return (
        <div>
            <Button
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
            >
                Add Metric Value
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Add Metric Value</DialogTitle>
                <DialogContent>

                        <TextField
                            autoFocus
                            onChange={handleChange}
                            margin="dense"
                            id="value"
                            label="Value"
                            type="text"
                            name="value"
                            fullWidth={true}
                            value={value}
                            validators={['required']}
                            errorMessages={[
                                'this field is required'
                            ]}
                        />
                        <div><br/></div>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                value={date}
                                onChange={handleDateChange}
                                validators={['required']}
                                errorMessages={[
                                    'this field is required'
                                ]}
                                renderInput={(props) => (
                                    <TextField
                                        {...props}
                                        // variant="Outlined"
                                        id="mui-pickers-date"
                                        label="Date"
                                        sx={{mb: 2, width: '100%'}}
                                    />
                                )}
                            />
                        </LocalizationProvider>

                </DialogContent>

                <DialogActions>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                    <Button onClick={() => handleSend(value, date)} color="primary">
                        Send
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
