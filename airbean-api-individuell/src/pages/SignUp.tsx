import React, { useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';

interface USER {
  name: string | null;
  email: string | null;
  password: string | null;
  password_confirm: string | null;
  role: 'user' | 'admin';
  image: File | undefined;
}

export default function SignUp() {
  const { toast } = useToast();
  const [user, setUser] = useState<USER>({
    name: '',
    email: '',
    password: '',
    password_confirm: '',
    role: 'user',
    image: undefined,
  });
  const [file, setFile] = useState<File>();
  const navigate = useNavigate();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    setFile(files?.[0]);
    setUser({ ...user, image: file });
  };

  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const password_confirm = useRef<HTMLInputElement>(null);

  const handleFormValidate = () => {
    let validated = true;
    if (
      name.current &&
      email.current &&
      password.current &&
      password_confirm.current
    ) {
      for (const [key, value] of Object.entries(user)) {
        const arr = [name, email, password, password_confirm];
        const fieldNames = ['name', 'email', 'password', 'password_confirm'];
        const index = fieldNames.findIndex((fieldName) => fieldName === key);
        if (!value) {
          if (index !== -1) {
            if (arr[index].current) {
              arr[index].current.style.borderColor = 'red';
            }
            validated = false;
          }
          toast({
            variant: 'destructive',
            title: 'Form validation',
            description: 'Enter name. email, password & confirm oassword',
          });
        } else {
          if (index >= 0 && arr[index].current) {
            arr[index].current.style.borderColor = 'green';
          }
        }
      }

      if (user.password !== user.password_confirm) {
        password.current.style.borderColor = 'red';
        password_confirm.current.style.borderColor = 'red';
        toast({
          variant: 'destructive',
          title: 'Password validation',
          description: 'Passwords are not the same. Try again',
        });
        validated = false;
      }

      return validated;
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, name: e.target.value });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, email: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, password: e.target.value });
  };

  const handlePasswordConfirmChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUser({ ...user, password_confirm: e.target.value });
  };

  return (
    <section className='w-screen h-screen overflow-hidden flex items-center justify-center'>
      <Card className='w-[375px]'>
        <CardHeader className='text-center'>
          <CardTitle>Sign up</CardTitle>
          <CardDescription>Manage Airbean</CardDescription>
        </CardHeader>
        <CardContent>
          <form className='flex flex-col gap-2'>
            <div className='w-full flex justify-center'>
              <Avatar className='w-16 h-16'>
                <AvatarImage
                  src={file ? URL.createObjectURL(file) : '/img/default.jpg'}
                />
                <AvatarFallback>User</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <Label htmlFor='image' className='cursor-pointer'>
                Choose image
              </Label>
              <Input
                accept='image/png, image/jpeg'
                id='image'
                type='file'
                className='cursor-pointer'
                onChange={handleImageChange}
              />
            </div>
            <div className='flex flex-col gap-1'>
              <Label htmlFor='name'>Name</Label>
              <Input
                value={user.name ? user.name : ''}
                onInput={handleNameChange}
                autoComplete='false'
                ref={name}
                type='text'
                id='name'
                placeholder='Name*'
                required
              />
            </div>
            <div className='flex flex-col gap-1'>
              <Label htmlFor='email'>Email</Label>
              <Input
                value={user.email ? user.email : ''}
                onInput={handleEmailChange}
                ref={email}
                autoComplete='false'
                type='email'
                id='email'
                placeholder='Email*'
                required
              />
            </div>

            <div className='flex flex-col gap-1'>
              <Label htmlFor='password'>Password</Label>
              <Input
                value={user.password ? user.password : ''}
                onInput={handlePasswordChange}
                type='text'
                id='password'
                placeholder='Password*'
                required
                autoComplete='false'
                ref={password}
              />
            </div>

            <div className='flex flex-col gap-1'>
              <Label htmlFor='password_confirm'>Confirm Password</Label>
              <Input
                value={user.password_confirm ? user.password_confirm : ''}
                onInput={handlePasswordConfirmChange}
                type='text'
                id='password_confirm'
                placeholder='Confirm password*'
                required
                autoComplete='false'
                ref={password_confirm}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className='flex justify-between'>
          <Button variant='outline' onClick={() => navigate('/')}>
            Cancel
          </Button>
          <Button onClick={handleFormValidate}>Sign up</Button>
        </CardFooter>
      </Card>
    </section>
  );
}
