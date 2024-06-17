import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import Login from './pages/Login.tsx';
import SignUp from './pages/SignUp.tsx';
import Welcome from './pages/Welcome.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './pages/Layout.tsx';
import ErrorElement from './components/ErrorElement.tsx';
import {
  createMenuItem,
  fetchMenu,
  fetchOffers,
  login,
  patchMenuItem,
} from './utils/api.ts';
import { ThemeProvider } from './components/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import { UserProvider } from './components/UserProvider';
import { getSessionUser } from './utils/getSessionUser';
import Menu from './pages/Menu.tsx';
import Offers from './pages/Offers.tsx';
import AddMenuItem from './pages/AddMenuItem.tsx';
import CreateOffer from './pages/CreateOffer.tsx';
import EditMenu from './pages/EditMenu.tsx';
import EditOffer from './pages/EditOffer.tsx';
import UserDashboard from './pages/UserDashboard.tsx';
import ResetPasswordEmail from './pages/ResetPasswordEmail.tsx';
import PasswordReset from './pages/PasswordReset.tsx';

// Create a QueryClient instance for managing server state with react-query
const queryClient = new QueryClient();

// Set default options for react-query
queryClient.setDefaultOptions({
  queries: {
    staleTime: Infinity, // Queries will never be stale
  },
});

// Define routes for the application
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Root element of the application
    errorElement: <ErrorElement />, // Error boundary component
    loader: async () => {
      const user = getSessionUser(); // Get the current session user
      if (user) {
        return redirect('/dashboard'); // Redirect to dashboard if user is logged in
      }
      return null;
    },
    children: [
      {
        index: true,
        element: <Welcome />, // Welcome page
      },
      {
        path: 'login', // Login page
        element: <Login />,
        action: async ({ request }) => {
          const req = await login(request); // Handle login

          if (req.status === 'success') {
            return redirect('/dashboard'); // Redirect to dashboard on successful login
          }

          return null;
        },
      },
      {
        path: 'signUp',
        element: <SignUp />, // Sign up page
      },
      {
        path: 'resetPassword',
        element: <ResetPasswordEmail />, // Reset password email page
      },
      {
        path: 'updatePassword',
        element: <PasswordReset />, // Password reset page
      },
    ],
  },
  {
    path: '/dashboard',
    loader: async () => {
      const user = getSessionUser(); // Get the current session user
      if (!user) {
        return redirect('/login'); // Redirect to login if user is not authenticated
      }
      // Prefetch menu data
      await queryClient.prefetchQuery({
        queryKey: ['menu'],
        queryFn: fetchMenu,
        staleTime: Infinity,
        gcTime: Infinity,
      });
      // Prefetch offers data
      await queryClient.prefetchQuery({
        queryKey: ['offers'],
        queryFn: fetchOffers,
        staleTime: Infinity,
        gcTime: Infinity,
      });
      return null;
    },
    errorElement: <ErrorElement />, // Error boundary component
    element: <Layout />, // Layout component
    children: [
      {
        index: true,
        element: <Menu />, // Menu page
      },
      {
        path: 'offers',
        element: <Offers />, // Offers page
      },
      {
        path: 'addMenuItem',
        element: <AddMenuItem />, // Add menu item page
        action: async ({ request }) => {
          const req = await createMenuItem(request); // Handle add menu item
          if (req.status === 'success') {
            await queryClient.invalidateQueries({
              queryKey: ['menu'],
            });
          }
          return null;
        },
      },
      {
        path: 'createOffer',
        element: <CreateOffer />, // Create offer page
      },
      {
        path: 'menuEdit/:id', // Edit menu item page
        element: <EditMenu />,
        action: async ({ request }) => {
          const req = await patchMenuItem(request); // Handle edit menu item
          if (req.status === 'success') {
            await queryClient.invalidateQueries({
              queryKey: ['menu'],
            });
            return redirect('/dashboard'); // Redirect to dashboard on successful update
          }
          return null;
        },
      },
      {
        path: 'offerEdit/:id', // Edit offer page
        element: <EditOffer />,
        action: async ({ request }) => {
          const req = await patchMenuItem(request); // Handle edit offer
          if (req.status === 'success') {
            await queryClient.invalidateQueries({
              queryKey: ['menu'],
            });
            return redirect('/dashboard'); // Redirect to dashboard on successful update
          }
          return null;
        },
      },
      {
        path: 'user',
        element: <UserDashboard />, // User dashboard page
      },
    ],
  },
]);
// Render the root of the React application
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <UserProvider defaultUser={getSessionUser()}>
          <RouterProvider router={router} />
          <Toaster />
        </UserProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
