import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Offer } from '../pages/Offers';
import OfferItemCard from './OfferItemCard';
import { Badge } from '@/components/ui/badge';
import { Button } from './ui/button';

type OfferProps = {
  offer: Offer;
};

export default function OfferCard({ offer }: OfferProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{offer.title}</CardTitle>
        <CardDescription className='flex items-center gap-2 py-1'>
          <strong>{offer.price}$</strong>
          <Badge variant={offer.active ? 'default' : 'destructive'}>
            {offer.active ? 'Active' : 'Not active'}
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-4 max-h-[400px] overflow-y-auto'>
        {offer.promotional_items.map((item) => (
          <OfferItemCard item={item} key={item._id} />
        ))}
      </CardContent>
      <CardFooter className='flex items-center gap-2 py-2'>
        <Button variant={'default'}>Edit</Button>
        <Button variant={'destructive'}>Delete</Button>
      </CardFooter>
    </Card>
  );
}
