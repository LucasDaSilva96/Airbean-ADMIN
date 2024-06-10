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
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Layout from './pages/Layout.tsx';
import ErrorElement from './components/ErrorElement.tsx';
import { fetchMenu, fetchOffers, login } from './utils/api.ts';
import { ThemeProvider } from './components/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import { UserProvider } from './components/UserProvider';
import { getSessionUser } from './utils/getSessionUser';
import Menu from './pages/Menu.tsx';
import Offers from './pages/Offers.tsx';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorElement />,
    loader: () => {
      const user = getSessionUser();
      if (user) {
        return redirect('/dashboard');
      }
      return null;
    },
    children: [
      {
        index: true,
        element: <Welcome />,
      },
      {
        path: 'login',
        element: <Login />,
        action: async ({ request }) => {
          const req = await login(request);

          if (req.status === 'success') {
            return redirect('/dashboard');
          }
          return null;
        },
      },
      {
        path: 'signUp',
        element: <SignUp />,
      },
    ],
  },
  {
    path: 'dashboard',
    loader: async () => {
      const user = getSessionUser();
      if (!user) {
        return redirect('/login');
      }
      // Menu
      await queryClient.prefetchQuery({
        queryKey: ['menu'],
        queryFn: fetchMenu,
      });
      // Offers
      await queryClient.prefetchQuery({
        queryKey: ['offers'],
        queryFn: fetchOffers,
      });
      return null;
    },
    errorElement: <ErrorElement />,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Menu />,
      },
      {
        path: 'offers',
        element: <Offers />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <UserProvider defaultUser={getSessionUser()}>
          <RouterProvider router={router} />
          <Toaster />
          <ReactQueryDevtools initialIsOpen={false} />
        </UserProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
