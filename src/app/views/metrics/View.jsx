import React, {lazy} from 'react'
import CalculateMetricView from './CalculateMetricView'
import {Box, styled} from '@mui/system'
import { Chart } from "react-google-charts";

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

const View = () => {

    return (
        <Container>
            <div>
               <CalculateMetricView/>
            </div>
        </Container>
    )
}

export default View
