import { Card, CardContent } from '@/components/ui/card';
import { useQueryClient } from '@tanstack/react-query';
import { MenuItem } from './Menu';
import OfferCard from '@/components/OfferCard';

export type Offer = {
  _id: string;
  title: string;
  promotional_items: MenuItem[];
  created_at: string;
  active: boolean;
  price: number;
};

export default function Offers() {
  const queryClient = useQueryClient();
  const offers: Offer[] = queryClient.getQueryData(['offers'])!;

  return (
    <Card>
      {offers.length > 0 ? (
        <CardContent className='flex flex-wrap gap-4 py-2 px-2'>
          {offers.map((offer) => (
            <OfferCard offer={offer} key={offer._id} />
          ))}
        </CardContent>
      ) : (
        <CardContent>
          <h3>Empty menu</h3>
        </CardContent>
      )}
    </Card>
  );
}
