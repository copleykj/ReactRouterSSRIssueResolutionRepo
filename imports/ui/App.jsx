import React from 'react';
import { renderWithSSR } from 'meteor/communitypackages:react-router-ssr';
import { LandingPage } from './pages/Landing.jsx';

const AppRoutes = [
    { path: "/", element: <LandingPage /> },
]

renderWithSSR(AppRoutes);
