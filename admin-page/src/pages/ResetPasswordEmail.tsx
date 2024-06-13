import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { get_reset_token } from '@/utils/api';
import { useState } from 'react';
import Loader from '@/components/Loader';

export default function ResetPassword() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();
    const req = await get_reset_token(event);
    if (req.status === 'success' && req.email) {
      setIsLoading(false);
      return navigate(`/updatePassword`, { state: { email: req.email } });
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
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                name='email'
                type='email'
                autoComplete='true'
                required
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
