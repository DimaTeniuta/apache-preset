import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { Layout } from '@/components/Layout/Layout';

const EmbeddedDashboardPage = lazy(
  () => import('../pages/EmbeddedDashboardPage/EmbeddedDashboardPage')
);
const APIDashboardPage = lazy(() => import('../pages/APIDashboardPage/APIDashboardPage'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <EmbeddedDashboardPage />
      },
      {
        path: '/api-dashboard',
        element: <APIDashboardPage />
      }
    ]
  }
]);
