import {Button, Grid, Icon,} from '@mui/material'
import {styled} from '@mui/system'
import {Span} from 'app/components/Typography'
import React, {useEffect, useState} from 'react'
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import {DatePicker} from '@mui/lab'
import Result from './Result'

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const MetricForm = () => {
    const [state, setState] = useState({
        date: new Date(),
    })

    useEffect(() => {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            console.log(value)

            if (value !== state.password) {
                return false
            }
            return true
        })
        return () => ValidatorForm.removeValidationRule('isPasswordMatch')
    }, [state.password])

    const handleSubmit = (event) => {

    }

    const handleChange = (event) => {
        event.persist()
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }

    const handleDateChange = (date) => {
        console.log('date' + date)
        setState({...state, date})
    }

    const {
        name,
        value,
        date,
    } = state

    return (
        <div>
            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                <Grid container spacing={6}>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{mt: 2}}>
                        <TextField
                            label="Metric Name"
                            onChange={handleChange}
                            type="text"
                            name="name"
                            value={name || ''}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            label="Metric Value"
                            onChange={handleChange}
                            type="text"
                            name="value"
                            value={value || ''}
                            validators={['required']}
                            errorMessages={[
                                'this field is required'
                            ]}
                        />

                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                value={date}
                                onChange={handleDateChange}
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
                    </Grid>

                </Grid>

                <Button color="primary" variant="contained" type="submit" onSubmit={handleSubmit}>
                    <Icon>send</Icon>
                    <Span sx={{pl: 1, textTransform: 'capitalize'}}>
                        Send
                    </Span>
                </Button>
                <div>
                  {state.date.toLocaleString()}
                </div>
            </ValidatorForm>

        </div>
    )
}

export default MetricForm
