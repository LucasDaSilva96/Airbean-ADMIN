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
import { Button } from '@/components/ui/button';
import Select from 'react-select';
import { useQueryClient } from '@tanstack/react-query';
import { MenuItem } from './Menu';
import { useState } from 'react';
import { createOffer, OfferSubmission } from '@/utils/api';
import { toast } from '@/components/ui/use-toast';

export type MenuItemOption = {
  value: string;
  label: string;
};

export default function CreateOffer() {
  const queryClient = useQueryClient();
  const menu: MenuItem[] = queryClient.getQueryData(['menu'])!;
  const [offerObj, setOfferObj] = useState<OfferSubmission>({
    title: '',
    price: '',
    promotional_items: [],
  });

  const options = menu.map((item) => {
    return { value: item._id, label: `${item.title} - ${item.price}$` };
  });

  const handleMenuItemChange = (option: readonly MenuItemOption[]) => {
    const resultArray: MenuItem[] = [];

    option.map((item) => {
      menu.map((el) => {
        if (el._id === item.value) {
          resultArray.push(el);
        }
      });
    });
    setOfferObj({ ...offerObj, promotional_items: resultArray });
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOfferObj({ ...offerObj, title: e.target.value });
  };

  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOfferObj({ ...offerObj, price: +e.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      offerObj.title &&
      offerObj.price &&
      offerObj.promotional_items.length > 0
    ) {
      try {
        await createOffer(offerObj);

        await queryClient.invalidateQueries({
          queryKey: ['offers'],
          exact: true,
          refetchType: 'all',
        });
      } catch (e) {
        toast({
          variant: 'destructive',
          title: 'Fail',
          description: 'Please provide a Title, price and items',
        });
      }
    } else {
      toast({
        variant: 'destructive',
        title: 'Fail',
        description: 'Please provide a Title, price and items',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Offer</CardTitle>
        <CardDescription>Create a offer here</CardDescription>
      </CardHeader>
      <CardContent>
        <Form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-2 max-w-[375px]'>
            <Label htmlFor='title'>Title</Label>
            <Input
              type='text'
              id='title'
              placeholder='Title*'
              name='title'
              required
              minLength={1}
              onInput={handleTitle}
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
              onInput={handlePrice}
            />
          </div>

          <Select
            isMulti
            name='items'
            placeholder='Select items from the menu'
            options={options}
            className='basic-multi-select'
            classNamePrefix='select'
            onChange={handleMenuItemChange}
          />

          <Button type='submit'>Create</Button>
        </Form>
      </CardContent>
    </Card>
  );
}
