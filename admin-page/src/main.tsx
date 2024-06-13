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

const queryClient = new QueryClient();

queryClient.setDefaultOptions({
  queries: {
    staleTime: Infinity,
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorElement />,
    loader: async () => {
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
      {
        path: 'resetPassword',
        element: <ResetPasswordEmail />,
      },
      {
        path: 'updatePassword',
        element: <PasswordReset />,
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
        staleTime: Infinity,
        gcTime: Infinity,
      });
      // Offers
      await queryClient.prefetchQuery({
        queryKey: ['offers'],
        queryFn: fetchOffers,
        staleTime: Infinity,
        gcTime: Infinity,
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
      {
        path: 'addMenuItem',
        element: <AddMenuItem />,
        action: async ({ request }) => {
          const req = await createMenuItem(request);
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
        element: <CreateOffer />,
      },
      {
        path: 'menuEdit/:id',
        element: <EditMenu />,
        action: async ({ request }) => {
          const req = await patchMenuItem(request);
          if (req.status === 'success') {
            await queryClient.invalidateQueries({
              queryKey: ['menu'],
            });
            return redirect('/dashboard');
          }
          return null;
        },
      },
      {
        path: 'offerEdit/:id',
        element: <EditOffer />,
        action: async ({ request }) => {
          const req = await patchMenuItem(request);
          if (req.status === 'success') {
            await queryClient.invalidateQueries({
              queryKey: ['menu'],
            });
            return redirect('/dashboard');
          }
          return null;
        },
      },
      {
        path: 'user',
        element: <UserDashboard />,
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
