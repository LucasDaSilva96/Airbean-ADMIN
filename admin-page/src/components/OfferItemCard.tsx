import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { MenuItem } from './MenuCard';
import LazyImage from './LazyImage';

type OfferItemProps = {
  item: MenuItem;
};

export default function OfferItemCard({ item }: OfferItemProps) {
  return (
    <Card className='max-w-[375px]'>
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <LazyImage
          image={{ alt: item.title, src: item.image }}
          width={'100%'}
          border_Radius={10}
        />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
