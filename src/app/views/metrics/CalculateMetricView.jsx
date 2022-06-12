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
    const [avg, setAvg] = React.useState([])
    const [valueComboTime, setValueComboTime] = React.useState(null)
    const [valueComboMetric, setValueComboMetric] = React.useState(null)
    const [state, setState] = useState({
        date: new Date(),
        dateEnd: new Date(),
    })

    const minDateSelectableMetric = new Date().setFullYear((new Date()).getFullYear() - 1)
    const maxDateSelectableMetric = new Date()
    const [disabledDate, setDisabledDate] = React.useState(true)
    const [disabledTime, setDisabledTime] = React.useState(false)
    const [selectedValue, setSelectedValue] = React.useState('time')
    const [labelsX, setLabelsX] = React.useState([])
    const [errorTime, setErrorTime] = React.useState('')
    const [errorMetricName, setErrorMetricName] = React.useState('')

    const [minutesToRender, setMinutesToRender] = React.useState([])
    const [hoursToRender, setHoursToRender] = React.useState([])
    const [daysToRender, setDaysToRender] = React.useState([])
    const [monthsToRender, setMonthsToRender] = React.useState([])
    const [yearsToRender, setYearsToRender] = React.useState([])
    const [timeParam, setTimeParam] = React.useState('')
    const [timeParamPrev, setTimeParamPrev] = React.useState('')

    const calculateValuesAxisX = (paramTime) => {

        const current = new Date();
        const myPastDate = new Date(current);
        const labels = [];
        const minutesCalc = [];
        const hoursCalc = [];
        const daysCalc = [];
        const monthCalc = [];
        const yearsCalc = [];
        const timeP = [];

        var len = labelsX.length;

        for (var i = 0; i <= len; i++) {
            labelsX[i] = null;
        }
        console.log('CLEAR labelsX' + labelsX)

        // 5 minutes
        if (paramTime == 0) {
            myPastDate.setMinutes(myPastDate.getMinutes() - 5)
            const initialDate = new Date()
            initialDate.setTime(myPastDate.getTime())

            for (var i = 0; i <= 5; i++) {
                minutesCalc[i] = initialDate.getMinutes()
                labelsX[i] = initialDate.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'});
                initialDate.setMinutes(initialDate.getMinutes() + 1)
            }
            timeP[0] = 'MIN'
            setTimeParam(timeP[0])
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

            timeP[0] = 'MIN'
            setTimeParam(timeP[0])
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

                if (i == 0 || i == 14 || i == 28) {
                    labelsX[i] = `${hour} Hrs ${minute}`
                } else {
                    labelsX[i] = `${minute}`
                }
                initialDate.setMinutes(initialDate.getMinutes() + 1)
            }
            timeP[0] = 'MIN'
            setTimeParam(timeP[0])
        }

        // 1 hour
        if (paramTime == 3) {
            myPastDate.setHours(myPastDate.getHours() - 1)
            const initialDate = new Date()
            initialDate.setTime(myPastDate.getTime())

            for (var i = 0; i <= 59; i++) {
                minutesCalc[i] = initialDate.getMinutes()
                var minute = ('0' + initialDate.toLocaleString('en-GB', {minute: '2-digit'})).slice(-2)
                if (i == 0 || i == 30 || i == 58 || (initialDate.getMinutes() < (initialDate.getMinutes() - 1))) {
                    labelsX[i] = initialDate.toLocaleTimeString('en-GB', {hour: '2-digit'}) + ':' + minute
                } else {
                    labelsX[i] = minute
                }
                initialDate.setMinutes(initialDate.getMinutes() + 1)
            }
            timeP[0] = 'MIN'
            setTimeParam(timeP[0])
        }

        // 4 hour
        if (paramTime == 4) {
            myPastDate.setHours(myPastDate.getHours() - 4)
            const initialDate = new Date()
            initialDate.setTime(myPastDate.getTime())

            for (var i = 0; i <= 4; i++) {
                daysCalc[i] = initialDate.getDate()
                hoursCalc[i] = initialDate.getHours()
                labelsX[i] = initialDate.toLocaleTimeString('en-GB', {
                    weekday: 'short',
                    hour: '2-digit',
                    minute: '2-digit'
                });
                initialDate.setHours(initialDate.getHours() + 1)
            }
            timeP[0] = 'HOUR'
            setTimeParam(timeP[0])
        }

        // 10 hour
        if (paramTime == 5) {
            myPastDate.setHours(myPastDate.getHours() - 10)
            const initialDate = new Date()
            initialDate.setTime(myPastDate.getTime())

            for (var i = 0; i <= 10; i++) {
                daysCalc[i] = initialDate.getDate()
                hoursCalc[i] = initialDate.getHours()
                labelsX[i] = initialDate.toLocaleTimeString('en-GB', {
                    weekday: 'short',
                    hour: '2-digit',
                    minute: '2-digit'
                });
                initialDate.setHours(initialDate.getHours() + 1)
            }
            timeP[0] = 'HOUR'
            setTimeParam(timeP[0])
        }

        // 1 day
        if (paramTime == 6 || paramTime == 7) {
            if (paramTime == 6)  myPastDate.setDate(myPastDate.getDate() - 1)
            if (paramTime == 7)  myPastDate.setDate(myPastDate.getDate() - 2)

            const initialDate = new Date()
            initialDate.setTime(myPastDate.getTime())

            var currentMonth = new Date()
            var time = currentMonth.getTime() - myPastDate.getTime()
            var days = time / (1000 * 3600);

            for (var i = 0; i <= days; i++) {
                daysCalc[i] = initialDate.getDate()
                hoursCalc[i] = initialDate.getHours()
                labelsX[i] = initialDate.toLocaleTimeString('en-GB', {
                    weekday: "short",
                    hour: '2-digit',
                    minute: '2-digit'
                });
                initialDate.setHours(initialDate.getHours() + 1)
            }
            timeP[0] = 'HOUR'
            setTimeParam(timeP[0])
        }

        // 7 day
        if (paramTime == 8) {
            myPastDate.setDate(myPastDate.getDate() - 7)
            const initialDate = new Date()
            initialDate.setTime(myPastDate.getTime())

            for (var i = 0; i <= 7; i++) {
                daysCalc[i] = initialDate.getDate()
                monthCalc[i] = initialDate.getMonth() +1
                labelsX[i] = initialDate.toLocaleTimeString('en-GB', {
                    weekday: "short",
                    hour: '2-digit',
                    minute: '2-digit'
                });
                initialDate.setDate(initialDate.getDate() + 1)
            }
            timeP[0] = 'DAY'
            setTimeParam(timeP[0])
        }

        // 3 month
        if (paramTime == 9 || paramTime == 10) {
            var currentMonth = new Date()
            myPastDate.setMonth(myPastDate.getMonth() - 3)
            const initialDate = new Date()
            initialDate.setTime(myPastDate.getTime())

            var time = currentMonth.getTime() - myPastDate.getTime()
            var days = time / (1000 * 3600 * 24);

            for (var i = 0; i <= days; i++) {
                daysCalc[i] = initialDate.getDate()
                monthCalc[i] = initialDate.getMonth() +1
                var month = initialDate.toLocaleString('en-GB', {month: "short"})
                labelsX[i] = `${initialDate.getDate()} ${month}`
                initialDate.setDate(initialDate.getDate() + 1)
            }
            timeP[0] = 'DAY'
            setTimeParam(timeP[0])
        }

        // 1 year
        if (paramTime == 11) {
            myPastDate.setFullYear(myPastDate.getFullYear() - 1)
            const initialDate = new Date()
            initialDate.setTime(myPastDate.getTime())

            for (var i = 0; i <= 12; i++) {
                yearsCalc[i] = initialDate.getFullYear()
                monthCalc[i] = initialDate.getMonth() +1
                var month = initialDate.toLocaleString('en-GB', {month: "short"})
                labelsX[i] = `${initialDate.getFullYear()}/${month}`
                initialDate.setMonth(initialDate.getMonth() + 1)
            }
            timeP[0] = 'MONTH'
            setTimeParam(timeP[0])
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

        setTimeParam(timeP[0])
        setTimeParamPrev(timeP[0])

        console.log('timeP: ' + timeP[0])
        console.log('timeParam: ' + timeParam)
        console.log('date from: ' + date)
        console.log('date end: ' + dateEnd)
    }

    const handleComboMetricChange = (event, newValue) => {
        if (newValue && newValue.inputValue) {
            setValueComboMetric({
                label: newValue.inputValue,
            })
            return
        } else {
            if (newValue != null) {
                setState({
                    ...state,
                    metricName: newValue.value,
                })
            }
        }
    }

    function calculateValuesByRangeX() {

        const difference = dateEnd.getTime() - date.getTime()
        const minutesCalc = [];
        const hoursCalc = [];
        const daysCalc = [];
        const monthCalc = [];
        const yearsCalc = [];
        const timeP = [];

        if (difference < 0) {
            return false;
        }
        const initialDate = new Date()
        var days = difference / (1000 * 3600 * 24);
        days = Math.trunc(days)
        var months = difference / (1000 * 3600 * 24 * 30);
        months = Math.trunc(months)
        console.log('days: ' + days)
        console.log('months: ' + months)

        if (days == 0) {
            initialDate.setTime(date.getTime())

            for (var i = 0; i <= 24; i++) {
                daysCalc[i] = initialDate.getDate()
                hoursCalc[i] = initialDate.getHours()
                labelsX[i] = initialDate.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'});
                initialDate.setHours(initialDate.getHours() + 1)
            }
            timeP[0] = 'HOUR'
            timeP[1] = minutesCalc
            timeP[2] = hoursCalc
            timeP[3] = daysCalc
            timeP[4] = monthCalc
            timeP[5] = yearsCalc
            setTimeParam(timeP[0])
            updateParamsTime(minutesCalc, hoursCalc, daysCalc, monthCalc, yearsCalc)
            return timeP;
        }

        if (days < 7) {

            initialDate.setTime(date.getTime())

            for (var i = 0; i <= days; i++) {
                daysCalc[i] = initialDate.getDate()
                hoursCalc[i] = initialDate.getHours()
                labelsX[i] = initialDate.toLocaleTimeString('en-GB', {
                    weekday: "short",
                    hour: '2-digit',
                    minute: '2-digit'
                });
                initialDate.setHours(initialDate.getHours() + 1)
            }
            timeP[0] = 'HOUR'
            timeP[1] = minutesCalc
            timeP[2] = hoursCalc
            timeP[3] = daysCalc
            timeP[4] = monthCalc
            timeP[5] = yearsCalc
            setTimeParam(timeP[0])
            updateParamsTime(minutesCalc, hoursCalc, daysCalc, monthCalc, yearsCalc)
            return timeP;
        }

        if (days <= 93) {

            initialDate.setTime(date.getTime())

            for (var i = 0; i <= days; i++) {
                daysCalc[i] = initialDate.getDate()
                monthCalc[i] = initialDate.getMonth()+1
                labelsX[i] = initialDate.toLocaleTimeString('en-GB', {
                    weekday: "short",
                    hour: '2-digit',
                    minute: '2-digit'
                });
                initialDate.setDate(initialDate.getDate() + 1)
            }
            timeP[0] = 'DAY'
            timeP[1] = minutesCalc
            timeP[2] = hoursCalc
            timeP[3] = daysCalc
            timeP[4] = monthCalc
            timeP[5] = yearsCalc
            setTimeParam(timeP[0])
            updateParamsTime(minutesCalc, hoursCalc, daysCalc, monthCalc, yearsCalc)
            return timeP;
        }

        if (days > 93) {
            initialDate.setTime(date.getTime())

            console.log(' initialDate' +  initialDate)
            for (var i = 0; i <= months; i++) {
                yearsCalc[i] = initialDate.getFullYear()
                monthCalc[i] = initialDate.getMonth() + 1
                console.log(' initialDate.getMonth()' +  initialDate.getMonth())
                var month = initialDate.toLocaleString('en-GB', {month: "short"})
                labelsX[i] = `${initialDate.getFullYear()}/${month}`
                initialDate.setMonth(initialDate.getMonth() + 1)
            }
            timeP[0] = 'MONTH'
            timeP[1] = minutesCalc
            timeP[2] = hoursCalc
            timeP[3] = daysCalc
            timeP[4] = monthCalc
            timeP[5] = yearsCalc
            setTimeParam(timeP[0])
            updateParamsTime(minutesCalc, hoursCalc, daysCalc, monthCalc, yearsCalc)
            return timeP;
        }
    }

    const updateParamsTime = (minutesCalc, hoursCalc, daysCalc, monthCalc, yearsCalc) => {
        setMinutesToRender(minutesCalc)
        setHoursToRender(hoursCalc)
        setDaysToRender(daysCalc)
        setMonthsToRender(monthCalc)
        setYearsToRender(yearsCalc)
        setSource(labelsX);
        console.log("calc by range labelsX: " + labelsX)
        console.log("calc by range monthCalc: " + monthCalc)
        console.log("calc by range monthCalc: " + yearsCalc)
    }

    const handleComboTimeChange = (event, newValue) => {
        if (newValue && newValue.inputValue) {
            console.log('SET AFTER COMBO VALUE' + valueComboTime)
            console.log('SET AFTER COMBO VALUE newValue.inputValue' + newValue.inputValue)
            setValueComboTime({
                label: newValue.inputValue,
            })
            return
        } else {
            if (newValue != null) {
                calculateValuesAxisX(newValue.value)
                setSource(labelsX);
            }
        }

    }

    const handleDateChange = (date) => {
        setState({...state, date})
    }

    const handleDateEndChange = (dateEnd) => {
        setState({...state, dateEnd})
    }

    function handleRadioChange(event) {
        setSelectedValue(event.target.value)

        console.log('valueComboTime:' + valueComboTime)
        console.log('On radio timeParamPrev:' + timeParamPrev)
        console.log('On radio timeParam:' + timeParam)

        if (event.target.value == 'time') {
            setDisabledDate(true)
            setDisabledTime(false)

            if (valueComboTime == null) {
                setTimeParam(null)
                const val = ''
                setValueComboTime({
                    label: val,
                })
            } else {
                if (timeParamPrev != null) {
                    setTimeParam(timeParamPrev)
                }
            }
        } else {
            if (event.target.value == 'range') {
                setDisabledTime(true)
                setDisabledDate(false)
                setErrorMetricName('')
                setErrorTime('')

                const val = ''
                setValueComboTime({
                    label: val,
                })
            }
        }
    }


    const handleSubmit = (event) => {

        console.log('date: ' + date);
        console.log('dateEnd: ' + dateEnd);
        console.log('timeType: ' + timeParam)
        console.log('metricName: ' + metricName)

        var error = false;
        var time = [];

        setErrorMetricName('')
        setErrorTime('')

        const timeByRange = []
        if (!disabledDate) {
            time = calculateValuesByRangeX()
            timeByRange[0] = time[0]
            setSource(labelsX);
        } else {
            timeByRange[0] = timeParam
        }

        if (!disabledTime) {
            if (timeParam == null || timeParam.trim().length == 0) {
                setErrorTime('*Required')
                error = true;
            }
        }

        if (metricName == null) {
            setErrorMetricName('*Required')
            error = true;
        }

        if (error === true) return;

        console.log('labels on submit: ' + labelsX);
        console.log('source on submit: ' + source);

        var url = 'https://metrics-351617.rj.r.appspot.com/metrics/calc';
        var data = {
            dateFrom: converDate(date),
            dateEnd: converDate(dateEnd),
            timeType: timeByRange[0],
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
                if (!disabledTime) {
                    setAvg(buildMetricsCalc(response, data.timeType, minutesToRender, hoursToRender, daysToRender, monthsToRender, yearsToRender))
                } else {
                    setAvg(buildMetricsCalc(response, data.timeType, time[1], time[2], time[3], time[4], time[5]))
                }
            });

    }

    function converDate(date) {
        const dateConverted = new Date(date)
        return dateConverted.getFullYear() + '-' +  addZero(dateConverted.getMonth()+1) + '-' +
            addZero(dateConverted.getDate()) + 'T' + addZero(dateConverted.getHours()) + ':' + addZero(dateConverted.getMinutes()) + ':' +
            addZero(dateConverted.getSeconds());
    }

    function addZero(value){
       return  ('0' + value).slice(-2)
    }

    function buildMetricsCalc(data, timeType, minutesToRender, hoursToRender, daysToRender, monthsToRender, yearsToRender) {

        const calc = [];

        if (timeType == 'MIN') {
            var j = 0

            minutesToRender.forEach((el, index) => {
                var filtered = null;
                console.log(el)
                data.minutes.forEach((obj, ind) => {
                    if (el == obj) {
                        j = ind
                        filtered = obj
                    }
                })
                console.log('index: ' + index)
                console.log('filtered: ' + filtered)
                console.log('j : ' + j)
                if (filtered != null) {
                    calc[index] = data.avgs[j];
                } else {
                    calc[index] = '0';
                }
            })
            console.log('calc: ' + calc)
            return calc;
        }

        if (timeType == 'HOUR') {
            var j = 0

            hoursToRender.forEach((el, index) => {
                var filtered = null;
                console.log(el)
                for (var i = 0; i < data.hours.length; i++) {
                    if (el == data.hours[i] && daysToRender[index] == data.days[i]) {
                        j = i
                        filtered = data.hours[i]
                    }
                }
                console.log('index: ' + index)
                console.log('filtered: ' + filtered)
                if (filtered != null) {
                    calc[index] = data.avgs[j];
                } else {
                    calc[index] = '0';
                }
            })
            console.log('calc: ' + calc)
            return calc;
        }

        if (timeType == 'DAY') {

            var j = 0

            daysToRender.forEach((el, index) => {
                var filtered = null;
                console.log(el)
                for (var i = 0; i < data.days.length; i++) {
                    if (el == data.days[i] && monthsToRender[index] == data.months[i]) {
                        j = i
                        filtered = data.days[i]
                    }
                }
                console.log('index: ' + index)
                console.log('filtered: ' + filtered)
                if (filtered != null) {
                    calc[index] = data.avgs[j];
                } else {
                    calc[index] = '0';
                }
            })
            console.log('calc: ' + calc)
            return calc;
        }

        if (timeType == 'MONTH') {

            var j = 0

            console.log('yearsToRender: ' + yearsToRender)
            console.log('monthsToRender: ' + monthsToRender)
            console.log('data.years: ' + data.years)
            console.log('data.months: ' + data.months)

            monthsToRender.forEach((el, index) => {
                var filtered = null;
                console.log(el)
                for (var i = 0; i < data.months.length; i++) {
                    if (el == data.months[i] && yearsToRender[index] == data.years[i]) {
                        j = i
                        filtered = data.months[i]
                    }
                }
                console.log('index: ' + index)
                console.log('filtered: ' + filtered)
                if (filtered != null) {
                    calc[index] = data.avgs[j];
                } else {
                    calc[index] = '0';
                }
            })
            console.log('calc: ' + calc)
            return calc;
        }

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
                                            maxDate={maxDateSelectableMetric}
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
                                            maxDate={maxDateSelectableMetric}
                                            disabled={disabledDate}
                                            inputFormat="dd/MM/yyyy"
                                            value={dateEnd}
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
                                <Grid id={'errorTime'} item xs={2} alignItems={"center"}
                                      style={{color: 'red', paddingLeft: '15px', paddingTop: '25px'}}>
                                    {errorTime}
                                </Grid>
                                <Grid id={'errorMetric'} item xs={2} alignItems={"center"}
                                      style={{color: 'red', paddingLeft: '15px', paddingTop: '60px'}}>
                                    {errorMetricName}
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
                    listAvg={avg}
                />
            }
        </Fragment>

    )
}

export default CalculateMetricView
