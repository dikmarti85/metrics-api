import React from 'react'
import {styled} from '@mui/system'
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
