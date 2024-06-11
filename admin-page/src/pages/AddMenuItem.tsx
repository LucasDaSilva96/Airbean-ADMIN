import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Form } from 'react-router-dom';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function AddMenuItem() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Menu</CardTitle>
        <CardDescription>Create a new menu Item here</CardDescription>
      </CardHeader>
      <CardContent>
        <Form
          encType='multipart/form-data'
          action='/dashboard/addMenuItem'
          method='post'
          className='flex flex-wrap gap-2'
        >
          <div className='flex flex-col gap-2 max-w-[375px]'>
            <Label htmlFor='title'>Title</Label>
            <Input
              type='text'
              id='title'
              placeholder='Title*'
              name='title'
              required
              minLength={1}
            />
          </div>

          <div className='flex flex-col gap-2 max-w-[375px] min-w-60'>
            <Label htmlFor='description'>Description</Label>
            <Textarea
              placeholder='Description*'
              id='description'
              name='description'
              required
              minLength={1}
            />
          </div>

          <div className='flex flex-col gap-2 max-w-[375px]'>
            <Label htmlFor='price'>Price</Label>
            <Input
              type='number'
              id='price'
              placeholder='Price*'
              name='price'
              required
              min={1}
            />
          </div>

          <div className='flex flex-col gap-2 max-w-[375px]'>
            <Label className='cursor-pointer' htmlFor='picture'>
              Picture
            </Label>
            <Input
              className='cursor-pointer'
              id='picture'
              type='file'
              accept='image/png, image/jpeg'
              name='image'
            />
          </div>
          <Button type='submit' className='w-full'>
            Create
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
}
