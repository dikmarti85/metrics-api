import React, {Fragment, lazy, useEffect, useState} from 'react'
import {Autocomplete, Button, Grid, Icon, TextField} from '@mui/material'
import {Box, styled, useTheme} from '@mui/system'
import Loadable from "../../components/Loadable/Loadable"
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {DatePicker} from "@mui/lab";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {ValidatorForm} from "react-material-ui-form-validator";
import {Span} from "../../components/Typography";
import {createFilterOptions} from '@mui/material/Autocomplete'
import Radio from "@mui/material/Radio";
import {green} from "@mui/material/colors";

const MetricChart = Loadable(lazy(() => import("./MetricChart")))

const AutoComplete = styled(Autocomplete)(() => ({
    width: 300,
    marginBottom: '16px',
}))

const GreenRadio = styled(Radio)(() => ({
    color: green[400],
    '&$checked': {
        color: green[600],
    },
}))

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

const suggestions = [
    {label: 'Past 5 minutes', value: '0'},
    {label: 'Past 15 minutes', value: '1'},
    {label: 'Past 30 minutes', value: '2'},
    {label: 'Past 1 hour', value: '3'},
    {label: 'Past 4 hours', value: '4'},
    {label: 'Past 10 hours', value: '5'},
    {label: 'Past 1 day', value: '6'},
    {label: 'Past 2 days', value: '7'},
    {label: 'Past 7 days', value: '8'},
    {label: 'Past 1 month', value: '9'},
    {label: 'Past 3 month', value: '10'},
    {label: 'Past 1 year', value: '11'},
]

