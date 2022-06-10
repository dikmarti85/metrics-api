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

    const minDateSelectableMetric = new Date().setFullYear((new Date()).getFullYear() - 1)
    const [disabledDate, setDisabledDate] = React.useState(true)
    const [disabledTime, setDisabledTime] = React.useState(false)
    const [selectedValue, setSelectedValue] = React.useState('time')
    const [labelsX, setLabelsX] = React.useState([])

    const [minutesToRender, setMinutesToRender] = React.useState([])
    const [hoursToRender, setHoursToRender] = React.useState([])
    const [daysToRender, setDaysToRender] = React.useState([])
    const [monthsToRender, setMonthsToRender] = React.useState([])
    const [yearsToRender, setYearsToRender] = React.useState([])

    const calculateValuesAxisX = (paramTime) => {

        const current = new Date();
        const myPastDate = new Date(current);
        const labels = [];
        const minutesCalc = [];
        const hoursCalc = [];
        const daysCalc = [];
        const monthCalc = [];
        const yearsCalc = [];

        // 5 minutes
        if (paramTime == 0) {
            myPastDate.setMinutes(myPastDate.getMinutes() - 5)
            const initialDate = new Date()
            initialDate.setTime(myPastDate.getTime())

            for (var i = 0; i <= 5; i++) {
                minutesCalc[i] = initialDate.getMinutes()
                labelsX[i] =  initialDate.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'});
                initialDate.setMinutes(initialDate.getMinutes() + 1)
            }
            setState({
                ...state,
                time: 'MIN',
            })
            //TODO:set date from
            console.log('myPastDate: ' + myPastDate)
        }

        // 15 minutes
        if (paramTime == 1) {

            myPastDate.setMinutes(myPastDate.getMinutes() - 15)
            const initialDate = new Date()
            initialDate.setTime(myPastDate.getTime())

            for (var i = 0; i <= 14; i++) {
                minutesCalc[i] = initialDate.getMinutes()
                labelsX[i] = initialDate.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'});
                initialDate.setMinutes(initialDate.getMinutes() + 1)
            }

            setState({
                ...state,
                time: 'MIN',
            })
        }

        // 30 minutes
        if (paramTime == 2) {
            myPastDate.setMinutes(myPastDate.getMinutes() - 30)
            const initialDate = new Date()
            initialDate.setTime(myPastDate.getTime())

            for (var i = 0; i <= 29; i++) {
                minutesCalc[i] = initialDate.getMinutes()
                var hour = initialDate.toLocaleString('en-GB', {hour: '2-digit'})
                var minute = ('0' + initialDate.toLocaleString('en-GB', {minute: '2-digit'})).slice(-2)

                if (i==0 || i==14 || i==28) {
                    labelsX[i] = `${hour} Hrs ${minute}`
                } else {
                    labelsX[i] = `${minute}`
                }
                initialDate.setMinutes(initialDate.getMinutes() + 1)
            }
            setState({
                ...state,
                time: 'MIN',
            })
        }

        // 1 hour
        if (paramTime == 3) {
            myPastDate.setHours(myPastDate.getHours() - 1)
            const initialDate = new Date()
            initialDate.setTime(myPastDate.getTime())

            for (var i = 0; i <= 59; i++) {
                minutesCalc[i] = initialDate.getMinutes()
                var minute =  ('0' + initialDate.toLocaleString('en-GB', {minute: '2-digit'})).slice(-2)
                if (i==0 || i==30 || i==58 || (initialDate.getMinutes() < (initialDate.getMinutes() - 1))) {
                    labelsX[i] = initialDate.toLocaleTimeString('en-GB', {hour: '2-digit'}) + ':' + minute
                } else {
                    labelsX[i] = minute
                }
                initialDate.setMinutes(initialDate.getMinutes() + 1)
            }
            setState({
                ...state,
                time: 'MIN',
            })
        }

        // 4 hour
        if (paramTime == 4) {
            myPastDate.setHours(myPastDate.getHours() - 4)
            const initialDate = new Date()
            initialDate.setTime(myPastDate.getTime())

            for (var i = 0; i <= 3; i++) {
                daysCalc[i] = initialDate.getDate()
                hoursCalc[i] = initialDate.getHours()
                labelsX[i] = initialDate.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'});
                initialDate.setHours(initialDate.getHours() + 1)
            }
            setState({
                ...state,
                time: 'HOUR',
            })
        }

        // 10 hour
        if (paramTime == 5) {
            myPastDate.setHours(myPastDate.getHours() - 10)
            const initialDate = new Date()
            initialDate.setTime(myPastDate.getTime())

            for (var i = 0; i <= 9; i++) {
                daysCalc[i] = initialDate.getDate()
                hoursCalc[i] = initialDate.getHours()
                labelsX[i] = initialDate.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'});
                initialDate.setHours(initialDate.getHours() + 1)
            }
            setState({
                ...state,
                time: 'HOUR',
            })
        }

        // 1 day
        if (paramTime == 6) {
            myPastDate.setDate(myPastDate.getDate() - 1)
            const initialDate = new Date()
            initialDate.setTime(myPastDate.getTime())

            for (var i = 0; i <= 23; i++) {
                daysCalc[i] = initialDate.getDate()
                hoursCalc[i] = initialDate.getHours()
                labelsX[i] = initialDate.toLocaleTimeString('en-GB', {
                    weekday: "short",
                    hour: '2-digit',
                    minute: '2-digit'
                });
                initialDate.setHours(initialDate.getHours() + 1)
            }
            setState({
                ...state,
                time: 'HOUR',
            })
        }

        // 2 day
        if (paramTime == 7) {
            myPastDate.setDate(myPastDate.getDate() - 2)
            const initialDate = new Date()
            initialDate.setTime(myPastDate.getTime())

            for (var i = 0; i <= 49; i++) {
                daysCalc[i] = initialDate.getDate()
                hoursCalc[i] = initialDate.getHours()
                labelsX[i] = initialDate.toLocaleTimeString('en-GB', {
                    weekday: "short",
                    hour: '2-digit',
                    minute: '2-digit'
                });
                initialDate.setHours(initialDate.getHours() + 1)
            }
            setState({
                ...state,
                time: 'HOUR',
            })
        }

        // 7 day
        if (paramTime == 8) {
            myPastDate.setDate(myPastDate.getDate() - 7)
            const initialDate = new Date()
            initialDate.setTime(myPastDate.getTime())

            for (var i = 0; i <= 7; i++) {
                daysCalc[i] = initialDate.getDate()
                monthCalc[i] = initialDate.getMonth()
                labelsX[i] = initialDate.toLocaleTimeString('en-GB', {
                    weekday: "short",
                    hour: '2-digit',
                    minute: '2-digit'
                });
                initialDate.setDate(initialDate.getDate() + 1)
            }
            setState({
                ...state,
                time: 'DAY',
            })
        }

        // 1 month
        if (paramTime == 9) {
            var currentMonth = new Date()
            myPastDate.setMonth(myPastDate.getMonth() - 1)
            const initialDate = new Date()
            initialDate.setTime(myPastDate.getTime())

            var time = currentMonth.getTime() - myPastDate.getTime()
            var days = time / (1000 * 3600 * 24);

            for (var i = 0; i <= days; i++) {
                daysCalc[i] = initialDate.getDate()
                monthCalc[i] = initialDate.getMonth()
                var month = initialDate.toLocaleString('en-GB', {month: "short"})
                labelsX[i] = `${initialDate.getDate()} ${month}`
                initialDate.setDate(initialDate.getDate() + 1)
            }
            setState({
                ...state,
                time: 'DAY',
            })
        }

        // 3 month
        if (paramTime == 10) {
            var currentMonth = new Date()
            myPastDate.setMonth(myPastDate.getMonth() - 3)
            const initialDate = new Date()
            initialDate.setTime(myPastDate.getTime())

            var time = currentMonth.getTime() - myPastDate.getTime()
            var days = time / (1000 * 3600 * 24);

            for (var i = 0; i <= days; i++) {
                daysCalc[i] = initialDate.getDate()
                monthCalc[i] = initialDate.getMonth()
                var month = initialDate.toLocaleString('en-GB', {month: "short"})
                labelsX[i] = `${initialDate.getDate()} ${month}`
                initialDate.setDate(initialDate.getDate() + 1)
            }
            setState({
                ...state,
                time: 'DAY',
            })
        }

        // 1 year
        if (paramTime == 11) {
            myPastDate.setFullYear(myPastDate.getFullYear() - 1)
            const initialDate = new Date()
            initialDate.setTime(myPastDate.getTime())

            for (var i = 0; i <= 12; i++) {
                yearsCalc[i] = initialDate.getFullYear()
                monthCalc[i] = initialDate.getMonth()
                var month = initialDate.toLocaleString('en-GB', {month: "short"})
                labelsX[i] = `${initialDate.getFullYear()}/${month}`
                initialDate.setMonth(initialDate.getMonth() + 1)
            }
            setState({
                ...state,
                time: 'MONTH',
            })
        }

        setLabelsX(labels)
        console.log('LabelsX: ' + labelsX)

        console.log('myPastDate FINAL: ' + myPastDate)

        setMinutesToRender(minutesCalc)
        setHoursToRender(hoursCalc)
        setDaysToRender(daysCalc)
        setMonthsToRender(monthCalc)
        setYearsToRender(yearsCalc)

        setState({
            ...state,
            date: myPastDate,
            dateEnd: current,
        })

        console.log('date from: ' + date)
        console.log('date end: ' + dateEnd)
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

        calculateValuesAxisX(newValue.value)

        setSource(labelsX);

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
        console.log('dateEnd: ' + dateEnd);
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

        setDisabledDate(true)
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
                                            minDate={minDateSelectableMetric}
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
                                            minDate={minDateSelectableMetric}
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
