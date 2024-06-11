import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import VideoPlayer from './components/VideoPlayer';

function App() {
  return (
    <main className='w-screen h-screen overflow-hidden flex flex-col'>
      <Header />
      <Outlet />
      <VideoPlayer />
      <div
        className='fixed w-screen h-screen z-[-1] block md:hidden'
        id='welcome-bg'
      ></div>
    </main>
  );
}

export default App;
