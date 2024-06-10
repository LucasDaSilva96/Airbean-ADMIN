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
      <div className='w-full h-full py-2 px-2 flex gap-2 flex-col md:flex-row'>
        <aside className='basis-80 max-h-[400px] overflow-y-auto'>
          <DashboardSideNav />
        </aside>
        <article className='basis-[100%] max-w-[1000px] max-h-[400px] overflow-y-auto'>
          <Outlet />
        </article>
      </div>
    </main>
  );
}
