import React, { useState } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useUser } from '@/components/UserProvider';
import { Button } from '@/components/ui/button';
import { Form } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import LazyImage from '@/components/LazyImage';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { updateUser } from '@/utils/api';
import Loader from '@/components/Loader';
import { getSessionUser } from '@/utils/getSessionUser';

export default function UserDashboard() {
  const { setUser } = useUser();
  const user = getSessionUser();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState('');

  if (!user) {
    return (
      <Card>
        <CardContent>
          <h2 className='text-center'>
            Failed to get user information. Please try again or contact support
          </h2>
        </CardContent>
      </Card>
    );
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target;

    if (!input.files?.length) {
      return;
    }

    setFile(URL.createObjectURL(input.files[0]));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const res = await updateUser(event);
      if (res.status === 'success' && res.data) {
        setUser(res.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{user.name}</CardTitle>
          <CardDescription>Update user account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form className='grid grid-cols-2 gap-2' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-2 max-w-[375px]'>
                <Label htmlFor='name'>Name</Label>
                <Input
                  type='text'
                  id='name'
                  autoComplete='true'
                  placeholder='Name*'
                  name='name'
                  required
                  minLength={1}
                  defaultValue={user.name}
                />
              </div>

              <div className='flex flex-col gap-2 max-w-[375px]'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  type='email'
                  id='email'
                  placeholder='Email*'
                  name='email'
                  autoComplete='true'
                  required
                  minLength={1}
                  defaultValue={user.email}
                />
              </div>

              <div className='flex flex-col gap-1 max-w-[375px]'>
                <span className='text-sm font-medium'>Role</span>
                <Select defaultValue={user.role} name='role'>
                  <SelectTrigger>
                    <SelectValue placeholder='Select account access' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='admin'>Admin</SelectItem>
                    <SelectItem value='user'>user</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className='mt-[-80px]'>
              <LazyImage
                image={{ alt: user.name, src: file || user.image }}
                width={'70%'}
                border_Radius={10}
              />
              <div className='grid w-full max-w-sm items-center gap-1.5'>
                <Label htmlFor='picture'>Picture</Label>
                <Input
                  id='picture'
                  type='file'
                  name='image'
                  onChange={handleImageChange}
                />
              </div>
            </div>

            <Input
              type='text'
              id='id'
              name='id'
              required
              minLength={1}
              defaultValue={user._id}
              className='invisible'
            />

            <Button className='w-full col-span-2 mt-4' type='submit'>
              Save
            </Button>
          </Form>
        </CardContent>
      </Card>
      {isLoading && <Loader />}
    </>
  );
}
