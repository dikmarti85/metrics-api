import React, {Fragment, lazy} from 'react'
import {Autocomplete, TextField} from '@mui/material'
import {createFilterOptions} from '@mui/material/Autocomplete'
import {styled, useTheme} from '@mui/system'
import Loadable from "../../components/Loadable/Loadable"

const Result = Loadable(lazy(() => import("./Result")))
const MetricChart = Loadable(lazy(() => import("./MetricChart")))

const AutoComplete = styled(Autocomplete)(() => ({
    width: 300,
    marginBottom: '16px',
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

const filter = createFilterOptions()

const AutocompleteCombo = () => {
    const theme = useTheme()

    const [source, setSource] = React.useState([])
    const [value, setValue] = React.useState(null)
    const [state, setState] = React.useState({
        isSubmitted: false,
    })
    const [responseData, setResponseData] = React.useState({
        name: '',
        value: '',
    })
    const [labelsX, setLabelsX] = React.useState([])

    const handleChange = (event, newValue) => {
        if (newValue && newValue.inputValue) {
            setValue({
                label: newValue.inputValue,
            })
            return
        }

        setValue(newValue)
        calculateValuesAxisX(newValue.value)

        setSource( labelsX)
        console.log('source: ' + source)
        console.log('labels X: ' + labelsX)

        const swUrl = `https://metrics-351617.rj.r.appspot.com/metrics/`
        fetch(swUrl)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setResponseData(response)
                setState({isSubmitted: true})

            })
            .catch((error) => {
                console.log(
                    'error: ' + error
                )
            })
    }

    const filterOptions = (options, params) => {
        const filtered = filter(options, params)
        if (params.inputValue !== '') {
            filtered.push({
                inputValue: params.inputValue,
                label: `Add "${params.inputValue}"`,
            })
        }
        return filtered
    }


    const calculateValuesAxisX = (paramTime) => {

        const current = new Date();
        const myPastDate = new Date(current);
        const labels = [];

        // 5 minutes
        if (paramTime == 0) {
            myPastDate.setMinutes(myPastDate.getMinutes() - 5)
            const initialDate = myPastDate;

            for (var i = 0; i <= 5; i++) {
                var hour = initialDate.toLocaleString('en-US', { hour: '2-digit' })
                var minute = initialDate.toLocaleString('en-US', { minute: '2-digit' })
                labelsX[i] = `${hour}:${minute}`
                initialDate.setMinutes(initialDate.getMinutes() + 1)
            }
        }

        // 15 minutes
        if (paramTime == 1) {
            myPastDate.setMinutes(myPastDate.getMinutes() - 15)
            const initialDate = myPastDate;

            for (var i = 0; i <= 5; i++) {
                var hour = initialDate.toLocaleString('en-US', { hour: '2-digit' })
                var minute = initialDate.toLocaleString('en-US', { minute: '2-digit' })
                labelsX[i] = `${hour}:${minute}`
                initialDate.setMinutes(initialDate.getMinutes() + 3)
            }
        }

        // 30 minutes
        if (paramTime == 2) {
            myPastDate.setMinutes(myPastDate.getMinutes() - 30)
            const initialDate = myPastDate;

            for (var i = 0; i <= 5; i++) {
                var hour = initialDate.toLocaleString('en-US', { hour: '2-digit' })
                var minute = initialDate.toLocaleString('en-US', { minute: '2-digit' })
                labelsX[i] = `${hour}:${minute}`
                initialDate.setMinutes(initialDate.getMinutes() + 6)
            }
        }

        // 1 hour
        if (paramTime == 3) {
            myPastDate.setHours(myPastDate.getHours() - 1)
            const initialDate = myPastDate;

            for (var i = 0; i <= 5; i++) {
                labelsX[i] = initialDate.toLocaleTimeString('en-GB', {hour: '2-digit', minute:'2-digit'});
                initialDate.setMinutes(initialDate.getMinutes() + 12)
            }
        }

        // 4 hour
        if (paramTime == 4) {
            myPastDate.setHours(myPastDate.getHours() - 4)
            const initialDate = myPastDate;

            for (var i = 0; i <= 5; i++) {
                labelsX[i] = initialDate.toLocaleTimeString('en-GB', {hour: '2-digit', minute:'2-digit'});
                initialDate.setMinutes(initialDate.getMinutes() + 48)
            }
        }

        // 10 hour
        if (paramTime == 5) {
            myPastDate.setHours(myPastDate.getHours() - 10)
            const initialDate = myPastDate;

            for (var i = 0; i <= 5; i++) {
                labelsX[i] = initialDate.toLocaleTimeString('en-GB', {hour: '2-digit', minute:'2-digit'});
                initialDate.setMinutes(initialDate.getMinutes() + 120)
            }
        }

        // 1 day
        if (paramTime == 6) {
            myPastDate.setDate(myPastDate.getDate() - 1)
            const initialDate = myPastDate;

            for (var i = 0; i <= 8; i++) {
                labelsX[i] = initialDate.toLocaleTimeString('en-GB', { weekday: "short", hour: '2-digit', minute:'2-digit'});
                initialDate.setHours(initialDate.getHours() + 3)
            }
        }

        // 2 day
        if (paramTime == 7) {
            myPastDate.setDate(myPastDate.getDate() - 2)
            const initialDate = myPastDate;

            for (var i = 0; i <= 8; i++) {
                labelsX[i] = initialDate.toLocaleTimeString('en-GB', { weekday: "short", hour: '2-digit', minute:'2-digit'});
                initialDate.setHours(initialDate.getHours() + 6)
            }
        }

        // 7 day
        if (paramTime == 8) {
            myPastDate.setDate(myPastDate.getDate() - 7)
            const initialDate = myPastDate;

            for (var i = 0; i <= 8; i++) {
                labelsX[i] = initialDate.toLocaleTimeString('en-GB', { weekday: "short", hour: '2-digit', minute:'2-digit'});
                initialDate.setHours(initialDate.getHours() + 21)
            }
        }

        // 1 month
        if (paramTime == 9) {
            myPastDate.setMonth(myPastDate.getMonth() - 1)
            const initialDate = myPastDate;

            for (var i = 0; i <= 4; i++) {
                var month = initialDate.toLocaleString('en-GB', { month: "short" })
                labelsX[i] = `${initialDate.getDate()} ${month}`
                initialDate.setHours(initialDate.getHours() + 180)
            }
        }

        // 3 month
        if (paramTime == 10) {
            myPastDate.setMonth(myPastDate.getMonth() - 3)
            const initialDate = myPastDate;

            for (var i = 0; i <= 6; i++) {
                var month = initialDate.toLocaleString('en-GB', { month: "short" })
                labelsX[i] = `${initialDate.getDate()} ${month}`
                initialDate.setDate(initialDate.getDate() + 15)
            }
        }

        // 1 year
        if (paramTime == 11) {
            myPastDate.setFullYear(myPastDate.getFullYear() - 1)
            const initialDate = myPastDate;

            for (var i = 0; i <= 12; i++) {
                var month = initialDate.toLocaleString('en-GB', { month: "short" })
                labelsX[i] = `${initialDate.getFullYear()}/${month}`
                initialDate.setMonth(initialDate.getMonth() + 1)
            }
        }

        setLabelsX(labels)
    }

    return (
        <Fragment>
            <AutoComplete
                options={suggestions}
                getOptionLabel={(option) => option.label}
                onChange={handleChange}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Select time"
                        variant="outlined"
                        fullWidth
                    />
                )}
            />
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

            {
                <Result
                    name={responseData.name}
                    value={responseData.value}
                />
            }
        </Fragment>
    )
}

export default AutocompleteCombo
