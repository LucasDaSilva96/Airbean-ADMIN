import { useNavigate, useRouteError } from 'react-router-dom';
import { Button } from './ui/button';

export default function ErrorElement() {
  const error = useRouteError();
  const navigate = useNavigate();

  console.error(error);
  return (
    <section className='w-screen h-screen flex items-center justify-center'>
      <article className='w-[375px] py-2 px-2 rounded-md border shadow-md flex flex-col items-center gap-4'>
        <h1>Ops! Something went wrong. Please try again or contact support</h1>
        <Button onClick={() => navigate('/')}>Back</Button>
      </article>
    </section>
  );
}
