import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Coffee, DollarSign } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from './ui/button';
import { useLocation, useNavigate } from 'react-router-dom';

type MenuItem = {
  created_at: string;
  desc: string;
  image: string;
  price: number;
  title: string;
  _id: string;
};

type OfferItem = {
  _id: string;
  title: string;
  promotional_items: MenuItem[];
  created_at: string;
  active: boolean;
  price: number;
};

export default function DashboardSideNav() {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const queryClient = useQueryClient();
  const menu: MenuItem[] = queryClient.getQueryData(['menu'])!;
  const offers: OfferItem[] = queryClient.getQueryData(['offers'])!;

  return (
    <Card className='flex flex-col gap-4 py-4 px-2'>
      <CardContent
        onClick={() => navigate('.')}
        className={`hover:bg-[#bfc0c065] ${
          location === '/dashboard' ? 'bg-[#bfc0c065]' : ''
        } rounded-md py-2 px-4 flex item justify-between transition-all cursor-pointer`}
      >
        <p>Manage menu</p>
        <Badge variant='outline'>{menu.length}</Badge>
        <Coffee />
      </CardContent>

      <CardContent
        onClick={() => navigate('offers')}
        className={`hover:bg-[#bfc0c065] ${
          location === '/dashboard/offers' ? 'bg-[#bfc0c065]' : ''
        } rounded-md py-2 px-4 flex item justify-between transition-all cursor-pointer`}
      >
        <p>Manage offers</p>
        <Badge variant='outline'>{offers.length}</Badge>
        <DollarSign />
      </CardContent>
      <CardFooter className='flex flex-col gap-4 mt-2'>
        <Button className='w-[160px]'>Add new menu item</Button>
        <Button className='w-[160px]'>Create new offer</Button>
      </CardFooter>
    </Card>
  );
}
