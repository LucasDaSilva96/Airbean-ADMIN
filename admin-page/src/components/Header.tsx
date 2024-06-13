import { Link, useNavigate } from 'react-router-dom';
import { ModeToggle } from './Mode-toggle';
import coffee from '/svg/coffee-svg.svg';
import { useUser } from './UserProvider';
import { Button } from './ui/button';
import { getSessionUser } from '@/utils/getSessionUser';
import { logout } from '@/utils/api';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from 'lucide-react';

export default function Header() {
  const user = getSessionUser();
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      navigate('/', { replace: true });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <header className='w-screen py-2 px-2 flex items-center justify-between z-50 '>
      <Link to='/' className='flex items-center gap-1'>
        <img src={coffee} alt='coffee logo' className='w-[24px]' />
        <span className='italic font-base pl-[1px] text-white xl:text-inherit'>
          AirBean AB
        </span>
      </Link>
      {user ? (
        <div className='flex items-center gap-4'>
          <Avatar>
            <AvatarImage src={user.image} className='size-12' />
            <AvatarFallback>{<User />}</AvatarFallback>
          </Avatar>
          <span className='italic font-extralight'>{user.name}</span>
          <Button onClick={handleLogout}>Log out</Button>
          <ModeToggle />
        </div>
      ) : (
        <ModeToggle />
      )}
    </header>
  );
}
