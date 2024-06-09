import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { ThemeProvider } from './components/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';

import { UserProvider } from './components/UserProvider';
import { getSessionUser } from './utils/getSessionUser';

function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <UserProvider defaultUser={getSessionUser()}>
        <main className='w-screen h-screen relative overflow-hidden flex flex-col'>
          <Header />
          <Outlet />
          <Toaster />
        </main>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
