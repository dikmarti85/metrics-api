import {Button, Table, TableBody, TableCell, TableHead, TablePagination, TableRow,} from '@mui/material'
import React, {useEffect, useState} from "react";
import {Box, styled} from '@mui/system'
import {SimpleCard} from 'app/components'
import FormDialogMetricValue from "./FormDialogMetricValue";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import LoadingSpinner from "./LoadingSpinner";

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
    const [state, setState] = useState({
        date: new Date(),
        loading: false,
    })

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const handleClickMetric = (metricId) => {
        console.log(metricId)
    }

    const getData = async (loading) => {
        if (!status || (loading != null && loading)) {
            console.log('in request ')
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

    const reload = () => window.location.reload();

    const {
        name,
    } = state

    return (
        <Container>
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
                            validators={['required']}
                            errorMessages={[
                                'this field is required'
                            ]}
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
                                        <FormDialogMetricValue metric={metric.id}/>
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
