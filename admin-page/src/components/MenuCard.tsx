import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from './ui/button';
import LazyImage from './LazyImage';
import { useNavigate } from 'react-router-dom';

export type MenuItem = {
  created_at: string;
  desc: string;
  image: string;
  price: number;
  title: string;
  _id: string;
};

type MenuCardProps = {
  card: MenuItem;
};

export default function MenuCard({ card }: MenuCardProps) {
  const navigate = useNavigate();
  return (
    <Card className='grid grid-cols-3 items-center'>
      <CardHeader className='flex flex-col items-center gap-1'>
        <CardTitle>{card.title}</CardTitle>
        <span className='italic tracking-wide'>{card.price}$</span>
        <div className='flex items-center gap-2'>
          <Button
            onClick={() => navigate(`menuEdit/${card._id}`)}
            variant={'default'}
          >
            Edit
          </Button>
          <Button onClick={() => navigate('')} variant={'destructive'}>
            Delete
          </Button>
        </div>
      </CardHeader>
      <CardContent className='mt-4'>
        <LazyImage
          image={{ alt: card.title, src: card.image }}
          width={'100%'}
          border_Radius={10}
        />
      </CardContent>
      <CardFooter className='flex flex-col max-h-[150px] overflow-y-auto py-2'>
        <p className='text-base antialiased font-light tracking-wide leading-relaxed'>
          {card.desc}
        </p>
      </CardFooter>
    </Card>
  );
}
