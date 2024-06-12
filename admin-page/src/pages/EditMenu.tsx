import { useQueryClient } from '@tanstack/react-query';
import { MenuItem } from './Menu';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form } from 'react-router-dom';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import LazyImage from '@/components/LazyImage';

export default function EditMenu() {
  const queryClient = useQueryClient();
  const menu: MenuItem[] = queryClient.getQueryData(['menu'])!;
  const { id } = useParams();

  const item = menu.find((el) => el._id === id);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{item && <span>{item.title}</span>}</CardTitle>
        <CardDescription>Edit item</CardDescription>
      </CardHeader>
      <CardContent>
        {item ? (
          <Form
            encType='multipart/form-data'
            action={`/dashboard/menuEdit/${item._id}`}
            method='post'
            className='flex flex-wrap gap-2'
          >
            <div className='flex flex-col gap-2 max-w-[375px]'>
              <Label htmlFor='title'>Title</Label>
              <Input
                type='text'
                defaultValue={item.title}
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
                defaultValue={item.desc}
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
                defaultValue={item.price}
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

            <LazyImage
              image={{ alt: item.title, src: item.image }}
              width={'70%'}
              border_Radius={10}
            />

            <Input
              type='text'
              defaultValue={item._id}
              name='id'
              id='id'
              className='invisible'
            />
            <Button type='submit' className='w-full'>
              Save
            </Button>
          </Form>
        ) : (
          <h2>Couldn't find the selected menu item. Please try again</h2>
        )}
      </CardContent>
    </Card>
  );
}
