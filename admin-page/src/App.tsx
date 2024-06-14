import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import VideoPlayer from './components/VideoPlayer';
// Main App component
function App() {
  // Container for the entire app, taking full screen size with flex layout
  return (
    <main className='w-screen h-screen overflow-hidden flex flex-col'>
      <Header />
      <Outlet />
      <VideoPlayer />
      <div
        className='fixed w-screen h-screen z-[-1] block xl:hidden'
        id='welcome-bg'
      ></div>
    </main>
  );
}

export default App;
