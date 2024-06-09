import { Link } from 'react-router-dom';
import { ModeToggle } from './Mode-toggle';
import coffee from '/svg/coffee-svg.svg';

export default function Header() {
  return (
    <header className='w-screen py-2 px-2 flex items-center justify-between z-50 backdrop-blur-sm'>
      <Link to='/' className='flex items-center gap-1'>
        <img src={coffee} alt='coffe logo' className='w-[24px]' />
        <span className='italic font-base pl-[1px]'>AirBean AB</span>
      </Link>
      <ModeToggle />
    </header>
  );
}
