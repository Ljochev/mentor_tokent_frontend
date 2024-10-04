import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './routes/HomePage';
import AboutPage from './routes/AboutPage';
import ContactPage from './routes/ContactPage';
import LoginPage from './routes/LoginPage';
import RegisterPage from './routes/RegisterPage';
import Root from './routes/Root';
import Layout from './routes/Layout';
import MentorDashboard from './routes/dashboard/MentorDashboard.jsx';
import MentorStats from './routes/dashboard/MentorStats.jsx';
import MentorJobFeed from './routes/dashboard/MentorJobFeed.jsx';
import CompanyDashboard from './routes/dashboard/CompanyDashboard.jsx';
import CompanyMentors from './routes/dashboard/CompanyMentors.jsx';
import CompanyJobs from './routes/dashboard/CompanyJobs.jsx';
import ProtectedRoutes from './routes/ProtectedRoutes.jsx';
import PasswordReset from './routes/PasswordReset.jsx';
import './main.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Layout nav={true}  footer={true}><HomePage/></Layout>,
      },
      {
        path: '/about',
        element: <Layout nav={true}  footer={true}><AboutPage/></Layout>,
      },
      {
        path: '/contact',
        element: <Layout nav={true}  footer={true}><ContactPage/></Layout>,
      },
      {
        path: '/login',
        element: <Layout ><LoginPage/></Layout>,
      },
      {
        path: '/register',
        element: <Layout ><RegisterPage/></Layout>,
      },
      {
        path: '/passwordReset',
        element: <Layout ><PasswordReset/></Layout>,
      },
      {
        path: '/mentorDashboard',
        element: <ProtectedRoutes>
          <Layout sidebarLayout={true} type='mentor'><MentorDashboard/></Layout>
        </ProtectedRoutes>,
      },
      {
        path: '/mentorStats',
        element: <ProtectedRoutes>
          <Layout sidebarLayout={true} type='mentor'><MentorStats/></Layout>
        </ProtectedRoutes>,
      },
      {
        path: '/mentorJobFeed',
        element: <ProtectedRoutes>
          <Layout sidebarLayout={true} type='mentor'><MentorJobFeed/></Layout>
        </ProtectedRoutes>,
      },
      {
        path: '/companyDashboard',
        element: <ProtectedRoutes>
          <Layout sidebarLayout={true} type='company'><CompanyDashboard/></Layout>
        </ProtectedRoutes>,
      },
      {
        path: '/companyMentors',
        element: <ProtectedRoutes>
          <Layout sidebarLayout={true} type='company'><CompanyMentors/></Layout>
        </ProtectedRoutes>,
      },
      {
        path: '/companyJobs',
        element: <ProtectedRoutes>
          <Layout sidebarLayout={true} type='company'><CompanyJobs/></Layout>
        </ProtectedRoutes>,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
 