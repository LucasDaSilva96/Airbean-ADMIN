import DashboardSideNav from '@/components/Dashboard';
import Header from '@/components/Header';
import Loader from '@/components/Loader';
import { getSessionUser } from '@/utils/getSessionUser';
import { useIsFetching, useQueryClient } from '@tanstack/react-query';
import { Outlet, redirect, useNavigation } from 'react-router-dom';

export default function Layout() {
  const user = getSessionUser();
  const { state } = useNavigation();
  const isFetching = useIsFetching();
  const queryClient = useQueryClient();

  if (!user) {
    redirect('/login');
  }

  if (state === 'loading' || state === 'submitting' || isFetching) {
    return <Loader />;
  }

  return (
    <main className='w-screen h-screen flex flex-col gap-2 relative'>
      <Header />
      <div className='w-full h-full py-2 px-2 flex gap-2 flex-col md:flex-row'>
        <aside className='basis-80 max-h-[80dvh] overflow-y-auto'>
          <DashboardSideNav />
        </aside>
        <article className='basis-[100%] max-w-[1000px] max-h-[80dvh] overflow-y-auto'>
          <Outlet />
        </article>
      </div>
      {queryClient.isFetching() > 0 && <Loader />}
    </main>
  );
}
