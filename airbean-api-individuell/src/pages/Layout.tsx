import DashboardSideNav from '@/components/Dashboard';
import Header from '@/components/Header';
import { getSessionUser } from '@/utils/getSessionUser';
import { Outlet, redirect } from 'react-router-dom';

export default function Layout() {
  const user = getSessionUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <main className='w-screen h-screen flex flex-col gap-2 relative'>
      <Header />
      <div className='w-full h-full py-2 px-2 flex gap-2'>
        <aside className='basis-96'>
          <DashboardSideNav />
        </aside>
        <article className='basis-[100%]'>
          <Outlet />
        </article>
      </div>
    </main>
  );
}
