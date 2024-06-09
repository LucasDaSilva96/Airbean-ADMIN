import VideoPlayer from '@/components/VideoPlayer';
import { Link } from 'react-router-dom';

export default function Welcome() {
  return (
    <>
      <section className='w-full h-full flex justify-center overflow-hidden'>
        <div className='flex items-center gap-8 z-10 self-start mt-[20%] '>
          <Link
            to='login'
            className='backdrop-blur-lg py-2 px-4 w-[130px] text-center text-white md:text-lg border border-white rounded-md transition-all hover:shadow-md hover:scale-110 will-change-transform'
          >
            Login
          </Link>
          <Link
            to='signUp'
            className='backdrop-blur-lg py-2 px-4 w-[130px] text-center text-white md:text-lg border border-white rounded-md transition-all hover:shadow-md hover:scale-110 will-change-transform'
          >
            Sign Up
          </Link>
        </div>
      </section>
      <VideoPlayer />
    </>
  );
}
