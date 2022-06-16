import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';
const View = Loadable(lazy(() => import("./View")));
const PaginationMetric = Loadable(lazy(() => import("./PaginationMetric")));

const metricsRoutes = [
    {
        path: '/metrics/view',
        element: <View />,
    },
    {
        path: '/metrics/paginationMetric',
        element: <PaginationMetric />,
    }
]

export default metricsRoutes
