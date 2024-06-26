import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form, Link, useNavigate, useNavigation } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Loader from '@/components/Loader';

const DEMO_USER = import.meta.env.VITE_DEMO_USER;
const DEMO_USER_PASSWORD = import.meta.env.VITE_DEMO_USER_PASSWORD;

export default function Login() {
  const navigate = useNavigate();
  const { state } = useNavigation();
  const [demoUser, setDemoUser] = useState(false);

  console.log(state);

  const handleDemoUser = () => {
    setDemoUser(true);
  };

  return (
    <section className='w-screen h-screen flex items-center justify-center z-30'>
      <Card className='w-[350px] min-h-[420px] flex flex-col gap-2 shadow-md'>
        <CardHeader>
          <CardTitle className='text-center'>Log in</CardTitle>
          <CardDescription className='text-center'>
            Log in to handle Airbean products
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form action={'/login'} method='post' className='flex flex-col gap-2'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                name='email'
                type='email'
                autoComplete='true'
                required
                defaultValue={demoUser ? DEMO_USER : ''}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                type='password'
                name='password'
                autoComplete='true'
                required
                defaultValue={demoUser ? DEMO_USER_PASSWORD : ''}
                minLength={5}
              />
            </div>

            <div className='py-2 flex w-full items-center justify-between'>
              <Button
                variant={'outline'}
                type='button'
                onClick={() => navigate('/')}
              >
                Cancel
              </Button>

              <Button
                variant={'secondary'}
                type='button'
                onClick={handleDemoUser}
              >
                Demo user
              </Button>

              <Button type='submit'>Log in</Button>
            </div>
          </Form>
        </CardContent>
        <CardFooter className='mt-auto'>
          <Link
            to='/resetPassword'
            className='italic font-extralight will-change-transform transition-all hover:scale-105 hover:underline'
          >
            Forgot password?
          </Link>
        </CardFooter>
      </Card>
      {state !== 'idle' && <Loader />}
    </section>
  );
}
