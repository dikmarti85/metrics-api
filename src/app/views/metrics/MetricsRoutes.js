import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';
const View = Loadable(lazy(() => import("./View")));
const Load = Loadable(lazy(() => import("./Load")));

const metricsRoutes = [
    {
        path: '/metrics/view',
        element: <View />,
    },
    {
        path: '/metrics/load',
        element: <Load />,
    }
]

export default metricsRoutes
