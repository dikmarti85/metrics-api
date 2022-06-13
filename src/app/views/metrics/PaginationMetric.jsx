import {Button, Table, TableBody, TableCell, TableHead, TablePagination, TableRow,} from '@mui/material'
import React, {useEffect, useState} from "react";
import {Box, styled} from '@mui/system'
import {SimpleCard} from 'app/components'
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import LoadingSpinner from "./LoadingSpinner";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {DatePicker} from "@mui/lab";
import "./css/Modal.css";

const Container = styled('div')(({theme}) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

const StyledTable = styled(Table)(({theme}) => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': {
            '& th': {
                paddingLeft: 0,
                paddingRight: 0,
            },
        },
    },
    '& tbody': {
        '& tr': {
            '& td': {
                paddingLeft: 0,
                textTransform: 'capitalize',
            },
        },
    },
}))

const PaginationMetric = () => {
    const [rowsPerPage, setRowsPerPage] = React.useState(20)
    const [page, setPage] = React.useState(0)
    const initialValue = []
    const [status, setStatus] = React.useState(false)
    const [metrics, setMetrics] = React.useState([]);
    const [open, setOpen] = React.useState(false)
    const [errorName, setErrorName] = React.useState('')
    const [openMetricValue, setOpenMetricValue] = React.useState(false)
    const [successMetricValue, setSuccessMetricValue] = React.useState(false)
    const [stateMetricValue, setStateMetricValue] = useState({
        date: new Date(),
    })

    const [state, setState] = useState({
        date: new Date(),
        loading: false,
    })

    function handleCloseModal() {
        setSuccessMetricValue(false)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const getData = async (loading) => {
        if (!status || (loading != null && loading)) {
            const resp = await fetch("https://metrics-351617.rj.r.appspot.com/metrics/");
            const data = await resp.json();
            setMetrics(data.content);
            setStatus(true);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    function handleClickOpen() {
        setOpen(true)
        setErrorName('')
        setState({
            ...state,
            name: '',
        })
    }

    function handleClose() {
        setOpen(false)
    }

    function handleSend(nameParam) {

        setErrorName('')

        if (nameParam != null && nameParam.length == 0) {
            setErrorName('*Required')
        } else {
            setOpen(false)
            setState({
                ...state,
                loading: true,
            })

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
                .then(response => {
                    console.log('Success:', response)
                    setStatus(false);
                    getData(true);
                    setState({
                        ...state,
                        loading: false,
                    })

                });
        }
    }

    const handleChange = (event) => {
        event.persist()
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }

    const {
        name,
    } = state

    function handleClickOpenMetricValue() {
        setOpenMetricValue(true)
    }

    function handleCloseMetricValue() {
        setOpenMetricValue(false)
    }

    function handleSendMetricValue(valueParam, dateParam, metric) {
        setOpenMetricValue(false)
        var url = 'https://metrics-351617.rj.r.appspot.com/metrics/value';
        var data = {
            value: valueParam,
            time: dateParam,
            metric: {id: metric}
        };

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                console.log('Success:', response)
                setSuccessMetricValue(true)
            });

    }

    const handleChangeMetricValue = (event) => {
        event.persist()
        setStateMetricValue({
            ...stateMetricValue,
            [event.target.name]: event.target.value,
        })
    }

    const handleDateChangeMetricValue = (date) => {
        setStateMetricValue({...stateMetricValue, date})
    }


    const {
        value,
        date,
    } = stateMetricValue

    return (
        <Container>
            <div>
                <Dialog
                    open={successMetricValue}
                    onClose={handleCloseModal}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogContent>
                        <div id="success_tic" className="modal fade" role="dialog">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="page-body">
                                        <div className="head">
                                            <h4>Metric Value added successfully</h4>
                                        </div>
                                        <div className="checkmark-circle" style={{marginLeft: '30px'}}>
                                            <div className="background"></div>
                                            <div className="checkmark draw"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            <Box py="12px"/>
            <div>
                <div style={{display: 'flex'}}>
                    <div style={{padding: '1em'}}>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={handleClickOpen}
                        >
                            Add Metric
                        </Button>
                    </div>
                    <div style={{padding: '1em'}}>
                        {state.loading ? <LoadingSpinner/> : ''}
                    </div>
                </div>
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
                        />
                        <div id={'errorMetric'} item xs={2} alignItems={"center"}
                             style={{color: 'red', paddingLeft: '15px', paddingTop: '60px'}}>
                            {errorName}
                        </div>
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
            <Box py="12px"/>

            <SimpleCard title="Metrics">
                <Box width="80%">
                    <StyledTable>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {metrics.map((metric, index) => (
                                <TableRow key={index}>
                                    <TableCell align="left">
                                        {metric.name}
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                onClick={handleClickOpenMetricValue}
                                            >
                                                Add Metric Value
                                            </Button>
                                            <Dialog
                                                open={openMetricValue}
                                                onClose={handleCloseMetricValue}
                                                aria-labelledby="form-dialog-title"
                                            >
                                                <DialogTitle id="form-dialog-title">Add Metric Value</DialogTitle>
                                                <DialogContent>

                                                    <TextField
                                                        autoFocus
                                                        onChange={handleChangeMetricValue}
                                                        margin="dense"
                                                        id="value"
                                                        label="Value"
                                                        type="text"
                                                        name="value"
                                                        fullWidth={true}
                                                        value={value}
                                                    />
                                                    <div><br/></div>
                                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                        <DatePicker
                                                            value={date}
                                                            onChange={handleDateChangeMetricValue}
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
                                                        onClick={handleCloseMetricValue}
                                                    >
                                                        Cancel
                                                    </Button>
                                                    <Button
                                                        onClick={() => handleSendMetricValue(value, date, `${metric.id}`)}
                                                        color="primary">
                                                        Send
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </StyledTable>

                    <TablePagination
                        sx={{px: 2}}
                        rowsPerPageOptions={[20, 30, 50]}
                        component="div"
                        count={initialValue.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        backIconButtonProps={{
                            'aria-label': 'Previous Page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'Next Page',
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Box>
            </SimpleCard>
        </Container>
    )
}
export default PaginationMetric
