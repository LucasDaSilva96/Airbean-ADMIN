import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Form, redirect, useParams } from 'react-router-dom';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Select from 'react-select';
import { useQueryClient } from '@tanstack/react-query';
import { MenuItem } from './Menu';
import { useMemo, useState } from 'react';
import { OfferSubmission, patchOffer } from '@/utils/api';
import { toast } from '@/components/ui/use-toast';
import { MenuItemOption } from './CreateOffer';
import {
  Select as SELECT,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function EditOffer() {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const offers: OfferSubmission[] = queryClient.getQueryData(['offers'])!;
  const menu: MenuItem[] = queryClient.getQueryData(['menu'])!;
  const [offerObj, setOfferObj] = useState(offers.find((el) => el._id === id));

  const defaultOptions = useMemo(() => {
    if (offerObj) {
      return offerObj.promotional_items.map((item) => {
        return { value: item._id, label: `${item.title} - ${item.price}$` };
      });
    }
  }, []);

  if (!offerObj) {
    return <h1 className='text-center'>Couldn't find the selected offer</h1>;
  }

  const options = menu.map((item) => {
    return { value: item._id, label: `${item.title} - ${item.price}$` };
  });

  const handleMenuItemChange = (option: readonly MenuItemOption[]) => {
    const resultArray: MenuItem[] = [];

    if (option.length > 0) {
      for (const menuItem of menu) {
        for (const optionItem of option) {
          if (menuItem._id === optionItem.value) {
            resultArray.push(menuItem);
          }
        }
      }
    }

    setOfferObj({ ...offerObj, promotional_items: resultArray });
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOfferObj({ ...offerObj, title: e.target.value });
  };

  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOfferObj({ ...offerObj, price: +e.target.value });
  };

  const handleStatus = (e: string) => {
    setOfferObj({
      ...offerObj,
      active: e === 'true' ? true : false,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      offerObj.title &&
      offerObj.price &&
      offerObj.promotional_items.length > 0
    ) {
      try {
        const res = await patchOffer(offerObj);

        await queryClient.invalidateQueries({
          queryKey: ['offers'],
          exact: true,
          refetchType: 'all',
        });

        if (res.status === 'success') {
          return redirect('/');
        }
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
        <CardDescription>Update offer here</CardDescription>
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
              defaultValue={offerObj.title}
              minLength={1}
              onInput={handleTitle}
            />
          </div>
          <div className='flex flex-col gap-2 max-w-[375px]'>
            <span className='font-medium text-sm'>Active Status</span>
            <SELECT
              onValueChange={handleStatus}
              name='active'
              value={offerObj.active === true ? 'true' : 'false'}
            >
              <SelectTrigger>
                <SelectValue placeholder='Select Status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='true'>Active</SelectItem>
                <SelectItem value='false'>Not active</SelectItem>
              </SelectContent>
            </SELECT>
          </div>

          <div className='flex flex-col gap-2 max-w-[375px]'>
            <Label htmlFor='price'>Price</Label>
            <Input
              type='number'
              id='price'
              placeholder='Price*'
              name='price'
              required
              defaultValue={offerObj.price}
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
            defaultValue={defaultOptions}
            classNamePrefix='select'
            onChange={handleMenuItemChange}
          />

          <Button type='submit'>Save</Button>
        </Form>
      </CardContent>
    </Card>
  );
}
