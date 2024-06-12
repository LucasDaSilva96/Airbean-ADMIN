import { Card, CardContent } from '@/components/ui/card';
import { useQueryClient } from '@tanstack/react-query';
import MenuCard from '@/components/MenuCard';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

export type MenuItem = {
  created_at: string;
  desc: string;
  image: string;
  price: number;
  title: string;
  _id: string;
};

export default function Menu() {
  const queryClient = useQueryClient();
  const menu: MenuItem[] = queryClient.getQueryData(['menu'])!;
  const navigate = useNavigate();

  return (
    <Card>
      <CardContent className='flex flex-col gap-4 py-4 px-2'>
        {menu && menu.length > 0 ? (
          menu.map((item) => <MenuCard key={item._id} card={item} />)
        ) : (
          <div className='w-full flex flex-col'>
            <h1 className='text-center py-2 font-base'>
              No menu item yet created
            </h1>
            <Button onClick={() => navigate('addMenuItem')}>
              Create one now
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
