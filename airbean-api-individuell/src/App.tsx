import { Outlet } from 'react-router-dom';
import Header from './components/Header';

function App() {
  return (
    <main className='w-screen h-screen relative overflow-hidden flex flex-col'>
      <Header />
      <Outlet />
    </main>
  );
}

export default App;
