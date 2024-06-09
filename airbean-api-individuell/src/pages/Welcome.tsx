import VideoPlayer from '@/components/VideoPlayer';
import { Link } from 'react-router-dom';

export default function Welcome() {
  return (
    <section className='w-full h-full flex items-center justify-center overflow-hidden'>
      <div className='flex items-center gap-8 z-10 self-start mt-[15%] md:mt-0 md:self-center'>
        <Link
          to='login'
          className='backdrop-blur-lg py-2 px-4 md:py-4 md:px-8 md:w-[150px] text-center text-white md:text-lg border border-white rounded-md transition-all hover:shadow-md hover:scale-110 will-change-transform'
        >
          Login
        </Link>
        <Link
          to='signUp'
          className='backdrop-blur-lg py-2 px-4 md:py-4 md:px-8 md:w-[150px] text-center text-white md:text-lg border border-white rounded-md transition-all hover:shadow-md hover:scale-110 will-change-transform'
        >
          Sign Up
        </Link>
      </div>
      <VideoPlayer />
    </section>
  );
}
