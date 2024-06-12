import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { MenuItem } from '../pages/Menu';
import LazyImage from './LazyImage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteMenuItem, deleteOffer } from '@/utils/api';
import { useRef } from 'react';
import { Offer } from '@/pages/Offers';
import { Badge } from './ui/badge';

type DeleteProps = {
  item?: MenuItem;
  offer?: Offer;
};

export default function DeleteMenuItemOrOfferDrawer({
  item,
  offer,
}: DeleteProps) {
  const queryClient = useQueryClient();

  const buttonRef: React.LegacyRef<HTMLButtonElement> = useRef(null);

  const menuItemMutation = useMutation({
    mutationFn: deleteMenuItem,
    onMutate: async (id: string) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await deleteMenuItem(id);
      await queryClient.cancelQueries({ queryKey: ['menu'] });
      if (buttonRef.current) buttonRef.current.click();
      // Snapshot the previous value
      const previousMenu = queryClient.getQueryData(['menu']);

      // Optimistically update to the new value
      queryClient.setQueryData(['menu'], (old: MenuItem[]) =>
        old.filter((item) => item._id === id)
      );

      // Return a context object with the snapshotted value
      return { previousMenu };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (_err, _newMenu, context) => {
      if (context && context.previousMenu) {
        queryClient.setQueryData(['menu'], context.previousMenu);
      }
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['menu'] });
    },
  });

  const offerMutation = useMutation({
    mutationFn: deleteOffer,
    onMutate: async (id: string) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await deleteOffer(id);
      await queryClient.cancelQueries({ queryKey: ['offers'] });
      if (buttonRef.current) buttonRef.current.click();
      // Snapshot the previous value
      const previousOffers = queryClient.getQueryData(['offers']);

      // Optimistically update to the new value
      queryClient.setQueryData(['offers'], (old: Offer[]) =>
        old.filter((offer) => offer._id === id)
      );

      // Return a context object with the snapshotted value
      return { previousOffers };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (_err, _newMenu, context) => {
      if (context && context.previousOffers) {
        queryClient.setQueryData(['offers'], context.previousOffers);
      }
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['offers'] });
    },
  });

  if (item) {
    const MenuItemDelete = (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant='destructive'>Delete</Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className='mx-auto w-full max-w-md'>
            <DrawerHeader>
              <DrawerTitle>Delete {item.title}</DrawerTitle>
              <DrawerDescription>
                This action will delete the selected item forever
              </DrawerDescription>
            </DrawerHeader>
            <div className='grid grid-cols-2 gap-4'>
              <LazyImage
                image={{ alt: item.title, src: item.image }}
                width={'100%'}
                border_Radius={10}
              />

              <div className='flex flex-col antialiased font-light racking-wide leading-relaxed text-pretty'>
                <div className='max-w-full max-h-32 overflow-y-auto pb-2'>
                  <p>{item.desc}</p>
                </div>
                <p className='mt-auto font-medium italic'>{item.price}$</p>
              </div>
            </div>
            <DrawerFooter>
              <Button onClick={() => menuItemMutation.mutate(item._id)}>
                Delete
              </Button>
              <DrawerClose asChild>
                <Button ref={buttonRef} variant='outline'>
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    );

    return MenuItemDelete;
  }

  if (offer) {
    const OfferDelete = (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant='destructive'>Delete</Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className='mx-auto w-full max-w-md'>
            <DrawerHeader>
              <DrawerTitle className='flex items-center gap-2'>
                Delete {offer.title}{' '}
                <Badge variant={offer.active ? 'default' : 'destructive'}>
                  {offer.active === true ? 'Active' : 'Not active'}
                </Badge>
              </DrawerTitle>
              <DrawerDescription>
                This action will delete the selected offer forever
              </DrawerDescription>
            </DrawerHeader>
            <div className=''>
              <div className='max-w-full max-h-36 overflow-y-auto flex flex-col gap-2 pb-2'>
                {offer?.promotional_items.map((item) => {
                  return (
                    <article
                      key={item._id}
                      className='w-full grid grid-cols-3 gap-2 items-center'
                    >
                      <LazyImage
                        image={{ alt: item.title, src: item.image }}
                        border_Radius={10}
                        width={'100%'}
                      />
                      <span>{item.title}</span>
                      <span>{item.price}$</span>
                    </article>
                  );
                })}
              </div>
            </div>
            <DrawerFooter>
              <Button onClick={() => offerMutation.mutate(offer._id)}>
                Delete
              </Button>
              <DrawerClose asChild>
                <Button ref={buttonRef} variant='outline'>
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    );

    return OfferDelete;
  }
}
