import React, {lazy} from 'react'
import AutoCompleteCombo from './AutocompleteCombo'
import {SimpleCard} from 'app/components'
import {Box, styled} from '@mui/system'
import {Button, Icon} from "@mui/material";
import {Span} from "../../components/Typography";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import Loadable from "../../components/Loadable/Loadable";
import MetricForm from "./MetricForm";

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

const Load = () => {
    return (
        <Container>
            <div>
               <MetricForm/>
            </div>
        </Container>
    )
}

export default Load
