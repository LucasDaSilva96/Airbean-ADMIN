import { useUser } from '@/components/UserProvider';
import { Link, useNavigate } from 'react-router-dom';

export default function Welcome() {
  const navigate = useNavigate();

  const { user } = useUser();

  if (user) {
    navigate('/dashboard');
  }

  return (
    <section className='w-full h-full flex justify-center overflow-hidden'>
      <div className='flex items-center gap-8 z-10 '>
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
  );
}
