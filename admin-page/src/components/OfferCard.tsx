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
import DeleteMenuItemOrOfferDrawer from './DeleteMenuItemOrOfferDrawer';
import { useNavigate } from 'react-router-dom';

type OfferProps = {
  offer: Offer;
};

export default function OfferCard({ offer }: OfferProps) {
  const navigate = useNavigate();
  return (
    <>
      <Card className='flex flex-col'>
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
        <CardFooter className='py-2 mt-auto w-full'>
          <Button
            variant={'default'}
            className='w-full'
            onClick={() => navigate(`/dashboard/offerEdit/${offer._id}`)}
          >
            Edit
          </Button>
        </CardFooter>
        <DeleteMenuItemOrOfferDrawer offer={offer} />
      </Card>
    </>
  );
}
