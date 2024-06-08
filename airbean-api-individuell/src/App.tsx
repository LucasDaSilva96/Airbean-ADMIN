import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { ThemeProvider } from './components/ThemeProvider';

import { UserProvider } from './components/UserProvider';
import { getSessionUser } from './utils/getSessionUser';

function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <UserProvider defaultUser={getSessionUser()}>
        <main className='w-screen h-screen relative overflow-hidden'>
          <Header />
          <Outlet />
        </main>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