const CalculateMetricView = () => {
    const theme = useTheme()

    const filter = createFilterOptions()
    const [status, setStatus] = React.useState(false)
    const [metrics, setMetrics] = React.useState([{}]);
    const [source, setSource] = React.useState([])
    const [valueComboTime, setValueComboTime] = React.useState(null)
    const [valueComboMetric, setValueComboMetric] = React.useState(null)
    const [state, setState] = useState({
        date: new Date(),
    })

    const [disabledDate, setDisabledDate] = React.useState(false)
    const [disabledTime, setDisabledTime] = React.useState(false)
    const [selectedValue, setSelectedValue] = React.useState('a')
    const [labelsX, setLabelsX] = React.useState([])

    const calculateValuesAxisX = (paramTime) => {

        const current = new Date();
        const myPastDate = new Date(current);
        const labels = [];

        // 5 minutes
        if (paramTime == 0) {
            myPastDate.setMinutes(myPastDate.getMinutes() - 5)
            const initialDate = myPastDate;

            for (var i = 0; i <= 5; i++) {
                var hour = initialDate.toLocaleString('en-US', {hour: '2-digit'})
                var minute = initialDate.toLocaleString('en-US', {minute: '2-digit'})
                labelsX[i] = `${hour}:${minute}`
                initialDate.setMinutes(initialDate.getMinutes() + 1)
            }
        }

        // 15 minutes
        if (paramTime == 1) {
            myPastDate.setMinutes(myPastDate.getMinutes() - 15)
            const initialDate = myPastDate;

            for (var i = 0; i <= 5; i++) {
                var hour = initialDate.toLocaleString('en-US', {hour: '2-digit'})
                var minute = initialDate.toLocaleString('en-US', {minute: '2-digit'})
                labelsX[i] = `${hour}:${minute}`
                initialDate.setMinutes(initialDate.getMinutes() + 3)
            }
        }

        // 30 minutes
        if (paramTime == 2) {
            myPastDate.setMinutes(myPastDate.getMinutes() - 30)
            const initialDate = myPastDate;

            for (var i = 0; i <= 5; i++) {
                var hour = initialDate.toLocaleString('en-US', {hour: '2-digit'})
                var minute = initialDate.toLocaleString('en-US', {minute: '2-digit'})
                labelsX[i] = `${hour}:${minute}`
                initialDate.setMinutes(initialDate.getMinutes() + 6)
            }
        }

        // 1 hour
        if (paramTime == 3) {
            myPastDate.setHours(myPastDate.getHours() - 1)
            const initialDate = myPastDate;

            for (var i = 0; i <= 5; i++) {
                labelsX[i] = initialDate.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'});
                initialDate.setMinutes(initialDate.getMinutes() + 12)
            }
        }

        // 4 hour
        if (paramTime == 4) {
            myPastDate.setHours(myPastDate.getHours() - 4)
            const initialDate = myPastDate;

            for (var i = 0; i <= 5; i++) {
                labelsX[i] = initialDate.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'});
                initialDate.setMinutes(initialDate.getMinutes() + 48)
            }
        }

        // 10 hour
        if (paramTime == 5) {
            myPastDate.setHours(myPastDate.getHours() - 10)
            const initialDate = myPastDate;

            for (var i = 0; i <= 5; i++) {
                labelsX[i] = initialDate.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'});
                initialDate.setMinutes(initialDate.getMinutes() + 120)
            }
        }

        // 1 day
        if (paramTime == 6) {
            myPastDate.setDate(myPastDate.getDate() - 1)
            const initialDate = myPastDate;

            for (var i = 0; i <= 8; i++) {
                labelsX[i] = initialDate.toLocaleTimeString('en-GB', {
                    weekday: "short",
                    hour: '2-digit',
                    minute: '2-digit'
                });
                initialDate.setHours(initialDate.getHours() + 3)
            }
        }

        // 2 day
        if (paramTime == 7) {
            myPastDate.setDate(myPastDate.getDate() - 2)
            const initialDate = myPastDate;

            for (var i = 0; i <= 8; i++) {
                labelsX[i] = initialDate.toLocaleTimeString('en-GB', {
                    weekday: "short",
                    hour: '2-digit',
                    minute: '2-digit'
                });
                initialDate.setHours(initialDate.getHours() + 6)
            }
        }

        // 7 day
        if (paramTime == 8) {
            myPastDate.setDate(myPastDate.getDate() - 7)
            const initialDate = myPastDate;

            for (var i = 0; i <= 8; i++) {
                labelsX[i] = initialDate.toLocaleTimeString('en-GB', {
                    weekday: "short",
                    hour: '2-digit',
                    minute: '2-digit'
                });
                initialDate.setHours(initialDate.getHours() + 21)
            }
        }

        // 1 month
        if (paramTime == 9) {
            myPastDate.setMonth(myPastDate.getMonth() - 1)
            const initialDate = myPastDate;

            for (var i = 0; i <= 4; i++) {
                var month = initialDate.toLocaleString('en-GB', {month: "short"})
                labelsX[i] = `${initialDate.getDate()} ${month}`
                initialDate.setHours(initialDate.getHours() + 180)
            }
        }

        // 3 month
        if (paramTime == 10) {
            myPastDate.setMonth(myPastDate.getMonth() - 3)
            const initialDate = myPastDate;

            for (var i = 0; i <= 6; i++) {
                var month = initialDate.toLocaleString('en-GB', {month: "short"})
                labelsX[i] = `${initialDate.getDate()} ${month}`
                initialDate.setDate(initialDate.getDate() + 15)
            }
        }

        // 1 year
        if (paramTime == 11) {
            myPastDate.setFullYear(myPastDate.getFullYear() - 1)
            const initialDate = myPastDate;

            for (var i = 0; i <= 12; i++) {
                var month = initialDate.toLocaleString('en-GB', {month: "short"})
                labelsX[i] = `${initialDate.getFullYear()}/${month}`
                initialDate.setMonth(initialDate.getMonth() + 1)
            }
        }

        setLabelsX(labels)
    }

    const handleComboMetricChange = (event, newValue) => {
        if (newValue && newValue.inputValue) {
            setValueComboMetric({
                label: newValue.inputValue,
            })
            return
        }
        setState({
            ...state,
            metricName: newValue.value,
        })
    }

    const handleComboTimeChange = (event, newValue) => {
        if (newValue && newValue.inputValue) {
            setValueComboTime({
                label: newValue.inputValue,
            })
            return
        }
        setState({
            ...state,
            time: newValue.value,
        })

        calculateValuesAxisX(newValue.value)

    }

    const handleDateChange = (date) => {
        setState({...state, date})
    }

    const handleDateEndChange = (dateEnd) => {
        setState({...state, dateEnd})
    }

    function handleRadioChange(event) {
        setSelectedValue(event.target.value)
        console.log(event.target.value);

        if (event.target.value == 'time') {
            setDisabledDate(true)
            setDisabledTime(false)
        } else {
            if (event.target.value == 'range') {
                setDisabledTime(true)
                setDisabledDate(false)
            }
        }
    }


    const handleSubmit = (event) => {

        console.log('date: ' + date);
        console.log('timeType: ' + time)
        console.log('metricName: ' + metricName)

        var url = 'https://metrics-351617.rj.r.appspot.com/metrics/calc';
        var data = {
            dateFrom: date,
            timeType: time,
            metricName: metricName
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

                setSource(response.labels)
            });

        setDisabledDate(false)
        setDisabledTime(false)

    }

    const getData = async () => {

        const resp = await fetch("https://metrics-351617.rj.r.appspot.com/metrics/");
        const data = await resp.json();
        let metricList = []

        data.content.forEach((metric) => (
            metricList.push({label: metric.name, value: metric.name})
        ))

        setMetrics(metricList);
        setStatus(true);
    };

    useEffect(() => {
        getData();
    }, []);

    const reload = () => window.location.reload();

    const {
        metricName,
        time,
        date,
        dateEnd,
    } = state

    return (


        <Fragment>
            <Box width="80%">
                <ValidatorForm onSubmit={handleSubmit} onError={() => null}>

                    <div className="App">
                        <Grid alignItems="flex-start" container spacing={1}>
                            <Grid container direction="column" item xs={1}>
                                <Grid item xs={2}>
                                    <Radio
                                        checked={selectedValue === 'range'}
                                        onChange={handleRadioChange}
                                        value="range"
                                        name="radio-button-demo"
                                        inputProps={{'aria-label': 'A'}}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                </Grid>
                            </Grid>
                            <Grid container direction="column" item xs={4} spacing={1}>
                                <Grid item xs={8}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            disabled={disabledDate}
                                            inputFormat="dd/MM/yyyy"
                                            value={date}
                                            onChange={handleDateChange}
                                            renderInput={(props) => (
                                                <TextField
                                                    {...props}
                                                    // variant="Outlined"
                                                    id="mui-pickers-date"
                                                    label="Date From"
                                                    sx={{mb: 2, width: '56%'}}
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={8}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            disabled={disabledDate}
                                            inputFormat="dd/MM/yyyy"
                                            value={date}
                                            onChange={handleDateEndChange}
                                            renderInput={(props) => (
                                                <TextField
                                                    {...props}
                                                    // variant="Outlined"
                                                    id="mui-pickers-date"
                                                    label="Date End"
                                                    sx={{mb: 2, width: '56%'}}
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                            </Grid>
                            <Grid container direction="column" item xs={1} spacing={1}>
                                <Grid item xs={2}>
                                    <Radio
                                        checked={selectedValue === 'time'}
                                        onChange={handleRadioChange}
                                        value="time"
                                        name="radio-button-demo"
                                        inputProps={{'aria-label': 'B'}}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                </Grid>
                            </Grid>
                            <Grid container direction="column" item xs={4} spacing={1}>
                                <Grid item xs={6}>
                                    <AutoComplete
                                        disabled={disabledTime}
                                        options={suggestions}
                                        getOptionLabel={(option) => option.label}
                                        onChange={handleComboTimeChange}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Select time"
                                                variant="outlined"
                                                fullWidth
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <AutoComplete
                                        options={metrics}
                                        getOptionLabel={(option) => option.label}
                                        onChange={handleComboMetricChange}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Select metric name"
                                                variant="outlined"
                                                fullWidth
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container direction="column" item xs={1} spacing={1}>
                                <Grid item xs={2}>
                                </Grid>
                                <Grid item xs={2} alignItems={"center"}>
                                </Grid>
                            </Grid>
                            <Grid container direction="column" item xs={1} spacing={1}>
                                <Grid item xs={2}>
                                    <div></div>
                                </Grid>
                                <Grid item xs={2} alignItems={"center"}>
                                    <br/> <br/> <br/> <br/>
                                    <Button color="primary" variant="contained" type="submit" onSubmit={handleSubmit}>
                                        <Icon>send</Icon>
                                        <Span sx={{pl: 1, textTransform: 'capitalize'}}>
                                            Find
                                        </Span>
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>


                </ValidatorForm>
            </Box>
            <Box py="20px"/>

            {
                <MetricChart
                    height="350px"
                    color={[
                        theme.palette.primary.dark,
                        theme.palette.primary.light,
                    ]}
                    values={source}
                />
            }
        </Fragment>

    )
}

export default CalculateMetricView
