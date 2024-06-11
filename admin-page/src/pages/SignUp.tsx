import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { signUp } from '@/utils/api';
import Loader from '@/components/Loader';

export interface USER {
  name: string | null;
  email: string | null;
  password: string | null;
  password_confirm: string | null;
  role: string;
  image: File | undefined;
}

export default function SignUp() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
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

  const handleImageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = event.target;
      if (files) {
        setFile(files[0]);
        setUser({ ...user, image: files[0] });
      }
    },
    []
  );

  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const password_confirm = useRef<HTMLInputElement>(null);

  const avatarSrc = useMemo(() => {
    return file
      ? URL.createObjectURL(file)
      : 'https://res.cloudinary.com/dqx1ejydp/image/upload/v1717962639/Airbean/r8fynw2bstf3ymrkr1uq.jpg';
  }, [file]);

  const handleFormValidate = useCallback(() => {
    if (
      user.name &&
      user.email &&
      user.password &&
      user.password_confirm &&
      user.password === user.password_confirm
    ) {
      return true;
    } else if (user.password !== user.password_confirm) {
      toast({
        variant: 'destructive',
        title: 'Password (min 6 characters) validation',
        description:
          'Please make sure the password and password confirm are equal',
      });

      return false;
    } else {
      toast({
        variant: 'destructive',
        title: 'Form validation',
        description: 'Please enter name, email, password and password confirm',
      });
      return false;
    }
  }, [user, toast]);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      if (handleFormValidate()) {
        await signUp(user);
        toast({
          title: 'New user successfully created',
          description: 'You can now log in with the created user',
        });
        setTimeout(() => {
          navigate('/');
        }, 500);
      }
    } catch (e) {
      console.error(e);
      toast({
        variant: 'destructive',
        title: 'Fail',
        description:
          'Fail to create user. Check your credentials and try again.',
      });
    } finally {
      setIsLoading(false);
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

  const handleRoleChange = (e: string) => {
    setUser({ ...user, role: e });
  };

  return (
    <section className='w-screen h-screen overflow-hidden flex justify-center z-30'>
      <Card className='w-[375px] max-h-[625px] overflow-y-auto shadow-sm'>
        <CardHeader className='text-center'>
          <CardTitle>Sign up</CardTitle>
        </CardHeader>
        <CardContent>
          <form className='flex flex-col gap-2'>
            <div className='w-full flex justify-center'>
              <Avatar className='size-20'>
                <AvatarImage src={avatarSrc} />
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
                autoComplete='off'
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
                autoComplete='off'
                type='email'
                id='email'
                placeholder='Email*'
                required
              />
            </div>

            <div className='flex flex-col gap-1'>
              <Label htmlFor='password'>
                Password | Min length 6 characters
              </Label>
              <Input
                value={user.password ? user.password : ''}
                onInput={handlePasswordChange}
                type='text'
                id='password'
                placeholder='Password*'
                required
                autoComplete='off'
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
                autoComplete='off'
                ref={password_confirm}
              />
            </div>
            <div className='flex flex-col gap-1'>
              <p className='font-medium text-[0.875rem]'>Select your access</p>
              <Select
                name='role'
                value={user.role}
                onValueChange={handleRoleChange}
              >
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder='Select your role' />
                </SelectTrigger>
                <SelectContent id='role'>
                  <SelectGroup>
                    <SelectLabel>Roles</SelectLabel>
                    <SelectItem value='user'>User</SelectItem>
                    <SelectItem value='admin'>Admin</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </form>
        </CardContent>
        <CardFooter className='flex justify-between'>
          <Button variant='outline' onClick={() => navigate('/')}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Sign up</Button>
        </CardFooter>
      </Card>
      {isLoading && <Loader />}
    </section>
  );
}
