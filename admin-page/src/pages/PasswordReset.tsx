import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form, useLocation, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import { useState } from 'react';
import Loader from '@/components/Loader';
import { reset_password_post } from '@/utils/api';

export default function PasswordReset() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useLocation();
  const email = state.email;

  if (!email) {
    return (
      <section className='w-screen h-screen flex items-center justify-center z-30'>
        <Card className='w-[350px] min-h-[250px] flex flex-col gap-2 shadow-md'>
          <CardContent>
            <h2>Failed to fetch user email.</h2>
            <Button onClick={() => navigate('/')}>Back</Button>
          </CardContent>
        </Card>
      </section>
    );
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();
    const req = await reset_password_post(event);
    if (req.status === 'success') {
      setIsLoading(false);
      return navigate('/');
    }
    setIsLoading(false);
  };

  return (
    <section className='w-screen h-screen flex items-center justify-center z-30'>
      <Card className='w-[350px] min-h-[250px] flex flex-col gap-2 shadow-md'>
        <CardHeader>
          <CardTitle className='text-center'>Email</CardTitle>
          <CardDescription className='text-center'>
            Provide your email here
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form className='flex flex-col gap-2' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                name='password'
                type='password'
                autoComplete='false'
                required
                minLength={5}
              />
            </div>

            <div className='flex flex-col gap-2'>
              <Label htmlFor='password_confirm'>Confirm password</Label>
              <Input
                id='password_confirm'
                name='password_confirm'
                type='password'
                autoComplete='false'
                required
                minLength={5}
              />
            </div>

            <div className='flex flex-col gap-2'>
              <Input
                id='email'
                name='email'
                type='text'
                autoComplete='false'
                required
                defaultValue={email}
                className='invisible'
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
              <Button type='submit'>Submit</Button>
            </div>
          </Form>
        </CardContent>
      </Card>
      {isLoading && <Loader />}
    </section>
  );
}
