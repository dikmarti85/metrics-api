import {
    IconButton,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Icon,
    TablePagination,
} from '@mui/material'
import React, { useEffect, useState } from "react";
import { Box, styled } from '@mui/system'
import { SimpleCard } from 'app/components'
import FormDialogMetricValue from "./FormDialogMetricValue";
import FormDialogMetric from "./FormDialogMetric";

const Container = styled('div')(({ theme }) => ({
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

const StyledTable = styled(Table)(({ theme }) => ({
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
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [page, setPage] = React.useState(0)
    const initialValue = []
    const [status, setStatus] = React.useState(false)

    const [metrics, setMetrics] = React.useState([]);
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

    const getData = async () => {
        if(!status){
            const resp = await fetch("https://metrics-351617.rj.r.appspot.com/metrics/");
            const data = await resp.json();
            setMetrics(data.content);
            setStatus(true);
        }
    };

    useEffect(() => {
         getData();
    }, []);

    return (
        <Container>
            <Box py="12px" />
            <FormDialogMetric />
            <Box py="12px" />
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
                        sx={{ px: 2 }}
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
