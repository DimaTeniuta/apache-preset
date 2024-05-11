import { lazy } from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';

const HomePage = lazy(() => import('../pages/home/HomePage'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <HomePage />
      }
    ]
  }
]);
